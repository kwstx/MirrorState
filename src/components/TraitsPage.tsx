'use client';
import { useRouter } from 'next/navigation';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useState } from 'react';

export function TraitsPage() {
    const router = useRouter();
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="animate-expand" style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#ffffff',
            zIndex: 200, // Top level
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '42rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '3rem',
            }}>
                {/* Header Section */}
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em',
                        color: '#94a3b8',
                        marginBottom: '1rem',
                        fontWeight: 600
                    }}>
                        <Sparkles size={14} />
                        <span>Tell us about you</span>
                    </div>
                    <h1 style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '3.5rem',
                        lineHeight: '1.1',
                        color: '#0f172a',
                        marginBottom: '1rem'
                    }}>
                        <span className="elegant-italic">How would you</span> <br />
                        <span className="elegant-italic" style={{ opacity: 0.6 }}>describe</span> <span className="elegant-italic">yourself?</span>
                    </h1>
                </div>

                {/* Input Section */}
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="e.g. Creative, Ambitious, Empathetic..."
                        className="editorial-input"
                        style={{
                            width: '100%',
                            fontSize: '2rem',
                            fontFamily: 'var(--font-serif)',
                            padding: '1rem 0',
                            border: 'none',
                            borderBottom: `2px solid ${isFocused ? '#0f172a' : '#e2e8f0'}`,
                            outline: 'none',
                            backgroundColor: 'transparent',
                            color: '#1e293b',
                            transition: 'border-color 0.3s ease',
                            textAlign: 'center'
                        }}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        autoFocus
                    />
                </div>

                {/* Navigation */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '2rem'
                }}>
                    <button
                        onClick={() => router.push('/')}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#64748b',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            letterSpacing: '0.05em',
                            transition: 'color 0.2s',
                            padding: '1rem'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.color = '#0f172a'}
                        onMouseOut={(e) => e.currentTarget.style.color = '#64748b'}
                    >
                        BACK
                    </button>

                    <button
                        className="btn-primary" // Keeping global class for shape but overriding styles
                        onClick={() => router.push('/interests')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            backgroundColor: '#0f172a',
                            padding: '1rem 2rem',
                            borderRadius: '9999px',
                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                        }}
                    >
                        <span style={{ fontSize: '1rem', letterSpacing: '0.02em' }}>Continue</span>
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>

        </div>
    );
}
