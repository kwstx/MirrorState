'use client';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

export function TraitsPage() {
    const router = useRouter();

    return (
        <div className="questionnaire-container">
            {/* Full screen white background overlay */}
            <div style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: '#ffffff',
                zIndex: -1,
                width: '100vw',
                height: '100vh'
            }} />

            <div className="glass-card" style={{ backgroundColor: 'transparent', boxShadow: 'none', border: 'none', padding: '0' }}>
                <h2 className="form-title">Personal Traits</h2>
                <p className="form-subtitle">Tell us a bit about who you are.</p>

                <div className="mt-8">
                    <label className="input-label" style={{ fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>
                        Your Traits
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. Ambitious, Sensitive, Creative..."
                        className="input-field"
                        style={{ fontSize: '1.25rem', padding: '1.5rem', height: 'auto' }}
                        autoFocus
                    />
                </div>

                <div className="btn-nav-group">
                    <button className="btn-secondary" onClick={() => router.push('/')}>Back</button>
                    <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        Continue <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
