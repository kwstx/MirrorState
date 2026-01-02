'use client';
import { useRouter } from 'next/navigation';

export function Header() {
    const router = useRouter();
    return (
        <header className="site-header">
            <div className="logo-container" onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>
                <span className="logo-text">MoodMirror</span>
            </div>

            <nav className="main-nav">
                <a href="#" className="nav-link">Features</a>
                <a href="#" className="nav-link">Method</a>
                <a href="#" className="nav-link">Pricing</a>
                <a href="#" className="nav-link">Changelog</a>
            </nav>

            <div className="header-actions">
                <button className="btn-login" onClick={() => router.push('/traits')}>
                    Get Started
                </button>
            </div>
        </header>
    );
}
