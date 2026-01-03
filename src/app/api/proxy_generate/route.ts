import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Forward to Python API Service (stateless)
        console.log(`[Proxy] Forwarding request to ${'http://127.0.0.1:8005/generate'}...`);
        const response = await fetch('http://127.0.0.1:8005/generate', {
            method: 'POST',
            signal: AbortSignal.timeout(120000), // 120 seconds
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        console.log(`[Proxy] Upstream response status: ${response.status}`);
        if (!response.ok) {
            const text = await response.text();
            console.error(`[Proxy] Upstream error body: ${text}`);
            throw new Error(`Upstream API failed with status ${response.status}: ${text}`);
        }

        const data = await response.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error('Proxy Generation Error:', error);
        return NextResponse.json(
            { error: 'Failed to generate text', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
