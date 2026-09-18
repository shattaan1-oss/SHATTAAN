'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '../../context/StoreContext';
import {
  CheckCircle2,
  Package,
  Truck,
  Download,
  ArrowRight,
  Printer,
  Sparkles,
  ShieldCheck,
  Calendar,
  AlertCircle,
} from 'lucide-react';

import { useSearchParams } from 'next/navigation';
import { Order } from '../../types';

interface OrderSuccessViewProps {
  initialOrder?: Order;
}

export const OrderSuccessView: React.FC<OrderSuccessViewProps> = ({ initialOrder }) => {
  const { recentOrder, orders, formatPrice } = useStore();
  const searchParams = useSearchParams();

  const queryOrderId = searchParams ? searchParams.get('id') || searchParams.get('orderId') : null;

  let resolvedOrder: Order | null = initialOrder || null;
  if (!resolvedOrder && queryOrderId) {
    resolvedOrder =
      orders.find((o) => o.id === queryOrderId || o.orderNumber === queryOrderId) || null;
  } else if (!resolvedOrder && recentOrder) {
    resolvedOrder = recentOrder;
  }

  const order = resolvedOrder;

  if (!order) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center space-y-5">
        <div className="w-14 h-14 rounded-2xl bg-stone-100 text-stone-600 flex items-center justify-center mx-auto border border-stone-200">
          <AlertCircle className="w-7 h-7 text-stone-500" />
        </div>
        <div className="space-y-1.5">
          <h2 className="text-xl font-bold text-stone-900">No Order Found</h2>
          <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
            {queryOrderId
              ? `We could not locate an order matching identifier "${queryOrderId}". It may have expired or was placed in another browser session.`
              : 'No active order receipt was specified or found for this session.'}
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            href="/shop"
            className="px-6 py-2.5 bg-stone-950 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-stone-800 transition-colors inline-block"
          >
            Browse Catalog
          </Link>
          <Link
            href="/account"
            className="px-6 py-2.5 bg-stone-100 text-stone-800 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-stone-200 transition-colors border border-stone-300 inline-block"
          >
            My Account
          </Link>
        </div>
      </div>
    );
  }

  const hasPhysical = order.items.some((i) => !i.isDigital);
  const hasDigital = order.items.some((i) => i.isDigital);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Top Banner Celebration */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">
  {order.paymentStatus === 'paid' ? 'Payment Confirmed' : 'Payment Pending'}
