'use client';
import { useRouter } from 'next/navigation';
import { ArrowRight, Frown, Meh, Smile, Laugh, Angry } from 'lucide-react';
import { useState } from 'react';
import { useGenerationContext } from '@/lib/context/generation-context';

export function MoodPage() {
    const router = useRouter();
    const { currentMood, setCurrentMood } = useGenerationContext();
    // Rename for compatibility with existing render logic if needed, or update render logic
    const moodValue = currentMood;
    const setMoodValue = setCurrentMood;

    const getMoodIcon = (value: number) => {
        if (value < 20) return { icon: <Angry size={48} />, label: 'Angry', color: '#ef4444' };
        if (value < 40) return { icon: <Frown size={48} />, label: 'Anxious', color: '#f97316' };
        if (value < 60) return { icon: <Meh size={48} />, label: 'Okay', color: '#eab308' };
        if (value < 80) return { icon: <Smile size={48} />, label: 'Good', color: '#22c55e' };
        return { icon: <Laugh size={48} />, label: 'Great', color: '#3b82f6' };
    };

    const moodData = getMoodIcon(moodValue);

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
                        <span>Emotional State</span>
                    </div>
                    <h1 style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '3.5rem',
                        lineHeight: '1.1',
                        color: '#0f172a',
                    }}>
                        <span className="elegant-italic">How are you</span> <br />
                        <span className="elegant-italic" style={{ opacity: 0.6 }}>feeling?</span>
                    </h1>
                </div>

                {/* Mood Slider Section */}
                <div style={{ width: '100%', maxWidth: '32rem', padding: '2rem 0' }}>

                    {/* Icon Display */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginBottom: '3rem',
                        height: '100px' // Reserved space
                    }}>
                        <div style={{
                            color: moodData.color,
                            transform: 'scale(1.5)',
                            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                        }}>
                            {moodData.icon}
                        </div>
                        <span style={{
                            marginTop: '1rem',
                            fontSize: '0.75rem',
                            fontFamily: 'var(--font-sans)',
                            fontWeight: 600,
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: moodData.color,
                        }}>{moodData.label}</span>
                    </div>

                    {/* Slider */}
                    <div style={{ position: 'relative', height: '2rem', display: 'flex', alignItems: 'center' }}>
                        <div style={{
                            position: 'absolute',
                            left: 0, right: 0,
                            height: '4px',
                            backgroundColor: '#e2e8f0',
                            borderRadius: '999px'
                        }} />
                        <div style={{
                            position: 'absolute',
                            left: 0,
                            width: `${moodValue}%`,
                            height: '4px',
                            backgroundColor: moodData.color, // Color changes with mood
                            borderRadius: '999px',
                            transition: 'background-color 0.3s ease, width 0.1s linear'
                        }} />
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={moodValue}
                            onChange={(e) => setMoodValue(parseInt(e.target.value))}
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                opacity: 0,
                                cursor: 'grab',
                                margin: 0
                            }}
                        />
                        {/* Custom Thumb handle visual */}
                        <div style={{
                            position: 'absolute',
                            left: `${moodValue}%`,
                            width: '1.5rem',
                            height: '1.5rem',
                            backgroundColor: '#ffffff',
                            border: `2px solid ${moodData.color}`,
                            borderRadius: '50%',
                            transform: 'translateX(-50%)',
                            pointerEvents: 'none',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            transition: 'border-color 0.3s ease, left 0.1s linear'
                        }} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', color: '#94a3b8', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em' }}>
                        <span>NEGATIVE</span>
                        <span>POSITIVE</span>
                    </div>
                </div>

                {/* Navigation */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    marginTop: '1rem'
                }}>
                    <button
                        onClick={() => router.push('/reflection')}
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
                        onClick={() => router.push('/freeform')}
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
