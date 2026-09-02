import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getOrderById } from '@/lib/data/products';
import { OrderSuccessView } from '@/components/views/OrderSuccessView';
import { Suspense } from 'react';

interface OrderDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: OrderDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    return {
      title: 'Order Not Found | SHATTAAN',
    };
  }

  return {
    title: `Order ${order.orderNumber} Receipt | SHATTAAN`,
    description: `Official receipt and tracking details for order ${order.orderNumber}.`,
  };
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

  return (
    <Suspense fallback={<div className="py-20 text-center">Loading receipt...</div>}>
      <OrderSuccessView initialOrder={order} />
    </Suspense>
  );
}
