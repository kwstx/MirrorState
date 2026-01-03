'use client';

import { InfoPageLayout } from '@/components/InfoPageLayout';

export default function ExperiencePage() {
    return (
        <InfoPageLayout
            title="The Experience"
            subtitle="Understand how MirrorState reflects your inner world."
        >
            <p>
                <strong>1. Define Your Focus</strong><br />
                The journey begins with you. You tell us what matters right now—whether it's your career, your health, or your relationships. This context allows us to speak directly to your reality, not just at it.
            </p>
            <p>
                <strong>2. Set Your Target</strong><br />
                How do you want to feel? This is the crucial step. If you choose "Angry" or "Anxious," we understand you want to be challenged (Roasted). If you choose "Good" or "Great," we know you need validation (Compliments). You are in control of the emotional output.
            </p>
            <p>
                <strong>3. The Transformation</strong><br />
                Our system synthesizes your inputs and delivers a singular, powerful message. It might be a harsh truth that makes you laugh at your own excuses, or a profound affirmation that reminds you of your worth. In either case, it is the experience you asked for.
            </p>
        </InfoPageLayout>
    );
}
