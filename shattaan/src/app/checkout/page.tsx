import { Metadata } from 'next';
import { CheckoutView } from '@/components/views/CheckoutView';

export const metadata: Metadata = {
  title: 'Secure Concierge Checkout | SHATTAAN',
  description: 'Complete your order with end-to-end encrypted concierge checkout and global courier dispatch.',
  alternates: {
    canonical: '/checkout',
  },
};

export default function CheckoutPage() {
  return <CheckoutView />;
}
