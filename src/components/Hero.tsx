'use client';
import { ArrowRightLeft, Drama } from 'lucide-react';
import { useState } from 'react';

import { MoodSelector } from './MoodSelector';

interface HeroProps {
    onTransform: () => void;
}

const MOOD_OPTIONS = [
    "Angry",
    "Anxious",
    "Okay",
    "Good"
];

export function Hero({ onTransform }: HeroProps) {
    const [isSwapped, setIsSwapped] = useState(false);
    const [moodInput, setMoodInput] = useState('');
    const [targetMood, setTargetMood] = useState('Angry');

    return (
        <div className="hero-section">
            <div className="hero-content">
                <h1 className="hero-title">
                    <span className="elegant-italic">Feel</span> <span className="elegant-italic">any</span> <span className="icon-wrapper"><Drama className="icon-drama" /></span> <span className="elegant-italic">emotion</span>
                    <br />
                    <span className="elegant-italic" style={{ color: '#94a3b8', fontSize: '0.8em', marginTop: '0.5rem' }}>instantly</span>
                </h1>

                {/* Search Interface */}
                <div className="mood-interface">

                    {/* Input 1 (Left) */}
                    <div className="input-group">
                        <span className="input-label">How are you?</span>
                        {isSwapped ? (
                            <MoodSelector
                                value={targetMood}
                                onChange={setTargetMood}
                                options={MOOD_OPTIONS}
                            />
                        ) : (
                            <input
                                type="text"
                                placeholder="I feel..."
                                className="mood-input"
                                value={moodInput}
                                onChange={(e) => setMoodInput(e.target.value)}
                            />
                        )}
                    </div>

                    {/* Swap Button */}
                    <button className="btn-swap" onClick={() => setIsSwapped(!isSwapped)}>
                        <ArrowRightLeft className="icon-swap" />
                    </button>

                    {/* Input 2 (Right) */}
                    <div className="input-group">
                        <span className="input-label">Target Mood</span>
                        {isSwapped ? (
                            <input
                                type="text"
                                placeholder="I want to feel..."
                                className="mood-input"
                                value={moodInput}
                                onChange={(e) => setMoodInput(e.target.value)}
                            />
                        ) : (
                            <MoodSelector
                                value={targetMood}
                                onChange={setTargetMood}
                                options={MOOD_OPTIONS}
                            />
                        )}
                    </div>

                    {/* Search Button */}
                    <button className="btn-transform" onClick={onTransform}>
                        Transform
                    </button>
                </div>

                {/* Footer Text */}
                <div className="hero-footer">
                    <span>Personalized</span>
                    <span>Emotional</span>
                    <span>Intelligence</span>
                </div>
            </div>
        </div>
    );
}
