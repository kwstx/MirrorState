import { NextResponse } from 'next/server';

const PHRASES: Record<string, Record<string, string[]>> = {
    "roasts": {
        "job": [
            "Your resume is just a list of places that realized they made a mistake.",
            "You don't have a career path; you have a series of unfortunate events.",
            "McDonald's wouldn't even hire you to clean the grease trap.",
            "You're not 'between jobs'; you're structurally unemployable.",
            "The only thing you're qualified to lead is a race to the bottom."
        ],
        "weight": [
            "You're not gaining weight; you're gathering momentum for a heart attack.",
            "Your blood type is deep-fried.",
            "The only exercise you get is jumping to conclusions and pushing your luck.",
            "Even your shadow is trying to detach itself from you.",
            "You treat your body like a rental car you purchased extra insurance for."
        ],
        "health": [
            "Your internal organs are filing a class-action lawsuit against you.",
            "You interpret 'expiration date' as a challenge.",
            "You have the posture of a cooked shrimp and the stamina of a goldfish.",
            "If you donated blood, the recipient would get high cholesterol.",
            "Your doctor doesn't check your pulse; he checks your warranty."
        ],
        "love": [
            "You're the reason people fake their own deaths.",
            "Your love life is a horror movie where the audience cheers for the killer.",
            "Even AI chat bots find you clingy and desperate.",
            "You will die alone, and your cats will wait a polite 20 minutes before eating you.",
            "The only thing you attract is red flags and disappointment."
        ],
        "finance": [
            "Your credit score is lower than your IQ.",
            "You're one overdraft fee away from selling feet pics.",
            "Wealth trickles down, but you're a dam made of bad decisions.",
            "Your retirement plan is hoping the apocalypse happens soon.",
            "You handle money like a toddler handles a handgun."
        ],
        "confidence": [
            "You have the confidence of a mediocre white man with none of the privilege.",
            "Your ego is a balloon, and I'm the needle.",
            "You're not mysterious; you're just boring and lack social skills.",
            "Confidence? That's just ignorance with a megaphone.",
            "You're the main character in a movie nobody wants to watch."
        ],
        "generic": [
            "If you were any less relevant, you'd be a background texture.",
            "You bring nothing to the table but an appetite.",
            "I'd agree with you, but then we'd both be wrong and stupid.",
            "You are the human equivalent of a participation trophy.",
            "Somewhere out there is a tree tirelessly producing oxygen for you. You owe it an apology."
        ]
    },
    "compliments": {
        "job": [
            "The work you do matters more than you know; you are building a legacy of excellence.",
            "Your unique talents are a gift to the world, and your breakthrough is just around the horizon.",
            "You bring a light to your workplace that no one else can replicate; you are indispensable.",
            "Every challenge you face is just a stepping stone to the greatness you are destined for.",
            "Your dedication is inspiring, and the seeds of success you are planting today will bloom beautifully."
        ],
        "weight": [
            "Your body is a vessel of incredible strength and resilience; honor it with love.",
            "You are glowing with a beauty that comes from deep within, radiant and undeniable.",
            "Every step on your journey is a victory; be proud of the amazing person you are becoming.",
            "You are defined by your heart, your spirit, and your kindness, not by a number on a scale.",
            "Embrace your unique form; you are a masterpiece in motion, worthy of celebration."
        ],
        "health": [
            "Your commitment to your well-being is a beautiful act of self-love that inspires everyone around you.",
            "You are nurturing a vibrant, energetic future with every healthy choice you make today.",
            "Your vitality is a beacon of hope; you are strong, capable, and full of life.",
            "Treat yourself with gentleness and patience; your body is listening and healing.",
            "You are worthy of feeling your absolute best, every single day."
        ],
        "love": [
            "The love you give to the world returns to you a thousandfold; you are a magnet for affection.",
            "You deserve a love that feels like safety, warmth, and coming home.",
            "Your heart is a treasure, and the right person will cherish it as the precious gift it is.",
            "You are complete and whole on your own, and your love story is unfolding perfectly.",
            "You radiate a warmth that makes everyone feel seen, heard, and deeply loved."
        ],
        "finance": [
            "You are building a foundation of abundance that will support your dreams and generosity.",
            "Your worth is infinite and immeasurable, far beyond any bank account balance.",
            "You have the wisdom to create prosperity and the heart to use it for good.",
            "Trust in your ability to manifest the stability and freedom you desire; you are capable.",
            "Your future is bright with possibility, and abundance is flowing towards you naturally."
        ],
        "confidence": [
            "You possess a quiet strength that commands respect without saying a word.",
            "Trust your intuition; your inner voice is wise, powerful, and always guiding you true.",
            "You are enough, exactly as you are, and the world needs your authentic self.",
            "Walk with your head held high; you are a force of nature, beautiful and unstoppable.",
            "Your confidence is growing every day, rooted in the deep knowledge of your own value."
        ],
        "generic": [
            "You make the world a softer, kinder, and more beautiful place just by being in it.",
            "Your kindness is a ripple effect that touches hearts you may never even know.",
            "You are loved beyond measure, essential to the universe, and purely magic.",
            "Never forget that you are a miracle, crafted with purpose and stardust.",
            "You bring joy to others simply by existing; thank you for being you."
        ]
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { emotion, traits } = body;

        // Logic to select Roast vs Compliment
        const roastEmotions = ["angry", "disgusted", "annoyed", "bitter", "stressed", "anxious"];
        // Ensure consistent casing match
        const isRoast = roastEmotions.includes(String(emotion).toLowerCase());

        const category = isRoast ? "roasts" : "compliments";
        const userInterests: string[] = Array.isArray(traits?.interests) ? traits.interests : [];

        // Default to generic pool
        let pool = PHRASES[category]["generic"];

        // If user has an interest that acts as a modifier, try to use it
        // We pick a random interest from their list to focus on
        if (userInterests.length > 0) {
            const randomInterest = userInterests[Math.floor(Math.random() * userInterests.length)];
            if (PHRASES[category][randomInterest]) {
                pool = PHRASES[category][randomInterest];
            }
        }

        // Pick random phrase from the pool
        const text = pool[Math.floor(Math.random() * pool.length)];

        return NextResponse.json({
            text: text,
            emotion_metadata: {
                mapped_level: isRoast ? "High Intensity" : "Supportive",
                backend: "Simulated (Next.js)"
            }
        });

    } catch (error) {
        console.error("Engine API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
