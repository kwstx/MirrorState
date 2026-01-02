'use client';
import { useRouter } from 'next/navigation';

export function Question1() {
    const router = useRouter();

    return (
        <div className="questionnaire-container">
            <div className="glass-card">
                <h2 className="form-title">Step 1</h2>
                <p className="form-subtitle">Question 1 will go here.</p>

                {/* Placeholder Nav */}
                <div className="btn-nav-group">
                    <button className="btn-secondary" onClick={() => router.push('/')}>Back</button>
                </div>
            </div>
        </div>
    );
}
