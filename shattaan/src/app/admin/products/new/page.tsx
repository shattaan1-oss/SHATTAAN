import { Metadata } from 'next';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

export const metadata: Metadata = {
  title: 'Add New Product | SHATTAAN Admin',
  robots: { index: false, follow: false },
};

export default function AdminNewProductPage() {
  return <AdminDashboard initialTab="products" initialAction="new" />;
}
