import { Metadata } from 'next';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

export const metadata: Metadata = {
  title: 'Orders Directory | SHATTAAN Admin',
  robots: { index: false, follow: false },
};

export default function AdminOrdersPage() {
  return <AdminDashboard initialTab="orders" />;
}
