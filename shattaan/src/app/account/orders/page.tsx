import { Metadata } from 'next';
import { AccountView } from '@/components/views/AccountView';

export const metadata: Metadata = {
  title: 'My Order History | SHATTAAN Account',
  description: 'View historical orders, delivery milestones, and official receipts.',
  alternates: {
    canonical: '/account/orders',
  },
};

export default function AccountOrdersPage() {
  return <AccountView initialTab="orders" />;
}
