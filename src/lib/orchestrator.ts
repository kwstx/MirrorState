import { StructuredUserProfile, GenerationRequest } from './types';
import { EMOTIONS, EmotionConfig, MessageStyle } from '@/config/emotions';

/**
 * Calculates the gap between current emotional state and target state.
 * Returns a value roughly between 0 and 100.
 */
function calculateGap(current: number, targetMin: number, targetMax: number): number {
    if (current < targetMin) return targetMin - current;
    if (current > targetMax) return current - targetMax;
    return 0; // Within range
}

/**
 * Determines the intensity level based on the emotional gap.
 */
function determineIntensity(gap: number): GenerationRequest['intensityLevel'] {
    if (gap > 60) return 'extreme';
    if (gap > 40) return 'high';
    if (gap > 20) return 'medium';
    return 'low';
}

/**
 * Selects the message type from the allowed styles based on intensity/gap.
 */
function determineMessageType(
    emotion: EmotionConfig,
    gap: number
): MessageStyle {
    // If only one style is allowed, return it
    if (emotion.allowedLanguageStyles.length === 1) {
        return emotion.allowedLanguageStyles[0];
    }

    // Logic: Higher gap -> More direct/intense style (if allowed)
    // Lower gap -> More validating/grounding style

    // Specific logic per emotion type (could be genericized, but strict rules are better)
    if (emotion.id === 'happy' || emotion.id === 'motivated') {
        // Gap high? TOUGH LOVE if allowed, else ENCOURAGEMENT
        if (gap > 50 && emotion.allowedLanguageStyles.includes('tough-love')) return 'tough-love';
        return 'encouragement';
    }

    if (emotion.id === 'confident') {
        // Gap small (already confident)? ROAST if allowed to keep humble
        if (gap < 20 && emotion.allowedLanguageStyles.includes('roast')) return 'roast';
        return 'affirmation';
    }

    // Default fallback: return the first allowed style (safest)
    return emotion.allowedLanguageStyles[0];
}

export function buildGenerationRequest(
    profile: StructuredUserProfile,
    targetEmotionId: string
): GenerationRequest {
    // 1. Find the target emotion config (Contract)
    const emotionConfig = EMOTIONS.find(e => e.id === targetEmotionId);
    if (!emotionConfig) {
        throw new Error(`Unknown emotion ID: ${targetEmotionId}`);
    }

    // 2. Calculate Gap & Intensity
    const gap = calculateGap(
        profile.emotionalState.currentLevel,
        emotionConfig.intensityRange.min,
        emotionConfig.intensityRange.max
    );
    const intensity = determineIntensity(gap);

    // 3. Determine Message Type (Strict Contract Enforcement)
    const messageType = determineMessageType(emotionConfig, gap);

    // 4. Build System Prompt Specs
    // Use strict Tone from contract, merged with message type nuance
    const specs = {
        tone: `${emotionConfig.tone}. Style: ${messageType}.`,
        forbiddenWords: messageType === 'validation' ? ['fix', 'wrong', 'should'] : [],
        requiredKeywords: emotionConfig.keywords // Direct access from flattened contract
    };

    return {
        userProfile: profile,
        targetEmotion: emotionConfig,
        intensityLevel: intensity,
        messageType: messageType,
        systemPromptSpecs: specs
    };
}
