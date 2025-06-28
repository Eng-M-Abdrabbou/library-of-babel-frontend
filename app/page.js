'use client';
import React, { useState, useCallback, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:3001';

export default function HomePage() {
    // ... (All the state hooks like useState, etc. remain exactly the same)
    const [mode, setMode] = useState('lcg');
    const [address, setAddress] = useState({ hex: '0', wall: '1', shelf: '1', book: '1' });
    const [page, setPage] = useState('1');
    const [pageId, setPageId] = useState('0');
    const [content, setContent] = useState('Select an implementation method above and begin your exploration.');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState(null);

    // ... (All the functions like fetchContent, handleGo, handleSearch remain exactly the same)
    const fetchContent = useCallback(async (currentMode, currentAddress, currentPage, currentPageId) => {
        setIsLoading(true);
        setError('');
        let url = '';
        if (currentMode === 'lcg') {
            url = `${API_BASE_URL}/api/lcg/page?hex=${currentAddress.hex}&wall=${currentAddress.wall}&shelf=${currentAddress.shelf}&book=${currentAddress.book}&page=${currentPage}`;
        } else {
            url = `${API_BASE_URL}/api/perfect/page?id=${currentPageId}`;
        }
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok.');
            const data = await response.json();
            setContent(data.content);
        } catch (err) {
            setError('Failed to fetch page. Is the backend server running?');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleGo = () => {
        fetchContent(mode, address, page, pageId);
    };

    const handleSearch = async () => {
        if (!searchQuery) return;
        setIsLoading(true);
        setSearchResult(null);
        setError('');
        const url = mode === 'lcg' 
            ? `${API_BASE_URL}/api/lcg/search?q=${encodeURIComponent(searchQuery)}`
            : `${API_BASE_URL}/api/perfect/search?q=${encodeURIComponent(searchQuery)}`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Search failed.');
            const data = await response.json();
            setSearchResult(data);
            if (data.success) {
                if (mode === 'lcg') {
                    setAddress(data.address);
                    setPage(String(data.address.page));
                    fetchContent('lcg', data.address, data.address.page, null);
                } else {
                    setPageId(data.address.id);
                    fetchContent('perfect', null, null, data.address.id);
                }
            }
        } catch (err) {
            setError('Search failed.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h1>La Bibliothèque de Babel</h1>
                <p>
                    Welcome, Librarian. This is an interactive model of Jorge Luis Borges' infinite library. It contains every possible
                    page, and therefore, every truth, every falsehood, and every combination of letters possible. Choose your method of exploration below.
                </p>
                <div className="video-container">
                    <video 
                        src="Assets\Vids\LOB.mp4" 
                        autoPlay          
                        loop              
                        muted             
                        playsInline       
                    >
                        Your browser does not support the video tag.
                    </video>
                    <div className="video-fade"></div> 
                </div>
                <div className="mode-switcher">
                    <button className={mode === 'lcg' ? 'active' : ''} onClick={() => setMode('lcg')}>LCG "Full Scale"</button>
                    <button className={mode === 'perfect' ? 'active' : ''} onClick={() => setMode('perfect')}>"Perfect Odometer"</button>
                </div>

                <details>
                    <summary>What's the difference?</summary>
                    <p><b>LCG "Full Scale":</b> Simulates the chaos of the original story with authentic 3200-character pages. The library feels infinite and unpredictable. Searching is a difficult brute-force process that will time out for most long strings, reflecting the near-impossibility of finding meaning in true chaos.</p>
                    <p><b>"Perfect Odometer":</b> A perfectly ordered library of every possible 300-character page. The search is not a search, but an instantaneous mathematical calculation. It is guaranteed to find any text within its page limit, revealing the underlying order of a smaller, complete universe.</p>
                </details>
            </div>

            {/* ... (The rest of the file remains exactly the same) ... */}
            {mode === 'lcg' && (
                <div className="card">
                    <h2>Browse the Full Scale Library</h2>
                    <blockquote className="quote-block">
                        <p>"The distribution of the galleries is invariable. Twenty shelves, five long shelves per side, cover all the sides except two. Their height, which is the distance from floor to ceiling, is scarcely greater than that of a normal librarian. One of the free sides leads to a narrow hallway which opens upon another gallery, identical to the first and to all the rest."</p>
                        <cite>— Jorge Luis Borges, "The Library of Babel"</cite>
                    </blockquote>
                    <div className="form-grid">
                        <div className="form-group"><label htmlFor="hex">Hexagon</label><input id="hex" name="hex" value={address.hex} onChange={(e) => setAddress({...address, hex: e.target.value})} placeholder="e.g., a1b2c3d4..." /></div>
                        <div className="form-group"><label htmlFor="wall">Wall (1-4)</label><input id="wall" name="wall" value={address.wall} onChange={(e) => setAddress({...address, wall: e.target.value})} type="number" min="1" max="4" /></div>
                        <div className="form-group"><label htmlFor="shelf">Shelf (1-5)</label><input id="shelf" name="shelf" value={address.shelf} onChange={(e) => setAddress({...address, shelf: e.target.value})} type="number" min="1" max="5" /></div>
                        <div className="form-group"><label htmlFor="book">Book (1-32)</label><input id="book" name="book" value={address.book} onChange={(e) => setAddress({...address, book: e.target.value})} type="number" min="1" max="32" /></div>
                        <div className="form-group"><label htmlFor="page">Page (1-410)</label><input id="page" name="page" value={page} onChange={(e) => setPage(e.target.value)} type="number" min="1" max="410" /></div>
                    </div>
                     <button className="main-action-btn" onClick={handleGo} disabled={isLoading} style={{marginTop: '1rem'}}>Go to Page</button>
                </div>
            )}
            {mode === 'perfect' && (
                 <div className="card">
                    <h2>Browse the Perfect Library</h2>
                    <div className="form-grid">
                        <div className="form-group" style={{gridColumn: '1 / -1'}}><label htmlFor="pageId">Page ID</label><input id="pageId" name="pageId" value={pageId} onChange={(e) => setPageId(e.target.value.replace(/[^0-9]/g,''))} placeholder="Enter a number..." type="text"/></div>
                    </div>
                     <button className="main-action-btn" onClick={handleGo} disabled={isLoading} style={{marginTop: '1rem'}}>Go to Page ID</button>
                </div>
            )}
            <div className="card search-card">
                <h2>Search the Library</h2>
                <div className="form-grid">
                    <div className="form-group" style={{gridColumn: '1 / -1'}}>
                        <label htmlFor="search">{mode === 'lcg' ? 'Text to Find (up to 3200 characters)' : 'Text to Find (up to 300 characters)'}</label>
                        <input id="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={mode === 'lcg' ? "the universe (which others call the library)..." : "the quick brown fox..."} maxLength={mode === 'lcg' ? 3200 : 300} />
                    </div>
                    <button className="main-action-btn" onClick={handleSearch} disabled={isLoading}>Search</button>
                </div>
                {searchResult && (
                    <div className="search-result">
                        {searchResult.success ? (<p><b>Success!</b> Your text was located. Displaying the page now.</p>) : (<p><b>Search Timed Out.</b> The text you searched for certainly exists in this vast library, but finding it via brute-force may take a very long time on this device. This is an expected feature of the "Full Scale" mode. Try a shorter query or the "Perfect Odometer" method for a guaranteed result.</p>)}
                    </div>
                )}
            </div>
            <div className="card">
                <h2>Page Content</h2>
                {error && <p className="error" style={{color: '#e74c3c'}}>{error}</p>}
                {isLoading ? <div className="loader"></div> : <pre className="page-content-pre">{content}</pre>}
            </div>
        </div>
    );
}