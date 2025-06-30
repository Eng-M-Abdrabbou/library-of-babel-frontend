import Link from 'next/link';
import './globals.css';
import { EB_Garamond, Inter } from 'next/font/google';

const garamond = EB_Garamond({ subsets: ['latin'], variable: '--font-garamond' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'La Bibliothèque de Babel',
  description: 'An exploration of infinity, language, and algorithms.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${garamond.variable} ${inter.variable}`}>
        <div className="scaffold">
          <nav className="navbar">
            <Link href="/" className="nav-title">The Library of Babel</Link>
            <div className="nav-links">
              <Link href="/">Library</Link>
              <Link href="/about">About</Link>
            </div>
          </nav>
          <main className="main-content">
            {children}
          </main>
          <footer className="footer">
            <p>An interactive project by Mahmoud Abdrabbou. Inspired by Jorge Luis Borges.</p>
          </footer>
        </div>
      </body>
    </html>
  )
}