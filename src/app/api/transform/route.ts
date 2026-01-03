import { NextResponse } from 'next/server';
import { transformUserProfile } from '@/lib/transformer';
import { RawUserProfile } from '@/lib/types';

export async function POST(request: Request) {
    try {
        const rawData: RawUserProfile = await request.json();

        // Basic validation check
        if (!rawData || !rawData.traits || !rawData.mood) {
            return NextResponse.json(
                { error: 'Invalid profile data provided' },
                { status: 400 }
            );
        }

        const normalizedProfile = transformUserProfile(rawData);

        return NextResponse.json(normalizedProfile);

    } catch (error) {
        console.error('Transformation error:', error);
        return NextResponse.json(
            { error: 'Failed to transform profile', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
