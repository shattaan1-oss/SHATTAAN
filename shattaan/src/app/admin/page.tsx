import { Metadata } from 'next';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

export const metadata: Metadata = {
  title: 'Admin Portal & Store Management | SHATTAAN',
  description: 'Operations management, catalog curation, order tracking, and store analytics.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminDashboard initialTab="dashboard" />;
}
