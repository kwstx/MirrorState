'use client';
import { useRouter } from 'next/navigation';
import { Hero } from '@/components/Hero';

export default function LandingPage() {
  const router = useRouter();
  return <Hero onTransform={() => router.push('/transform')} />;
}
