import { Metadata } from 'next';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

interface AdminEditProductProps {
  params: Promise<{
    id: string;
  }>;
}

export const metadata: Metadata = {
  title: 'Edit Product | SHATTAAN Admin',
  robots: { index: false, follow: false },
};

export default async function AdminEditProductPage({ params }: AdminEditProductProps) {
  const { id } = await params;
  return <AdminDashboard initialTab="products" selectedProductId={id} />;
}
