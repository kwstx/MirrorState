'use client';
import { useRouter } from 'next/navigation';
import { ArrowRight, Target, Plus, Check, Briefcase, Heart, Dumbbell, Apple, Trophy, Wallet } from 'lucide-react';
import { useState } from 'react';
import { useGenerationContext } from '@/lib/context/generation-context';

const INTERESTS = [
    { id: 'job', label: 'Get a Job', icon: <Briefcase size={24} /> },
    { id: 'love', label: 'Find Love', icon: <Heart size={24} /> },
    { id: 'health', label: 'Get Healthier', icon: <Dumbbell size={24} /> },
    { id: 'weight', label: 'Lose Weight', icon: <Apple size={24} /> },
    { id: 'confidence', label: 'Build Confidence', icon: <Trophy size={24} /> },
    { id: 'finance', label: 'Financial Freedom', icon: <Wallet size={24} /> },
];

export function InterestsPage() {
    const router = useRouter();
    const { setInterests } = useGenerationContext();
    const [selected, setSelected] = useState<string[]>([]);
    const [customInterest, setCustomInterest] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    const toggleSelection = (id: string) => {
        setSelected(prev => prev.includes(id) ? [] : [id]);
    };

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
            <div style={{
                width: '100%',
                maxWidth: '56rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '3rem',
                animation: 'fadeInUp 0.8s ease-out'
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
                        <Target size={14} />
                        <span>Goals & Interests</span>
                    </div>
                    <h1 style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '3.5rem',
                        lineHeight: '1.1',
                        color: '#0f172a',
                    }}>
                        <span className="elegant-italic">What are you</span> <br />
                        <span className="elegant-italic" style={{ opacity: 0.6 }}>aiming for?</span>
                    </h1>
                </div>

                {/* Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '1.5rem'
                }}>
                    {INTERESTS.map(item => {
                        const isSelected = selected.includes(item.id);
                        return (
                            <button
                                key={item.id}
                                onClick={() => toggleSelection(item.id)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '1.5rem',
                                    borderRadius: '1rem',
                                    border: `1px solid ${isSelected ? '#0f172a' : '#e2e8f0'}`,
                                    backgroundColor: isSelected ? '#f8fafc' : 'transparent',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    textAlign: 'left',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <span style={{ color: '#0f172a' }}>{item.icon}</span>
                                <span style={{
                                    fontSize: '0.75rem',
                                    fontFamily: 'var(--font-sans)',
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.2em',
                                    color: '#1e293b'
                                }}>{item.label}</span>
                                {isSelected && (
                                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', color: '#0f172a' }}>
                                        <Check size={16} />
                                    </div>
                                )}
                            </button>
                        );
                    })}

                    {/* Custom Input */}
                    <div style={{
                        padding: '1.5rem',
                        borderRadius: '1rem',
                        border: '1px solid #e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        cursor: isAdding ? 'text' : 'pointer',
                        transition: 'all 0.2s ease',
                        backgroundColor: isAdding ? '#fff' : 'transparent'
                    }} onClick={() => setIsAdding(true)}>
                        {isAdding ? (
                            <input
                                autoFocus
                                type="text"
                                placeholder="Add your own..."
                                value={customInterest}
                                onChange={(e) => setCustomInterest(e.target.value)}
                                style={{
                                    width: '100%',
                                    border: 'none',
                                    outline: 'none',
                                    fontSize: '0.75rem',
                                    fontFamily: 'var(--font-sans)',
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.2em',
                                    color: '#0f172a'
                                }}
                                onBlur={() => customInterest === '' && setIsAdding(false)}
                            />
                        ) : (
                            <>
                                <div style={{
                                    width: '2rem', height: '2rem',
                                    borderRadius: '50%',
                                    border: '1px dashed #94a3b8',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: '#94a3b8'
                                }}>
                                    <Plus size={16} />
                                </div>
                                <span style={{
                                    fontSize: '0.75rem',
                                    fontFamily: 'var(--font-sans)',
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.2em',
                                    color: '#64748b',
                                    fontStyle: 'normal'
                                }}>Something else...</span>
                            </>
                        )}
                    </div>
                </div>

                {/* Navigation */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '2rem'
                }}>
                    <button
                        onClick={() => router.push('/traits')}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#64748b',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            letterSpacing: '0.05em',
                        }}
                    >
                        BACK
                    </button>

                    <button
                        className="btn-primary"
                        onClick={() => {
                            setInterests(selected);
                            router.push('/reflection');
                        }}
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
