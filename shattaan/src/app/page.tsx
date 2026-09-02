import { Metadata } from 'next';
import { HomeView } from '@/components/views/HomeView';

export const metadata: Metadata = {
  title: 'SHATTAAN | Curated Luxury Marketplace & High-Craft Living',
  description:
    'Explore generational craft, cashmere knitwear, artisanal leather goods, Swiss horology, and audiophile acoustic engineering at SHATTAAN.',
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  return <HomeView />;
}
