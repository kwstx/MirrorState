import { NextResponse } from 'next/server';
import { PromptEngine } from '@/lib/llm/prompt-engine';
import { MockLLMService } from '@/lib/llm/service';
import { GenerationRequest } from '@/lib/types';

// Singleton instance for now
const llmService = new MockLLMService();

export async function POST(request: Request) {
    try {
        const generationRequest: GenerationRequest = await request.json();

        // 1. Build Prompts
        const systemPrompt = PromptEngine.buildSystemPrompt(generationRequest);
        const userPrompt = PromptEngine.buildUserPrompt(generationRequest);

        // 2. Call LLM
        const text = await llmService.generate(systemPrompt, userPrompt);

        return NextResponse.json({
            text,
            debug: { systemPrompt, userPrompt } // helpful for verification
        });

    } catch (error) {
        console.error('Generation error:', error);
        return NextResponse.json(
            { error: 'Failed to generate text', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
