import { GenerationRequest } from './types';

// The strict Instruction-Style schema for fine-tuning
export interface TrainingExample {
    input: {
        system_instruction: string;
        context: {
            emotion_contract: {
                target_emotion: string;
                tone: string;
                goal: string;
                style_constraint: string;
            };
            user_profile: {
                traits: string[];
                confidence: string;
                motivation: string;
                sensitivities: string[];
            };
            situation: {
                current_mood: string;
                gap: number;
                intensity: string;
            };
        };
    };
    output: {
        text: string;
    };
}

/**
 * Converts a runtime GenerationRequest and an ideal response into a 
 * valid TrainingExample for fine-tuning.
 */
export function createTrainingExample(
    request: GenerationRequest,
    idealResponse: string
): TrainingExample {
    const { userProfile, targetEmotion, intensityLevel, messageType, systemPromptSpecs } = request;

    return {
        input: {
            system_instruction: "You are the Language Realization Engine. You do not decide the emotion. You output text matching these exact parameters.",
            context: {
                emotion_contract: {
                    target_emotion: targetEmotion.label,
                    tone: targetEmotion.tone,
                    goal: targetEmotion.emotionalGoal,
                    style_constraint: messageType
                },
                user_profile: {
                    traits: userProfile.psychometrics.personalityTraits,
                    confidence: userProfile.psychometrics.confidenceLevel,
                    motivation: userProfile.psychometrics.motivationStyle,
                    sensitivities: userProfile.psychometrics.sensitivities
                },
                situation: {
                    current_mood: userProfile.emotionalState.currentLabel,
                    gap: userProfile.emotionalState.gap,
                    intensity: intensityLevel
                }
            }
        },
        output: {
            text: idealResponse
        } // Constraints like forbidden words are part of system prompt in runtime, 
        // but for training, we want the model to learn the *result* of satisfied constraints.
        // We could add them to input if we want the model to learn explicit constraint following 
        // from the prompt, but the "Contract" approach suggests the style/tone implies them.
        // For now, sticking to the approved plan schema.
    };
}
