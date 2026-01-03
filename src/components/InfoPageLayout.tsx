'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface InfoPageLayoutProps {
    title: string;
    subtitle: string;
    children: React.ReactNode;
}

export function InfoPageLayout({ title, subtitle, children }: InfoPageLayoutProps) {
    const router = useRouter();

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#ffffff',
            zIndex: 100, // Below header
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflowY: 'auto',
            paddingTop: '6rem' // Space for header
        }}>
            <div className="animate-fade-in-up" style={{
                width: '100%',
                maxWidth: '48rem',
                padding: '2rem',
                marginBottom: '4rem'
            }}>
                <button
                    onClick={() => router.back()}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: 'none',
                        border: 'none',
                        color: '#64748b',
                        cursor: 'pointer',
                        marginBottom: '2rem',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        letterSpacing: '0.05em'
                    }}
                >
                    <ArrowLeft size={16} />
                    BACK
                </button>

                <h1 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '3rem',
                    color: '#0f172a',
                    marginBottom: '0.5rem'
                }}>
                    {title}
                </h1>

                <p style={{
                    fontSize: '1.25rem',
                    color: '#64748b',
                    marginBottom: '3rem',
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic'
                }}>
                    {subtitle}
                </p>

                <div style={{
                    fontSize: '1.125rem',
                    lineHeight: '1.8',
                    color: '#334155',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem'
                }}>
                    {children}
                </div>
            </div>
        </div>
    );
}
