import { Metadata } from 'next';
import { LegalView } from '@/components/views/LegalView';

export const metadata: Metadata = {
  title: 'Global Shipping & Bespoke Returns Policy | SHATTAAN',
  description:
    'Information on SHATTAAN worldwide white-glove courier delivery, complimentary shipping thresholds, and our 30-day return policy.',
  alternates: {
    canonical: '/shipping-returns',
  },
};

export default function ShippingReturnsPage() {
  return <LegalView initialTab="shipping" />;
}
