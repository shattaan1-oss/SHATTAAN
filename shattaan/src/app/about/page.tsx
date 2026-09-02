import { Metadata } from 'next';
import { AboutView } from '@/components/views/AboutView';

export const metadata: Metadata = {
  title: 'Atelier Heritage & Craft Philosophy | SHATTAAN',
  description:
    'Learn about SHATTAAN (shattaan.com) and our commitment to generational guild craftsmanship, ethical provenance, and timeless design.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return <AboutView />;
}
