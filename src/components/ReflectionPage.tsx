'use client';
import { useRouter } from 'next/navigation';
import { ArrowRight, Sparkles, Shield, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useGenerationContext } from '@/lib/context/generation-context';

export function ReflectionPage() {
    const router = useRouter();
    const { strength, setStrength, insecurity, setInsecurity } = useGenerationContext();
    const [focusField, setFocusField] = useState<string | null>(null);

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#ffffff',
            zIndex: 200,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
        }}>
            <div
                className="animate-fade-in-up"
                style={{
                    width: '100%',
                    maxWidth: '48rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4rem',
                    maxHeight: '100vh',
                    overflowY: 'auto',
                    padding: '1rem' // Buffer for scroll
                }}>
                {/* Header */}
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
                        <Shield size={14} />
                        <span>Strengths & Insecurities</span>
                    </div>
                    <h1 style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '3.5rem',
                        lineHeight: '1.1',
                        color: '#0f172a',
                    }}>
                        <span className="elegant-italic">What are your</span> <br />
                        <span className="elegant-italic" style={{ opacity: 0.6 }}>Strengths & Insecurities?</span>
                    </h1>
                </div>

                {/* Inputs Container */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>

                    {/* Strengths */}
                    <div style={{ position: 'relative' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '0.875rem',
                            color: '#64748b',
                            marginBottom: '0.5rem',
                            fontWeight: 500,
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase'
                        }}>
                            My Biggest Strength
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Resilience, Empathy..."
                            className="editorial-input"
                            value={strength}
                            onChange={(e) => setStrength(e.target.value)}
                            onFocus={() => setFocusField('strength')}
                            onBlur={() => setFocusField(null)}
                            style={{
                                width: '100%',
                                fontSize: '1.5rem',
                                fontFamily: 'var(--font-serif)',
                                padding: '1rem 0',
                                border: 'none',
                                borderBottom: `2px solid ${focusField === 'strength' ? '#0f172a' : '#e2e8f0'}`,
                                outline: 'none',
                                backgroundColor: 'transparent',
                                color: '#1e293b',
                                transition: 'border-color 0.3s ease'
                            }}
                        />
                    </div>

                    {/* Insecurities */}
                    <div style={{ position: 'relative' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <label style={{
                                fontSize: '0.875rem',
                                color: '#64748b',
                                fontWeight: 500,
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase'
                            }}>
                                My Insecurity
                            </label>
                            <span style={{
                                fontSize: '0.75rem',
                                color: '#94a3b8',
                                fontStyle: 'italic',
                                backgroundColor: '#f1f5f9',
                                padding: '0.125rem 0.5rem',
                                borderRadius: '1rem'
                            }}>Optional</span>
                        </div>
                        <input
                            type="text"
                            placeholder="e.g. Failure, Rejection..."
                            className="editorial-input"
                            value={insecurity}
                            onChange={(e) => setInsecurity(e.target.value)}
                            onFocus={() => setFocusField('insecurity')}
                            onBlur={() => setFocusField(null)}
                            style={{
                                width: '100%',
                                fontSize: '1.5rem',
                                fontFamily: 'var(--font-serif)',
                                padding: '1rem 0',
                                border: 'none',
                                borderBottom: `2px solid ${focusField === 'insecurity' ? '#0f172a' : '#e2e8f0'}`,
                                outline: 'none',
                                backgroundColor: 'transparent',
                                color: '#1e293b',
                                transition: 'border-color 0.3s ease'
                            }}
                        />
                    </div>
                </div>

                {/* Navigation */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '1rem'
                }}>
                    <button
                        onClick={() => router.push('/interests')}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#64748b',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            letterSpacing: '0.05em',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        BACK
                    </button>

                    <button
                        className="btn-primary"
                        onClick={() => router.push('/mood')}
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
