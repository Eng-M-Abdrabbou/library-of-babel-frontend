// babel-nextjs-frontend/app/about/page.js
export default function AboutPage() {
    return (
        <div className="container">
            <div className="card">
                <h1>About This Project</h1>
                <p>
                    This website is an interactive exploration of Jorge Luis Borges&apos; thought experiment, &quot;The Library of Babel.&quot;
                    Borges imagined a universe in the form of a vast library containing every possible 410-page book that could be composed
                    from a small set of characters. This implies that somewhere in its endless galleries, the library must contain
                    every book ever written, every book that will ever be written, and every possible falsehood or jumbled mess.
                </p>
                <p>
                    This project does not store these books. That would be impossible. Instead, it generates them on demand using
                    deterministic algorithms. The &quot;address&quot; of a book is simply the seed for a mathematical function that produces
                    the exact same text every time.
                </p>
                
                <h2>The Two Implementations</h2>
                <p>
                    The main page of this site allows you to switch between two different methods of creating this library, each
                    with its own philosophy and limitations, which you can explore for yourself.
                </p>
                <h3>1. The LCG &quot;Random Walk&quot; Method</h3>
                <p>
                    This method simulates the chaotic, vast nature of Borges&apos; original vision. It uses a mathematical formula called a
                    Linear Congruential Generator (LCG) to create a pseudo-random, but deterministic, sequence of characters. The
                    &quot;Hexagon/Wall/Shelf&quot; address simply tells the generator where to start in its endless, looping path.
                </p>
                <ul>
                    <li><b>How it Works:</b> A number (the &quot;state&quot;) is repeatedly fed into the formula <code>newState = (a * oldState + c) % M</code> to produce the next state. Each state corresponds to a character.</li>
                    <li><b>The Search:</b> Searching is incredibly difficult. It is a brute-force process of guessing a starting point and tracing the path backwards. For this reason, the search is slow and may time out for long strings. This is a feature, not a bug—it reflects the near-impossibility of finding meaning in true chaos.</li>
                </ul>

                <h3>2. The &quot;Perfect Odometer&quot; Method</h3>
                <p>
                    This method abandons the pseudo-randomness for perfect, ordered completeness. It treats every possible page as a
                    number in a different base (Base 29, for our character set). The library is a perfectly ordered list of every
                    single 300-character string, from &quot;aaaaa...&quot; to &quot;.....&quot;.
                </p>
                <ul>
                    <li><b>How it Works:</b> It uses base conversion. A Page ID (a number) is converted to its Base 29 representation to generate the page.</li>
                    <li><b>The Search:</b> Searching is not a search at all; it is a calculation. Your text is converted from Base 29 into a normal number, which becomes its Page ID. The search is therefore instantaneous and guaranteed to succeed.</li>
                </ul>

                <h2>Technical Details</h2>
                <p>
                    This project was built using the Next.js framework for the frontend and a Node.js/Express server for the backend.
                    All calculations, especially for large numbers, are handled using JavaScript&apos;s <code>BigInt</code> data type, which is
                    essential for the mathematics involved in both implementations.
                </p>
            </div>
        </div>
    )
}