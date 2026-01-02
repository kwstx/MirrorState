import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });

export const metadata: Metadata = {
  title: 'Mood Mirror',
  description: 'Feel any emotion instantly',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <div className="app-container">
          {/* Background Image */}
          <div className="background-image" style={{ backgroundImage: `url('/background.png')` }} />

          {/* Overlay */}
          <div className="background-overlay" />

          <Header />

          {children}
        </div>
      </body>
    </html>
  );
}
