'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GenerationState {
    strength: string;
    insecurity: string;
    currentMood: number;
    freeformNote: string;
    targetMood: string | null;
    intensity: number; // 0.0 to 1.0 (derived or user set? defaulting to 0.5 for now)
    interests: string[];
}

interface GenerationContextType extends GenerationState {
    setStrength: (val: string) => void;
    setInsecurity: (val: string) => void;
    setCurrentMood: (val: number) => void;
    setFreeformNote: (val: string) => void;
    setTargetMood: (val: string | null) => void;
    setIntensity: (val: number) => void;
    setInterests: (val: string[]) => void;
}

const GenerationContext = createContext<GenerationContextType | undefined>(undefined);

export function GenerationProvider({ children }: { children: ReactNode }) {
    const [strength, setStrength] = useState('');
    const [insecurity, setInsecurity] = useState('');
    const [currentMood, setCurrentMood] = useState(50);
    const [freeformNote, setFreeformNote] = useState('');
    const [targetMood, setTargetMood] = useState<string | null>(null);
    const [intensity, setIntensity] = useState(0.5);
    const [interests, setInterests] = useState<string[]>([]);

    return (
        <GenerationContext.Provider
            value={{
                strength,
                setStrength,
                insecurity,
                setInsecurity,
                currentMood,
                setCurrentMood,
                freeformNote,
                setFreeformNote,
                targetMood,
                setTargetMood,
                intensity,
                setIntensity,
                interests,
                setInterests,
            }}
        >
            {children}
        </GenerationContext.Provider>
    );
}

export function useGenerationContext() {
    const context = useContext(GenerationContext);
    if (context === undefined) {
        throw new Error('useGenerationContext must be used within a GenerationProvider');
    }
    return context;
}
