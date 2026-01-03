'use client';
import { useRouter } from 'next/navigation';

export function Header() {
    const router = useRouter();
    return (
        <header className="site-header">
            <div className="logo-container" onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>
                <span className="logo-text">MirrorState</span>
            </div>

            <nav className="main-nav">
                <a href="/experience" className="nav-link">Experience</a>
                <a href="/philosophy" className="nav-link">Philosophy</a>
                <a href="/disclaimer" className="nav-link">Disclaimer</a>
            </nav>

            <div className="header-actions">
                <button className="btn-login" onClick={() => router.push('/traits')}>
                    Get Started
                </button>
            </div>
        </header>
    );
}
