'use client';

import { InfoPageLayout } from '@/components/InfoPageLayout';

export default function PhilosophyPage() {
    return (
        <InfoPageLayout
            title="Our Philosophy"
            subtitle="Radical honesty, stoicism, and the power of words."
        >
            <p>
                <strong>Your Emotion, Delivered</strong><br />
                The core purpose of MirrorState is simple but powerful: <strong>to help you experience the emotion you desire</strong>. Whether you want to feel motivated, humbled, loved, or challenged, we curate the words to take you there.
            </p>
            <p>
                <strong>Targeted Experience</strong><br />
                Most apps try to make you feel "good." We try to make you feel <em>precisely</em> what you asked for. By understanding your interests and your current state, we tailor a reflection that hits the exact emotional note you need.
            </p>
            <p>
                <strong>The Right Words at the Right Time</strong><br />
                Language is a bridge to feeling. A well-timed compliment can lift you to the clouds, and a sharp roast can ground you in reality. We use both ends of the spectrum to ensure you leave this session feeling exactly how you intended.
            </p>
        </InfoPageLayout>
    );
}
