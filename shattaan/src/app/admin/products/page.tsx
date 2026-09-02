import { Metadata } from 'next';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

export const metadata: Metadata = {
  title: 'Products Management | SHATTAAN Admin',
  robots: { index: false, follow: false },
};

export default function AdminProductsPage() {
  return <AdminDashboard initialTab="products" />;
}
