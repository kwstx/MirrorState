'use client';
import { useRouter } from 'next/navigation';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function Header() {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className="site-header">
            <div className="logo-container" onClick={() => router.push('/')} style={{ cursor: 'pointer', zIndex: 101 }}>
                <span className="logo-text">MirrorState</span>
            </div>

            {/* Desktop Nav */}
            <nav className="main-nav desktop-only">
                <a href="/experience" className="nav-link">Experience</a>
                <a href="/philosophy" className="nav-link">Philosophy</a>
                <a href="/disclaimer" className="nav-link">Disclaimer</a>
            </nav>

            <div className="header-actions desktop-only">
                <button className="btn-login" onClick={() => router.push('/traits')}>
                    Get Started
                </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button className="mobile-menu-btn" onClick={toggleMenu}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Nav Overlay */}
            {isMenuOpen && (
                <div className="mobile-nav-overlay animate-fade-in-up">
                    <nav className="mobile-nav-links">
                        <a href="/experience" className="mobile-nav-link" onClick={toggleMenu}>Experience</a>
                        <a href="/philosophy" className="mobile-nav-link" onClick={toggleMenu}>Philosophy</a>
                        <a href="/disclaimer" className="mobile-nav-link" onClick={toggleMenu}>Disclaimer</a>
                        <button className="btn-login mobile-btn" onClick={() => {
                            router.push('/traits');
                            toggleMenu();
                        }}>
                            Get Started
                        </button>
                    </nav>
                </div>
            )}
        </header>
    );
}
