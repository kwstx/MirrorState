'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGenerationContext } from '@/lib/context/generation-context';
import { AlertTriangle, Shield, RefreshCcw, Home, XCircle } from 'lucide-react';

// ... existing imports

// Sub-component for Typewriter Effect
function TypewriterText({ text, speed = 60 }: { text: string; speed?: number }) {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        const words = text.split(' ');
        let currentIndex = 0;
        setDisplayedText(''); // Reset on new text

        const intervalId = setInterval(() => {
            if (currentIndex < words.length) {
                // Add the next word. Note: we need to handle spacing carefully.
                // If it's the first word, just add it. Otherwise add space + word.
                const nextWord = words[currentIndex];
                setDisplayedText((prev) => prev ? `${prev} ${nextWord}` : nextWord);
                currentIndex++;
            } else {
                clearInterval(intervalId);
            }
        }, speed);

        return () => clearInterval(intervalId);
    }, [text, speed]);

    return <span>{displayedText}</span>;
}

export default function ResultPage() {
    // ... existing state and logic ...
    // Note: I will only replace the specific render part in the next tool call if I can't do it all at once.
    // Actually, I should probably do this in two steps or simply define the function carefully.
    // But since I have to replace the *usage* too, I need to match the file structure.

    // START_EXISTING_COMPONENT
    const router = useRouter();
    const {
        targetMood,
        intensity,
        strength,
        insecurity,
        freeformNote,
        interests, // Generated from context
        setTargetMood, // to reset on exit
        setStrength,
        setInsecurity,
        setFreeformNote,
        setInterests
    } = useGenerationContext();

    const [isLoading, setIsLoading] = useState(true);
    const [resultText, setResultText] = useState<string | null>(null);
    const [resultMeta, setResultMeta] = useState<any>(null);
    const [showWarning, setShowWarning] = useState(false);
    const [acceptedWarning, setAcceptedWarning] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Redirection if no context (user jumped here)
        if (!targetMood) {
            router.push('/');
            return;
        }

        // Safety Check for High Intensity
        if (intensity >= 0.8) {
            setShowWarning(true);
        } else {
            setAcceptedWarning(true); // Auto-accept if safe
        }

        // Generate call
        async function generate() {
            try {
                // Construct payload strictly matching GenerationRequest
                const payload = {
                    emotion: targetMood || "Neutral",
                    intensity: intensity || 0.5,
                    traits: {
                        strength: strength || "Unknown",
                        insecurity: insecurity || "Unknown",
                        interests: interests || []
                    },
                    style: "Standard",
                    // Session logic could be added here if we had a session ID
                    user_input: freeformNote || "Reflecting on my day."
                };

                const res = await fetch('/api/engine', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!res.ok) {
                    const errorData = await res.json().catch(() => ({}));
                    throw new Error(errorData.details || errorData.error || `Error ${res.status}: ${res.statusText}`);
                }

                const data = await res.json();
                setResultText(data.text);
                setResultMeta(data.emotion_metadata);

            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error");
            } finally {
                setIsLoading(false);
            }
        }

        generate();

    }, [targetMood, intensity, strength, insecurity, freeformNote, router]);

    const handleReset = () => {
        // Clear Context
        setTargetMood(null);
        setStrength('');
        setInsecurity('');
        setFreeformNote('');
        router.push('/');
    };

    if (!targetMood) return null; // Or loading spinner while redirecting

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
            {/* Guardrail: Warning Modal */}
            {showWarning && !acceptedWarning && (
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(255,255,255,0.95)',
                    zIndex: 300,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: '2rem'
                }}>
                    <AlertTriangle size={64} color="#f59e0b" style={{ marginBottom: '1rem' }} />
                    <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', marginBottom: '1rem' }}>Content Warning</h2>
                    <p style={{ maxWidth: '30rem', color: '#64748b', marginBottom: '2rem', lineHeight: '1.6' }}>
                        This content was generated with <strong>High Intensity</strong> configuration.
                        It may contain strong language or vivid emotional descriptions.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            onClick={handleReset}
                            style={{
                                padding: '1rem 2rem',
                                border: '1px solid #e2e8f0',
                                borderRadius: '99px',
                                background: 'transparent',
                                cursor: 'pointer'
                            }}>
                            Go Back
                        </button>
                        <button
                            onClick={() => setAcceptedWarning(true)}
                            className="btn-primary"
                            style={{
                                padding: '1rem 2rem',
                                borderRadius: '99px',
                                background: '#0f172a',
                                color: 'white',
                                cursor: 'pointer'
                            }}>
                            Proceed
                        </button>
                    </div>
                </div>
            )}

            <div className="animate-fade-in-up" style={{ width: '100%', maxWidth: '48rem', textAlign: 'center' }}>

                {/* Header / Badge */}
                <div style={{ marginBottom: '3rem' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        backgroundColor: '#f8fafc',
                        borderRadius: '99px',
                        border: '1px solid #e2e8f0'
                    }}>
                        <Shield size={14} className="text-slate-400" />
                        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            {targetMood} • {resultMeta?.mapped_level || 'Processing'}
                        </span>
                    </div>
                </div>

                {/* Content Area */}
                <div style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {isLoading ? (
                        <div style={{ color: '#94a3b8', fontStyle: 'italic' }}>Generating response...</div>
                    ) : error ? (
                        <div style={{ color: '#ef4444' }}>Error: {error}</div>
                    ) : (
                        <p style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: '2rem',
                            lineHeight: '1.4',
                            color: '#1e293b'
                        }}>
                            {/* Typewriter Effect Applied Here (Slower: 120ms) */}
                            {resultText && <TypewriterText text={resultText} speed={120} />}
                        </p>
                    )}
                </div>

                {/* Footer Controls: Opt-out / Reset */}
                <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                    <button
                        onClick={handleReset}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: '#94a3b8',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            letterSpacing: '0.05em'
                        }}>
                        <XCircle size={18} />
                        CLOSE SESSION
                    </button>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: '#0f172a',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            letterSpacing: '0.05em'
                        }}>
                        <RefreshCcw size={18} />
                        REGENERATE
                    </button>
                </div>

            </div>
        </div>
    );
}

// ... existing code ...
