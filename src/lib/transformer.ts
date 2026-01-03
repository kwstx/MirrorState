import { RawUserProfile, NormalizedUserProfile, StructuredUserProfile, Psychometrics } from './types';

const INTEREST_MAP: Record<string, string> = {
    job: 'Career & Purpose',
    love: 'Relationships',
    health: 'Health & Vitality',
    weight: 'Physical Wellness',
    confidence: 'Self-Esteem',
    finance: 'Financial Freedom'
};

const MOOD_TARGET_MAP: Record<string, string> = {
    stressed: 'Tranquility',
    anxious: 'Peace',
    okay: 'Clarity',
    good: 'Joy',
    great: 'Ecstasy'
};

function getMoodLabel(value: number): NormalizedUserProfile['emotionalState']['currentLabel'] {
    if (value < 20) return 'Stressed';
    if (value < 40) return 'Anxious';
    if (value < 60) return 'Okay';
    if (value < 80) return 'Good';
    return 'Great';
}

function optimizeText(text: string): string {
    return text.trim().replace(/\s+/g, ' ');
}

function derivePsychometrics(raw: RawUserProfile): Psychometrics {
    // Confidence derivation
    let confidenceLevel: Psychometrics['confidenceLevel'] = 'medium';
    if (raw.mood.current > 70) confidenceLevel = 'high';
    else if (raw.mood.current < 40) confidenceLevel = 'low';

    // Motivation Style derivation
    // Simple heuristic based on selected interests
    let motivationStyle: Psychometrics['motivationStyle'] = 'intrinsic';
    const interests = raw.interests.selected;
    if (interests.includes('job') || interests.includes('finance')) {
        motivationStyle = 'achievement-oriented';
    } else if (interests.includes('weight') || interests.includes('beauty')) {
        motivationStyle = 'extrinsic'; // Often external validation
    } else if (interests.includes('confidence') || interests.includes('love')) {
        motivationStyle = 'intrinsic';
    }

    // Sensitivities extraction (simple keyword extraction from insecurity field)
    // In a real app, this would use an NLP extractor
    const sensitivities = raw.reflection.insecurity
        .toLowerCase()
        .split(/[\s,]+/)
        .filter(word => word.length > 3 && !['this', 'that', 'with', 'have'].includes(word));

    return {
        personalityTraits: raw.traits.map(t => optimizeText(t)),
        confidenceLevel,
        motivationStyle,
        humorTolerance: 'medium', // Default for now
        sensitivities
    };
}

export function transformUserProfile(raw: RawUserProfile): StructuredUserProfile {
    // 1. Process Traits
    const dominantTraits = raw.traits
        .map(t => optimizeText(t))
        .filter(t => t.length > 0);

    // 2. Process Interests
    const interestCategories = raw.interests.selected
        .map(id => INTEREST_MAP[id] || id);

    if (raw.interests.custom) {
        interestCategories.push(optimizeText(raw.interests.custom));
    }

    // 3. Process Mood
    const currentLevel = Math.max(0, Math.min(100, Math.round(raw.mood.current)));
    const currentLabel = getMoodLabel(currentLevel);
    // Default target if unknown
    const targetLabel = MOOD_TARGET_MAP[raw.mood.target] || optimizeText(raw.mood.target) || 'Betterment';

    // 4. Key Focus Areas (Simple aggregation for now)
    const keyFocusAreas = [
        raw.reflection.strength,
        raw.reflection.insecurity,
        raw.freeform
    ].map(optimizeText).filter(s => s.length > 0);

    // 5. Derive Deep Psychometrics
    const psychometrics = derivePsychometrics(raw);

    return {
        dominantTraits,
        interestCategories,
        emotionalState: {
            currentLevel,
            currentLabel,
            targetLabel,
            gap: 100 - currentLevel // Simple gap to perfection/target
        },
        keyFocusAreas,
        processedAt: new Date().toISOString(),
        schemaVersion: "1.0.0",
        psychometrics
    };
}
