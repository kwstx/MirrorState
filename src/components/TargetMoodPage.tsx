'use client';
import { useRouter } from 'next/navigation';
import { ArrowRight, Frown, Meh, Smile, Laugh, Angry, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useGenerationContext } from '@/lib/context/generation-context';

const MOODS = [
    { id: 'angry', icon: <Angry size={32} />, label: 'Angry', color: '#ef4444' },
    { id: 'anxious', icon: <Frown size={32} />, label: 'Anxious', color: '#f97316' },
    { id: 'okay', icon: <Meh size={32} />, label: 'Okay', color: '#eab308' },
    { id: 'good', icon: <Smile size={32} />, label: 'Good', color: '#22c55e' },
    { id: 'great', icon: <Laugh size={32} />, label: 'Great', color: '#3b82f6' },
];

export function TargetMoodPage() {
    const router = useRouter();
    const { targetMood, setTargetMood } = useGenerationContext();
    const selectedMood = targetMood;
    const setSelectedMood = setTargetMood;

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
                    maxWidth: '56rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4rem',
                    alignItems: 'center'
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
                        <Sparkles size={14} />
                        <span>Desired State</span>
                    </div>
                    <h1 style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '3.5rem',
                        lineHeight: '1.1',
                        color: '#0f172a',
                    }}>
                        <span className="elegant-italic">How do you</span> <br />
                        <span className="elegant-italic" style={{ opacity: 0.6 }}>want to feel?</span>
                    </h1>
                </div>

                {/* Mood Toggles */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: '1.5rem',
                    width: '100%'
                }}>
                    {MOODS.map((mood) => {
                        const isSelected = selectedMood === mood.id;
                        return (
                            <button
                                key={mood.id}
                                onClick={() => setSelectedMood(mood.id)}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '2rem 1.5rem',
                                    borderRadius: '1.5rem',
                                    border: `1px solid ${isSelected ? mood.color : '#e2e8f0'}`,
                                    backgroundColor: isSelected ? '#fff' : 'transparent',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    minWidth: '120px',
                                    transform: isSelected ? 'scale(1.05) translateY(-5px)' : 'scale(1)',
                                    boxShadow: isSelected ? `0 20px 25px -5px ${mood.color}20` : 'none'
                                }}
                            >
                                <div style={{
                                    color: isSelected ? mood.color : '#94a3b8',
                                    transition: 'color 0.3s ease',
                                    transform: isSelected ? 'scale(1.2)' : 'scale(1)'
                                }}>
                                    {mood.icon}
                                </div>
                                <span style={{
                                    fontSize: '0.75rem',
                                    fontFamily: 'var(--font-sans)',
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.2em',
                                    color: isSelected ? '#1e293b' : '#94a3b8',
                                    transition: 'color 0.3s ease'
                                }}>{mood.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Navigation */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: '48rem',
                    marginTop: '2rem'
                }}>
                    <button
                        onClick={() => router.push('/freeform')}
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
                        onClick={() => router.push('/result')} // Route to Result Page
                        disabled={!selectedMood}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            backgroundColor: selectedMood ? '#0f172a' : '#cbd5e1',
                            padding: '1rem 2rem',
                            borderRadius: '9999px',
                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                            cursor: selectedMood ? 'pointer' : 'not-allowed',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <span style={{ fontSize: '1rem', letterSpacing: '0.02em' }}>Transform</span>
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
