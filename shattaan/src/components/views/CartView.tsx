'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '../../context/StoreContext';
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Tag,
  ArrowLeft,
  Truck,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

export const CartView: React.FC = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    freeShippingThreshold,
    hasPhysicalItems,
    appliedDiscount,
    applyDiscountCode,
    removeDiscountCode,
    discountAmount,
    shippingAmount,
    taxAmount,
    cartTotal,
    formatPrice,
    products,
  } = useStore();

  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ isError: boolean; text: string } | null>(null);

  const amountUntilFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCodeInput.trim()) return;
    const res = applyDiscountCode(promoCodeInput);
    if (res.success) {
      setPromoFeedback({ isError: false, text: res.message });
      setPromoCodeInput('');
    } else {
      setPromoFeedback({ isError: true, text: res.message });
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-stone-950">Your Shopping Bag is Empty</h1>
        <p className="text-sm text-stone-500 max-w-md mx-auto leading-relaxed">
          You have not added any pieces to your bag yet. Explore our curated selection of luxury goods and bespoke fashion.
        </p>
        <Link
          href="/shop"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-8 py-3.5 bg-stone-950 hover:bg-stone-800 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-colors inline-flex items-center gap-2"
        >
          <span>Explore Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-6">
        <div>
          <Link
            href="/shop"
            className="text-xs font-bold text-stone-500 hover:text-stone-900 flex items-center gap-1.5 mb-2"
          >
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
          <h1 className="text-3xl font-extrabold text-stone-950">
            Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
          </h1>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-stone-400 hover:text-red-600 font-semibold transition-colors"
        >
          Clear Bag
        </button>
      </div>

      {/* Free Shipping Alert Banner */}
      {!hasPhysicalItems ? (
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-stone-700 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong className="text-stone-950">Complimentary Electronic Delivery:</strong> All digital deliverables in your bag receive $0.00 complimentary shipping.
          </span>
        </div>
      ) : amountUntilFreeShipping > 0 ? (
        <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200 text-xs text-stone-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-stone-900" />
            <span>
              Add <strong className="text-stone-950">{formatPrice(amountUntilFreeShipping)}</strong> more to unlock complimentary global express shipping.
            </span>
          </div>
          <Link
            href="/shop"
            className="font-bold text-stone-950 hover:underline"
          >
            Browse More →
          </Link>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 font-bold">
          <Truck className="w-4 h-4 text-emerald-600" />
          <span>Complimentary insured courier delivery applied to your order!</span>
        </div>
      )}

      {/* Main Grid: Items + Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Cart Items Table/List (8 Cols) */}
        <div className="lg:col-span-8 divide-y divide-stone-200 border-y border-stone-200">
          {cart.map((item) => (
            <div key={item.id} className="py-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Product Thumbnail */}
              <Link
                href={`/products/${products.find((p) => p.id === item.productId)?.slug || item.productId}`}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-stone-100 overflow-hidden shrink-0 cursor-pointer border border-stone-200 block"
              >
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </Link>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <Link
                  href={`/products/${products.find((p) => p.id === item.productId)?.slug || item.productId}`}
                  className="text-base font-bold text-stone-950 hover:text-stone-600 cursor-pointer block"
                >
                  {item.title}
                </Link>

                <div className="flex flex-wrap gap-2 text-xs text-stone-500 mt-1">
                  {item.selectedColor && (
                    <span className="bg-stone-100 px-2 py-0.5 rounded text-stone-700">
                      Color: {item.selectedColor}
                    </span>
                  )}
                  {item.selectedSize && (
                    <span className="bg-stone-100 px-2 py-0.5 rounded text-stone-700">
                      Size: {item.selectedSize}
                    </span>
                  )}
                </div>

                <div className="text-sm font-bold text-stone-900 mt-2 sm:hidden">
                  {formatPrice(item.price)}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50 p-1">
                <button
                  onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-stone-700 hover:bg-white transition-colors"
                >
                  -
                </button>
                <span className="w-8 text-center font-bold text-xs text-stone-900">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                  disabled={item.quantity >= item.maxStock}
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-stone-700 hover:bg-white disabled:opacity-30 transition-colors"
                >
                  +
                </button>
              </div>

              {/* Total for Item */}
              <div className="text-right shrink-0">
                <div className="text-base font-extrabold text-stone-950">
                  {formatPrice(item.price * item.quantity)}
                </div>
                <div className="text-[11px] text-stone-400">
                  ({formatPrice(item.price)} each)
                </div>
              </div>

              {/* Remove button */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-stone-400 hover:text-red-600 p-2 rounded-lg transition-colors"
                title="Remove item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary Column (4 Cols) */}
        <div className="lg:col-span-4 bg-stone-50 rounded-3xl p-6 sm:p-8 border border-stone-200 space-y-6">
          <h2 className="text-lg font-bold text-stone-950">Order Summary</h2>

          {/* Promo Code Form */}
          <div>
            {appliedDiscount ? (
              <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-emerald-900">{appliedDiscount.code}</span>
                  <span className="text-emerald-700">(-{formatPrice(discountAmount)})</span>
                </div>
                <button
                  onClick={removeDiscountCode}
                  className="text-stone-500 hover:text-stone-900 font-semibold"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                  Promotional Voucher
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                    placeholder="Enter code (e.g. WELCOME10)"
                    className="flex-1 px-3.5 py-2.5 text-xs bg-white border border-stone-300 rounded-xl uppercase tracking-wider focus:outline-none focus:border-stone-900"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition-colors shrink-0"
                  >
                    Apply
                  </button>
                </div>
                {promoFeedback && (
                  <p
                    className={`text-xs ${
                      promoFeedback.isError ? 'text-red-600' : 'text-emerald-600'
                    }`}
                  >
                    {promoFeedback.text}
                  </p>
                )}
              </form>
            )}
          </div>

          {/* Cost Line Items */}
          <div className="space-y-2.5 text-xs text-stone-600 pt-4 border-t border-stone-200">
            <div className="flex justify-between">
              <span>Bag Subtotal</span>
              <span className="font-semibold text-stone-900">{formatPrice(cartSubtotal)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Promotional Discount</span>
                <span>-{formatPrice(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>{hasPhysicalItems ? 'Estimated Express Delivery' : 'Digital Delivery'}</span>
              <span>{hasPhysicalItems ? (shippingAmount === 0 ? 'FREE' : formatPrice(shippingAmount)) : 'FREE'}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Sales Tax</span>
              <span>{formatPrice(taxAmount)}</span>
            </div>
            <div className="flex justify-between pt-4 border-t border-stone-200 text-base font-extrabold text-stone-950">
              <span>Grand Total</span>
              <span className="text-xl">{formatPrice(cartTotal)}</span>
            </div>
          </div>

          {/* Checkout CTA */}
          <Link
            href="/checkout"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full py-4 bg-stone-950 hover:bg-stone-800 text-white rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2"
          >
            <span>Proceed to Secure Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="space-y-2 pt-2 text-[11px] text-stone-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-stone-700" />
              <span>256-Bit SSL Encrypted Transaction</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-3.5 h-3.5 text-stone-700" />
              <span>30-Day Bespoke Global Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
