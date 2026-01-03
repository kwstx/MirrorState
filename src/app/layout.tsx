import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });

export const metadata: Metadata = {
  title: 'MirrorState',
  description: 'Feel any emotion instantly',
};

import { GenerationProvider } from '@/lib/context/generation-context';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <GenerationProvider>
          <div className="app-container">
            {/* Background Image */}
            <div className="background-image" style={{ backgroundImage: `url('/background.png')` }} />

            {/* Overlay */}
            <div className="background-overlay" />

            <Header />

            {children}
          </div>
        </GenerationProvider>
      </body>
    </html>
  );
}