</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-950">
          Thank you for choosing SHATTAAN
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
          Your order has been recorded into our vault queue. A serialized dispatch receipt has been sent to <strong>{order.customer.email}</strong>.
        </p>
      </div>

      {/* Order Tracking Progress Card */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400">
              Order Reference
            </span>
            <h3 className="text-lg font-mono font-bold text-white mt-0.5">
              {order.orderNumber}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-amber-400 text-stone-950">
              {order.fulfillmentStatus}
            </span>
          </div>
        </div>

        {/* Milestone Timeline */}
        {hasPhysical ? (
          <div className="grid grid-cols-4 gap-2 pt-2 text-center text-xs">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-amber-400 text-stone-950 font-bold flex items-center justify-center mx-auto shadow-md">
                ✓
              </div>
              <span className="font-bold text-white block">Confirmed</span>
              <span className="text-[10px] text-stone-400">Payment Verified</span>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-amber-400 text-stone-950 font-bold flex items-center justify-center mx-auto shadow-md">
                2
              </div>
              <span className="font-bold text-white block">Vault Inspection</span>
              <span className="text-[10px] text-stone-400">Artisan QC</span>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-stone-800 text-stone-400 font-bold flex items-center justify-center mx-auto border border-stone-700">
                3
              </div>
              <span className="font-semibold text-stone-400 block">In Transit</span>
              <span className="text-[10px] text-stone-500">DHL Express</span>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-stone-800 text-stone-400 font-bold flex items-center justify-center mx-auto border border-stone-700">
                4
              </div>
              <span className="font-semibold text-stone-400 block">Delivered</span>
              <span className="text-[10px] text-stone-500">Signature req.</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 pt-2 text-center text-xs">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-amber-400 text-stone-950 font-bold flex items-center justify-center mx-auto shadow-md">
                ✓
              </div>
              <span className="font-bold text-white block">Paid</span>
              <span className="text-[10px] text-stone-400">Authorization 100%</span>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-amber-400 text-stone-950 font-bold flex items-center justify-center mx-auto shadow-md">
                ✓
              </div>
              <span className="font-bold text-white block">License Key</span>
              <span className="text-[10px] text-stone-400">Serialized & Signed</span>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-amber-400 text-stone-950 font-bold flex items-center justify-center mx-auto shadow-md">
                ✓
              </div>
              <span className="font-bold text-white block">Vault Package</span>
              <span className="text-[10px] text-stone-400">Archive Unlocked</span>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-amber-400 text-stone-950 font-bold flex items-center justify-center mx-auto shadow-md">
                ✓
              </div>
              <span className="font-bold text-white block">Delivered</span>
              <span className="text-[10px] text-stone-400">Electronic Access</span>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-2">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-amber-400" />
            <span>
              Tracking / Dispatch Ref:{' '}
              <strong className="text-white font-mono">
                {order.trackingNumber || `SHT-${order.orderNumber}`}
              </strong>{' '}
              ({hasPhysical ? (order.trackingCarrier || 'SHATTAAN Concierge Air') : 'Instant Electronic Transfer'})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>
              Est. Fulfillment:{' '}
              <strong className="text-white">
                {hasPhysical ? (order.estimatedDeliveryDate || '3-5 Business Days') : 'Immediate Electronic Access'}
              </strong>
            </span>
          </div>
        </div>
      </div>

      {/* Itemized Receipt Details */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6 print-receipt-container">
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <h3 className="text-base font-bold text-stone-950">Receipt Summary</h3>
          <button
            onClick={handlePrint}
            className="no-print px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            Print Receipt
          </button>
        </div>

        {/* Items List */}
        <div className="divide-y divide-stone-100">
          {order.items.map((item, idx) => (
            <div key={idx} className="py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-14 h-14 rounded-xl object-cover bg-stone-100 border border-stone-200 shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900">{item.title}</h4>
                    {item.isDigital && (
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-900 rounded text-[10px] font-extrabold uppercase">
                        Digital
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-stone-500">
                    Qty: {item.quantity} {item.selectedColor ? `• ${item.selectedColor}` : ''} {item.selectedSize ? `• ${item.selectedSize}` : ''}
                  </p>
                </div>
              </div>
              <span className="text-xs sm:text-sm font-extrabold text-stone-950">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        {/* Pricing Summary */}
        <div className="pt-4 border-t border-stone-200 space-y-2 text-xs text-stone-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-semibold text-stone-900">{formatPrice(order.subtotal)}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-emerald-700 font-semibold">
              <span>Promo Discount ({order.appliedPromoCode})</span>
              <span>-{formatPrice(order.discount)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>{hasPhysical ? 'Courier Logistics' : 'Digital Electronic Delivery'}</span>
            <span>{order.shippingFee === 0 ? 'FREE' : formatPrice(order.shippingFee)}</span>
          </div>
          <div className="flex justify-between">
            <span>Sales Tax</span>
            <span>{formatPrice(order.tax)}</span>
          </div>
          <div className="flex justify-between pt-3 border-t border-stone-200 text-base font-extrabold text-stone-950">
            <span>Total Paid</span>
            <span className="text-lg">{formatPrice(order.total)}</span>
          </div>
        </div>

        {/* Shipping & Payment Meta */}
        <div className="pt-4 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-600 bg-stone-50 p-4 rounded-2xl">
          <div>
            <span className="font-bold text-stone-900 uppercase tracking-wider block mb-1">
              {hasPhysical ? 'Delivery Address:' : 'Delivery Destination:'}
            </span>
            <p className="font-semibold text-stone-800">{order.customer.shippingAddress.fullName}</p>
            {hasPhysical ? (
              <>
                <p>{order.customer.shippingAddress.addressLine1}</p>
                {order.customer.shippingAddress.addressLine2 && <p>{order.customer.shippingAddress.addressLine2}</p>}
                <p>
                  {order.customer.shippingAddress.city}, {order.customer.shippingAddress.state} {order.customer.shippingAddress.postalCode}
                </p>
                <p>{order.customer.shippingAddress.country}</p>
              </>
            ) : (
              <p className="text-stone-700 font-medium">
                Electronic deliverable sent to {order.customer.email}
              </p>
            )}
          </div>

          <div>
            <span className="font-bold text-stone-900 uppercase tracking-wider block mb-1">
              Payment Method:
            </span>
            <p className="font-semibold text-stone-800">{order.paymentMethod}</p>
            <span className="inline-block mt-2 px-2 py-0.5 bg-emerald-100 text-emerald-900 rounded text-[10px] font-bold uppercase">
              Paid in Full
            </span>
          </div>
        </div>
      </div>

      {/* Next Actions */}
      <div className="no-print flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/shop"
          className="w-full sm:w-auto px-8 py-3.5 bg-stone-950 hover:bg-stone-800 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Continue Exploring</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <Link
          href="/account"
          className="w-full sm:w-auto px-6 py-3.5 bg-stone-100 hover:bg-stone-200 text-stone-900 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer text-center"
        >
          View in Customer Account
        </Link>
      </div>
    </div>
  );
};
