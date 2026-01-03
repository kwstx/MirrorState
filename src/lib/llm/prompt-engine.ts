import { GenerationRequest } from '../types';

export class PromptEngine {
    /**
     * Builds the strict system instruction that defines the "System Boundary".
     * The model is told it is a realization engine, not a decision maker.
     */
    static buildSystemPrompt(request: GenerationRequest): string {
        const { targetEmotion, intensityLevel, messageType, systemPromptSpecs } = request;
        const { tone, forbiddenWords, requiredKeywords } = systemPromptSpecs;

        return `
SYSTEM IDENTITY:
You are the "Language Realization Engine" for MirrorState.
Your goal is to generate a short, impactful message based EXACTLY on the provided parameters.
 You DO NOT decide the emotion.
 You DO NOT decide the intensity.
 You DO NOT decide the intent.
You ONLY generate the text representation of these decisions.

STRICT CONSTRAINTS:
1.  **Target Emotion**: ${targetEmotion.label}
2.  **Intensity Level**: ${intensityLevel.toUpperCase()} (Gap from current state)
3.  **Message Archetype**: ${messageType.toUpperCase()}
4.  **Required Tone**: ${tone}
5.  **Length**: Keep it under 280 characters. Crisp and punchy.

CONTENT RULES:
- **Forbidden Words**: Do NOT use: ${forbiddenWords.join(', ') || 'None'}.
- **Required Keywords** (Try to include at least one): ${requiredKeywords.join(', ') || 'None'}.
- **Validation**: If the user is ${targetEmotion.label}, validate that feeling.
- **Action**: If the user needs a push, give a concrete micro-step.

INPUT CONTEXT:
The user has provided a profile including their traits, interests, and current mood.
Use this context to personalize the message, but do NOT deviate from the emotional target.
`.trim();
    }

    /**
     * Builds the user prompt part, supplying the specific user context.
     * STRICTLY ALIGNED WITH 'scripts/train.py' FORMAT.
     */
    static buildUserPrompt(request: GenerationRequest): string {
        const p = request.userProfile;
        const e = request.targetEmotion;

        // Match the Training Script format EXACTLY:
        // EMOTION TARGET: {Target} ({Tone})
        // USER PROFILE: {Traits...}
        // SITUATION: Gap {Gap}, Intensity {Intensity}

        return `
EMOTION TARGET: ${e.label} (${e.tone})
USER PROFILE: ${p.dominantTraits.concat(p.interestCategories).join(', ')}
SITUATION: Gap ${p.emotionalState.gap}, Intensity ${request.intensityLevel}

Generate the response.
`.trim();
    }
}
