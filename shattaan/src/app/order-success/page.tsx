import { Metadata } from 'next';
import { Suspense } from 'react';
import { OrderSuccessView } from '@/components/views/OrderSuccessView';

export const metadata: Metadata = {
  title: 'Order Confirmation & Receipt | SHATTAAN',
  description: 'Official transaction receipt, fulfillment summary, and digital deliverable access for your SHATTAAN order.',
};

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <div className="w-8 h-8 border-2 border-stone-900 border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    }>
      <OrderSuccessView />
    </Suspense>
  );
}
