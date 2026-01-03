import { Smile, Frown, Angry, Zap, Shield } from 'lucide-react';

export interface AllowedStyles {
    color: string;
    iconName: string;
    animation?: string;
}

export type MessageStyle = 'roast' | 'encouragement' | 'tough-love' | 'zen' | 'affirmation' | 'validation';
export type EmotionalGoal = 'uplift' | 'catharsis' | 'validation' | 'activation' | 'stabilization';

export interface EmotionConfig {
    id: string;
    label: string;
    styles: AllowedStyles;
    intensityRange: { min: number; max: number };

    // Strict Contract Fields
    tone: string;
    allowedLanguageStyles: MessageStyle[];
    emotionalGoal: EmotionalGoal;

    // Content Rules (Flattened)
    keywords: string[];
    positive: boolean;
    highEnergy: boolean;
}

export const EMOTIONS: EmotionConfig[] = [
    {
        id: 'happy',
        label: 'Happy',
        styles: { color: '#22c55e', iconName: 'Smile' },
        intensityRange: { min: 60, max: 100 },
        tone: 'Bright, Uplifting, Optimistic',
        allowedLanguageStyles: ['encouragement', 'affirmation'],
        emotionalGoal: 'uplift',
        keywords: ['joy', 'content', 'optimistic', 'cheerful', 'light'],
        positive: true,
        highEnergy: true,
    },
    {
        id: 'angry',
        label: 'Angry',
        styles: { color: '#ef4444', iconName: 'Angry' },
        intensityRange: { min: 70, max: 100 },
        tone: 'Intense, Sharp, Validating',
        allowedLanguageStyles: ['validation', 'zen'],
        emotionalGoal: 'catharsis',
        keywords: ['frustrated', 'furious', 'irritated', 'release', 'fire'],
        positive: false,
        highEnergy: true,
    },
    {
        id: 'sad',
        label: 'Sad',
        styles: { color: '#3b82f6', iconName: 'Frown' },
        intensityRange: { min: 10, max: 50 },
        tone: 'Gentle, Warm, Slow',
        allowedLanguageStyles: ['validation', 'zen'],
        emotionalGoal: 'validation',
        keywords: ['down', 'melancholy', 'depressed', 'blue', 'breathe'],
        positive: false,
        highEnergy: false,
    },
    {
        id: 'motivated',
        label: 'Motivated',
        styles: { color: '#f97316', iconName: 'Zap', animation: 'pulse' },
        intensityRange: { min: 80, max: 100 },
        tone: 'Punchy, Direct, Action-Oriented',
        allowedLanguageStyles: ['tough-love', 'encouragement'],
        emotionalGoal: 'activation',
        keywords: ['inspired', 'driven', 'energetic', 'focused', 'go'],
        positive: true,
        highEnergy: true,
    },
    {
        id: 'confident',
        label: 'Confident',
        styles: { color: '#eab308', iconName: 'Shield' },
        intensityRange: { min: 60, max: 90 },
        tone: 'Bold, Assured, Grounded',
        allowedLanguageStyles: ['affirmation', 'roast'], // Roast allowed for grounding
        emotionalGoal: 'stabilization',
        keywords: ['secure', 'assured', 'bold', 'capable', 'power'],
        positive: true,
        highEnergy: false, // Medium energy, actually
    },
];
