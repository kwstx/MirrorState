import { MessageStyle } from '@/config/emotions';

export interface SeedResponse {
    emotionId: string;
    style: MessageStyle;
    templates: string[];
}

export const SEED_CONTENT: SeedResponse[] = [
    // HAPPY
    {
        emotionId: 'happy',
        style: 'encouragement',
        templates: [
            "You're glowing. That energy is contagious—use it to fuel your next big leap.",
            "This is what alignment feels like. Capture this moment and let it propel you forward.",
            "Ride this wave. The world needs exactly what you have to offer right now.",
            "Joy is a signal that you're on the right path. Keep walking it.",
            "Don't minimize this feeling. You earned it. Now, what's next?"
        ]
    },
    {
        emotionId: 'happy',
        style: 'affirmation',
        templates: [
            "You are in your element. Trust this state of flow.",
            "Your happiness is valid, productive, and necessary.",
            "This clarity is your power. You are exactly where you need to be.",
            "Breathe this in. You are capable of sustained joy.",
            "You are a magnet for good things when you vibrate at this frequency."
        ]
    },

    // ANGRY
    {
        emotionId: 'angry',
        style: 'validation',
        templates: [
            "Your anger is energy. Don't suppress it, channel it into something concrete.",
            "It makes sense that you're frustrated. Someone with your standards shouldn't settle.",
            "This heat is telling you a boundary was crossed. Listen to it.",
            "You're not wrong to be mad. The question is: what will you build with this fire?",
            "Feel the burn, but don't let it consume the house. Direct the flame."
        ]
    },
    {
        emotionId: 'angry',
        style: 'zen',
        templates: [
            "Breathe. The fire serves you best when it's controlled, not wild.",
            "Step back. Reacting now gives away your power. Responding later keeps it.",
            "Let the wave of frustration peak and crash. You are the shore, not the water.",
            "Silence is a louder response than screaming. Find your center.",
            "This feeling is a cloud. Watch it float by without becoming the storm."
        ]
    },

    // SAD
    {
        emotionId: 'sad',
        style: 'validation',
        templates: [
            "It is okay to be here. Rest is productive too.",
            "Sorrow cleanses the lens. Take the time you need to see clearly again.",
            "You don't have to 'fix' this right now. Just existing is enough.",
            "The heaviest rain brings the deepest growth. Let yourself just be.",
            "This heaviness is just gravity grounding you before you rise again."
        ]
    },
    {
        emotionId: 'sad',
        style: 'zen',
        templates: [
            "Gentle now. Treat yourself like a friend who needs rest.",
            "Inhale peace, exhale expectaion. There is nowhere else you need to be.",
            "Softness is a strength. Wrap yourself in it for a moment.",
            "The world will wait. prioritized your internal quiet.",
            "Peace is found in the pause. Stay here as long as you need."
        ]
    },

    // MOTIVATED
    {
        emotionId: 'motivated',
        style: 'tough-love',
        templates: [
            "Go. Now. The window is open, and it won't stay open forever.",
            "You said you wanted it. Proving it starts this second.",
            "Don't just plan it—execute it. Thoughts are cheap; action is currency.",
            "Stop preparing. You're ready. The only thing missing is movement.",
            "This energy is a limited resource. Spend it on high-leverage action."
        ]
    },
    {
        emotionId: 'motivated',
        style: 'encouragement',
        templates: [
            "You are locked in. I can see the momentum building.",
            "This is your moment. Your focus is sharp enough to cut through anything.",
            "Trust that drive. It's taking you exactly where you designed to go.",
            "You've built the engine. Now floor it.",
            "Capture this lightning. You are unstoppable today."
        ]
    },

    // CONFIDENT
    {
        emotionId: 'confident',
        style: 'affirmation',
        templates: [
            "Walk into that room like you own it. You've done the work.",
            "This isn't arrogance; it's evidence. You know what you're capable of.",
            "Stand tall. Your competence speaks for itself.",
            "You are the authority in your own life. Trust your command.",
            "Solid. Grounded. Ready. You are the foundation."
        ]
    },
    {
        emotionId: 'confident',
        style: 'roast',
        templates: [
            "Okay, King of the World, just remember to tie your shoes.",
            "You're doing great, but let's not start signing autographs just yet.",
            "Love the confidence. Just make sure your ego fits through the door.",
            "You're on fire. Try not to burn the whole building down.",
            "Yes, you're amazing. No, that doesn't mean you can skip leg day."
        ]
    }
];
