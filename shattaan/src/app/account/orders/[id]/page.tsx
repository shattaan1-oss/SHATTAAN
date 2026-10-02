import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { auth } from '@/../auth';
import { prisma } from '@/lib/prisma';
import { Order } from '@/types';
import { OrderSuccessView } from '@/components/views/OrderSuccessView';

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

async function getCustomerOrder(id: string, customerId: string) {
  return prisma.order.findFirst({
    where: {
      customerId,
      OR: [
        { id },
        { orderNumber: id },
      ],
    },
    include: {
      items: true,
      customer: true,
    },
  });
}

function mapOrder(order: any): Order {
  return {
    id: order.id,
    orderNumber: order.orderNumber,
    date: order.createdAt ?? order.date ?? new Date().toISOString(),
    customer: {
      id: order.customer?.id,
      name: order.customer?.name ?? '',
      email: order.customer?.email ?? '',
      phone: order.customer?.phone ?? '',
      shippingAddress: order.shippingAddress,
      billingAddress: order.billingAddress ?? undefined,
    },
    shippingAddress: order.shippingAddress,
    items: (order.items ?? []).map((item: any) => ({
      productId: item.productId,
      title: item.title,
      price: Number(item.price),
      image: item.image,
      selectedColor: item.selectedColor ?? undefined,
      selectedSize: item.selectedSize ?? undefined,
      quantity: item.quantity,
      isDigital: item.isDigital ?? false,
      downloadUrl: item.downloadUrl ?? undefined,
    })),
    subtotal: Number(order.subtotal),
    discount: Number(order.discount),
    shippingFee: Number(order.shippingFee),
    tax: Number(order.tax),
    total: Number(order.total),
    appliedPromoCode: order.appliedPromoCode ?? undefined,
    paymentMethod: order.paymentMethod,
    paymentStatus: order.paymentStatus,
    fulfillmentStatus: order.fulfillmentStatus,
    trackingNumber: order.trackingNumber ?? undefined,
    trackingCarrier: order.trackingCarier ?? undefined,
    estimatedDeliveryDate: order.estimatedDeliveryDate
      ? String(order.estimatedDeliveryDate).split('T')[0]
      : undefined,
    notes: order.notes ?? undefined,
  };
}

export async function generateMetadata({
  params,
}: OrderDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const session = await auth();
  const customerId = session?.user?.customerId;

  if (!customerId) {
    return { title: 'Order Not Found | SHATTAAN' };
  }

  const order = await getCustomerOrder(id, customerId);

  if (!order) {
    return { title: 'Order Not Found | SHATTAAN' };
  }

  return {
    title: `Order ${order.orderNumber} Receipt | SHATTAAN`,
    description: `Official receipt and tracking details for order ${order.orderNumber}.`,
  };
}

export default async function OrderDetailPage({
  params,
}: OrderDetailPageProps) {
  const { id } = await params;
  const session = await auth();
  const customerId = session?.user?.customerId;

  if (!customerId) {
    notFound();
  }

  const order = await getCustomerOrder(id, customerId);

  if (!order) {
    notFound();
  }

  const mappedOrder = mapOrder(order);

  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center">
          Loading receipt...
        </div>
      }
    >
      <OrderSuccessView initialOrder={mappedOrder} />
    </Suspense>
  );
}
