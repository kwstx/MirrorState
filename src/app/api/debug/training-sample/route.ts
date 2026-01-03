import { NextResponse } from 'next/server';
import { buildGenerationRequest } from '@/lib/orchestrator';
import { createTrainingExample } from '@/lib/training-data';
import { NormalizedUserProfile } from '@/lib/types';

// Hardcoded ideal responses for simulation
const IDEAL_RESPONSES: Record<string, string> = {
    happy: "Keep riding this wave. Your joy is magnetic—share it.",
    angry: "Validation: Your anger is energy. Don't suppress it, channel it.",
    sad: "It is okay to be here. Rest is productive too.",
    motivated: "Go. Now. The window is open.",
    confident: "Stay humble, but stay hungry. You've got this."
};

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { profile, emotionId } = body;

        const generationRequest = buildGenerationRequest({
            ...(profile as NormalizedUserProfile),
            schemaVersion: "1.0.0",
            psychometrics: {
                personalityTraits: [],
                confidenceLevel: "medium",
                motivationStyle: "intrinsic",
                humorTolerance: "medium",
                sensitivities: []
            }
        }, emotionId);

        // Simulate an ideal response (in refined process, this would come from a human or superior model)
        const idealText = IDEAL_RESPONSES[emotionId] || "Default ideal response.";

        const trainingExample = createTrainingExample(generationRequest, idealText);

        return NextResponse.json(trainingExample);

    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to generate sample', details: String(error) },
            { status: 500 }
        );
    }
}
