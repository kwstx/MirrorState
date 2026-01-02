'use client';
import { ArrowRightLeft, Drama } from 'lucide-react';

interface HeroProps {
    onTransform: () => void;
}

export function Hero({ onTransform }: HeroProps) {
    return (
        <div className="hero-section">
            <div className="hero-content">
                <h1 className="hero-title">
                    <span className="italic">Feel</span> any <span className="icon-wrapper"><Drama className="icon-drama" /></span> emotion
                    <br />
                    <span className="italic-light">instantly</span>
                </h1>

                {/* Search Interface */}
                <div className="mood-interface">

                    {/* Input 1 */}
                    <div className="input-group">
                        <span className="input-label">How are you?</span>
                        <input
                            type="text"
                            placeholder="I feel anxious..."
                            className="mood-input"
                        />
                    </div>

                    {/* Swap Button */}
                    <button className="btn-swap">
                        <ArrowRightLeft className="icon-swap" />
                    </button>

                    {/* Input 2 */}
                    <div className="input-group">
                        <span className="input-label">Target Mood</span>
                        <select className="mood-select">
                            <option>Happy</option>
                            <option>Motivated</option>
                            <option>Calm</option>
                            <option>Confident</option>
                        </select>
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
