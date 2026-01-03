import { createTrainingExample } from '../src/lib/training-data';
import { GenerationRequest, StructuredUserProfile } from '../src/lib/types';
import { EMOTIONS } from '../src/config/emotions';

const mockProfile: StructuredUserProfile = {
    dominantTraits: ['Creative', 'Ambitious'],
    interestCategories: ['Career', 'Wealth'],
    emotionalState: {
        currentLevel: 25,
        currentLabel: 'Stressed',
        targetLabel: 'Confident',
        gap: 70
    },
    keyFocusAreas: ['Work-life balance'],
    processedAt: new Date().toISOString(),
    schemaVersion: '1.0.0',
    psychometrics: {
        personalityTraits: ['Creative', 'Ambitious'],
        confidenceLevel: 'low',
        motivationStyle: 'achievement-oriented',
        humorTolerance: 'medium',
        sensitivities: ['failure', 'pressure']
    },
    traits: [], interests: { selected: [], custom: '' }, reflection: { strength: '', insecurity: '' }, mood: { current: 0, target: '' }, freeform: ''
};

const mockRequest: GenerationRequest = {
    userProfile: mockProfile,
    targetEmotion: EMOTIONS.find(e => e.id === 'confident')!,
    intensityLevel: 'high',
    messageType: 'encouragement', // Using allowed style
    systemPromptSpecs: {
        tone: 'Bold, Assured',
        forbiddenWords: [],
        requiredKeywords: ['power']
    }
};

const idealResponse = "You are building an empire, not just a career. The pressure you feel is the weight of your own ambition. Carry it.";

const example = createTrainingExample(mockRequest, idealResponse);

console.log(JSON.stringify(example, null, 2));
