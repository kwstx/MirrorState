export interface LLMService {
    generate(systemPrompt: string, userPrompt: string): Promise<string>;
}

export class MockLLMService implements LLMService {
    async generate(systemPrompt: string, userPrompt: string): Promise<string> {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Simple keyword matching to simulate different responses for testing
        const lowerPrompt = systemPrompt.toLowerCase();

        if (lowerPrompt.includes('happy')) {
            return "✨ Happiness is a direction, not a place. Your creative energy is your superpower today. Keep pushing boundaries!";
        }
        if (lowerPrompt.includes('angry')) {
            return "🔥 Use that heat. Frustration is just ambition with nowhere to go. Channel it into your work and prove them wrong.";
        }
        if (lowerPrompt.includes('sad')) {
            return "🌊 It's okay to ebb before you flow. Take a moment to just be. Clarity will come in the quiet.";
        }
        if (lowerPrompt.includes('motivated')) {
            return "🚀 You are locked in. Don't stop now. That goal isn't going to crush itself.";
        }
        if (lowerPrompt.includes('confident')) {
            return "🦁 Walk into that room like you own it. You've done the work. Now show them the result.";
        }

        return "🤖 System Ready. Emulating emotional intelligence...";
    }
}

export class GoogleGeminiService implements LLMService {
    async generate(systemPrompt: string, userPrompt: string): Promise<string> {
        // Placeholder for future integration
        // const { GoogleGenerativeAI } = require("@google/generative-ai");
        // ...
        return "Gemini integration pending keys.";
    }
}
