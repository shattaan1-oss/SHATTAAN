import { Metadata } from 'next';
import { AccountView } from '@/components/views/AccountView';

export const metadata: Metadata = {
  title: 'Customer Account & Vault | SHATTAAN',
  description: 'Manage your profile, shipping addresses, order histories, and digital deliverables.',
  alternates: {
    canonical: '/account',
  },
};

export default function AccountPage() {
  return <AccountView />;
}
