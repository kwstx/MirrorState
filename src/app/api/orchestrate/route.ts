import { NextResponse } from 'next/server';
import { buildGenerationRequest } from '@/lib/orchestrator';
import { NormalizedUserProfile } from '@/lib/types';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { profile, emotionId } = body;

        // Basic validation
        if (!profile || !emotionId) {
            return NextResponse.json(
                { error: 'Missing profile or emotionId' },
                { status: 400 }
            );
        }

        // Validate profile structure (simple check)
        if (!profile.emotionalState || typeof profile.emotionalState.currentLevel !== 'number') {
            return NextResponse.json(
                { error: 'Invalid profile data provided' },
                { status: 400 }
            );
        }

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

        return NextResponse.json(generationRequest);

    } catch (error) {
        console.error('Orchestration error:', error);
        return NextResponse.json(
            { error: 'Failed to orchestrate request', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
