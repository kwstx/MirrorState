'use client';

import { InfoPageLayout } from '@/components/InfoPageLayout';

export default function DisclaimerPage() {
    return (
        <InfoPageLayout
            title="Disclaimer"
            subtitle="Important information about your safety and privacy."
        >
            <p style={{ fontSize: '1.25rem', lineHeight: '1.8' }}>
                This application is designed purely for <strong>entertainment</strong> purposes.
            </p>
            <p style={{ fontSize: '1.25rem', lineHeight: '1.8' }}>
                The "Roast" feature uses exaggerated humor and satire. It is <strong>not</strong> intended to offend, harm, or be taken seriously. Please engage with these features only if you are comfortable with dark humor.
            </p>
        </InfoPageLayout>
    );
}
