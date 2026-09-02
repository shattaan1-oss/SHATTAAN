import { Metadata } from 'next';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

interface AdminOrderDetailProps {
  params: Promise<{
    id: string;
  }>;
}

export const metadata: Metadata = {
  title: 'Order Detail | SHATTAAN Admin',
  robots: { index: false, follow: false },
};

export default async function AdminOrderDetailPage({ params }: AdminOrderDetailProps) {
  const { id } = await params;
  return <AdminDashboard initialTab="orders" selectedOrderId={id} />;
}
