export interface RawUserProfile {
    traits: string[];          // e.g., ["Creative", "Ambitious"]
    interests: {
        selected: string[];      // e.g., ["job", "health"]
        custom: string;          // e.g., "Skydiving"
    };
    reflection: {
        strength: string;
        insecurity: string;
    };
    mood: {
        current: number;         // 0-100
        target: string;          // e.g., "happy" (ID from target-mood page)
    };
    freeform: string;          // Raw text note
}

export interface NormalizedUserProfile {
    dominantTraits: string[];  // Cleaned, capitalized
    interestCategories: string[]; // Mapped from IDs (e.g., 'job' -> 'Career')
    emotionalState: {
        currentLevel: number;
        currentLabel: 'Stressed' | 'Anxious' | 'Okay' | 'Good' | 'Great';
        targetLabel: string;
        gap: number; // target value - current value
    };
    keyFocusAreas: string[];   // Extracted from reflection/freeform (simplified for now)
    processedAt: string;       // ISO Date
}

// Re-export EmotionConfig so it can be used in GenerationRequest
import { EmotionConfig, MessageStyle } from '@/config/emotions';

export interface Psychometrics {
    personalityTraits: string[];
    confidenceLevel: 'low' | 'medium' | 'high';
    motivationStyle: 'intrinsic' | 'extrinsic' | 'fear-based' | 'achievement-oriented';
    humorTolerance: 'low' | 'medium' | 'high';
    sensitivities: string[];
}

export interface StructuredUserProfile extends NormalizedUserProfile {
    schemaVersion: string; // e.g. "1.0.0"
    psychometrics: Psychometrics;
}

export interface GenerationRequest {
    userProfile: StructuredUserProfile;
    targetEmotion: EmotionConfig;
    intensityLevel: 'low' | 'medium' | 'high' | 'extreme';
    messageType: MessageStyle;
    systemPromptSpecs: {
        tone: string;
        forbiddenWords: string[];
        requiredKeywords: string[];
    };
}
