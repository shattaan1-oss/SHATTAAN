import { Metadata } from 'next';
import { CartView } from '@/components/views/CartView';

export const metadata: Metadata = {
  title: 'Shopping Bag | SHATTAAN Luxury Marketplace',
  description: 'Review your selected garments, fine leather accessories, horology, and digital deliverables before secure checkout.',
  alternates: {
    canonical: '/cart',
  },
};

export default function CartPage() {
  return <CartView />;
}
