'use client';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface MoodSelectorProps {
    value: string;
    onChange: (value: string) => void;
    options: string[];
}

export function MoodSelector({ value, onChange, options }: MoodSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
            {/* Trigger Area */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    width: '100%',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '1.125rem',
                    fontWeight: 500,
                    color: '#1e293b',
                }}
            >
                <span>{value}</span>
                <ChevronDown
                    size={20}
                    color="#94a3b8"
                    style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease'
                    }}
                />
            </div>

            {/* Dropdown Menu (The "Card") */}
            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: '140%',
                    left: '-1.5rem',
                    right: '-1.5rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '1.5rem',
                    padding: '0.75rem',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                    border: '1px solid rgba(255, 255, 255, 0.6)',
                    zIndex: 100,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem',
                    maxHeight: '300px',
                    overflowY: 'auto'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '-8px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '0',
                        height: '0',
                        borderLeft: '8px solid transparent',
                        borderRight: '8px solid transparent',
                        borderBottom: '8px solid rgba(255, 255, 255, 0.95)'
                    }} />

                    {options.map((option) => (
                        <div
                            key={option}
                            onClick={() => {
                                onChange(option);
                                setIsOpen(false);
                            }}
                            style={{
                                padding: '0.75rem 1.5rem',
                                borderRadius: '1rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                backgroundColor: value === option ? '#f3e8ff' : 'transparent',
                                color: value === option ? '#581c87' : '#475569',
                                fontWeight: value === option ? 600 : 500,
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                if (value !== option) {
                                    e.currentTarget.style.backgroundColor = '#f8fafc';
                                    e.currentTarget.style.color = '#1e293b';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (value !== option) {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = '#475569';
                                }
                            }}
                        >
                            {option}
                            {value === option && <Check size={16} />}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
