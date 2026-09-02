import { Metadata } from 'next';
import { CatalogView } from '@/components/views/CatalogView';

export const metadata: Metadata = {
  title: 'Catalog & Curated Collection | SHATTAAN',
  description:
    'Browse the complete SHATTAAN luxury catalog including couture apparel, Tuscan leather accessories, Swiss timepieces, acoustics, and digital master vault deliverables.',
  alternates: {
    canonical: '/shop',
  },
};

export default function ShopPage() {
  return <CatalogView />;
}
