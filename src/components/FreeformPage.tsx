'use client';
import { useRouter } from 'next/navigation';
import { ArrowRight, PenLine, Sparkles, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { useGenerationContext } from '@/lib/context/generation-context';

export function FreeformPage() {
    const router = useRouter();
    const { freeformNote, setFreeformNote } = useGenerationContext();
    const note = freeformNote;
    const setNote = setFreeformNote;
    const [isFocused, setIsFocused] = useState(false);

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
                    gap: '3rem',
                    height: '100%',
                    maxHeight: '80vh'
                }}>
                {/* Header */}
                <div style={{ textAlign: 'center', flexShrink: 0 }}>
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
                        <MessageSquare size={14} />
                        <span>Open Space</span>
                        <span style={{
                            backgroundColor: '#f1f5f9',
                            padding: '0.125rem 0.5rem',
                            borderRadius: '1rem',
                            fontSize: '0.625rem',
                            color: '#64748b',
                            marginLeft: '0.5rem',
                            textTransform: 'none',
                            fontStyle: 'italic',
                            letterSpacing: '0'
                        }}>Optional</span>
                    </div>
                </div>

                {/* Text Area Container */}
                <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative'
                }}>
                    <h1 style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '2.5rem',
                        lineHeight: '1.2',
                        color: '#0f172a',
                        marginBottom: '2rem',
                        textAlign: 'center'
                    }}>
                        <span className="elegant-italic">Anything else on</span> <br />
                        <span className="elegant-italic" style={{ opacity: 0.6 }}>your mind?</span>
                    </h1>

                    <textarea
                        placeholder="Share your thoughts, feelings, or anything else you'd like to mention..."
                        className="editorial-input"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        style={{
                            width: '100%',
                            flex: 1,
                            minHeight: '200px',
                            fontSize: '1.25rem',
                            fontFamily: 'var(--font-serif)',
                            padding: '2rem',
                            border: `1px solid ${isFocused ? '#0f172a' : '#e2e8f0'}`,
                            borderRadius: '1.5rem',
                            outline: 'none',
                            backgroundColor: isFocused ? '#fff' : '#f8fafc',
                            color: '#1e293b',
                            resize: 'none',
                            transition: 'all 0.3s ease',
                            lineHeight: '1.6'
                        }}
                        spellCheck={false}
                    />
                </div>

                {/* Navigation */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '1rem',
                    flexShrink: 0
                }}>
                    <button
                        onClick={() => router.push('/mood')}
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
                        onClick={() => router.push('/target-mood')}
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
