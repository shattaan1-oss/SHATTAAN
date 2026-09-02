import { Metadata } from 'next';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

export const metadata: Metadata = {
  title: 'Customers Directory | SHATTAAN Admin',
  robots: { index: false, follow: false },
};

export default function AdminCustomersPage() {
  return <AdminDashboard initialTab="customers" />;
}
