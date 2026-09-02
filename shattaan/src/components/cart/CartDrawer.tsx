'use client';

import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  X,
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Tag,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    freeShippingThreshold,
    hasPhysicalItems,
    appliedDiscount,
    applyDiscountCode,
    removeDiscountCode,
    discountAmount,
    shippingAmount,
    cartTotal,
    formatPrice,
    setCurrentView,
    navigateToProduct,
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ isError: boolean; text: string } | null>(
    null
  );

  // Escape key listener for CartDrawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartDrawerOpen) {
        setIsCartDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartDrawerOpen, setIsCartDrawerOpen]);

  const amountUntilFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const progressPercent = !hasPhysicalItems && cart.length > 0 
    ? 100 
    : Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyDiscountCode(promoInput);
    if (res.success) {
      setPromoFeedback({ isError: false, text: res.message });
      setPromoInput('');
    } else {
      setPromoFeedback({ isError: true, text: res.message });
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartDrawerOpen(false);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewFullCart = () => {
    setIsCartDrawerOpen(false);
    setCurrentView('cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isCartDrawerOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartDrawerOpen(false)}
          className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-stone-200"
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-stone-900" />
                <h2 id="cart-drawer-title" className="text-base font-bold text-stone-900 tracking-wide">
                  Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
                </h2>
              </div>
              <button
                id="close-cart-drawer"
                onClick={() => setIsCartDrawerOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-stone-200/80 transition-colors"
                aria-label="Close shopping bag"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Meter */}
            <div className="bg-stone-900 text-stone-100 p-4 border-b border-stone-800">
              <div className="flex items-center justify-between text-xs mb-1.5">
                {!hasPhysicalItems && cart.length > 0 ? (
                  <span className="font-semibold text-emerald-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Complimentary Electronic Delivery
                  </span>
                ) : amountUntilFreeShipping === 0 ? (
                  <span className="font-semibold text-emerald-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Complimentary Global Courier unlocked!
                  </span>
                ) : (
                  <span className="text-stone-300">
                    Add <strong className="text-white">{formatPrice(amountUntilFreeShipping)}</strong> more for free express shipping
                  </span>
                )}
                <span className="font-bold text-stone-400">{progressPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-stone-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 divide-y divide-stone-100">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500">
                  <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mb-4">
                    <ShoppingBag className="w-8 h-8 text-stone-400" />
                  </div>
                  <h3 className="text-base font-bold text-stone-900">Your bag is empty</h3>
                  <p className="text-xs text-stone-500 max-w-xs mt-1 leading-relaxed">
                    Explore our curated collection of luxury apparel, fine leather, and artisanal pieces.
                  </p>
                  <button
                    onClick={() => {
                      setIsCartDrawerOpen(false);
                      setCurrentView('catalog');
                    }}
                    className="mt-5 px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
                  >
                    Explore Catalog
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="py-4 flex gap-4 items-start first:pt-0">
                    {/* Item Image */}
                    <div
                      onClick={() => {
                        setIsCartDrawerOpen(false);
                        navigateToProduct(item.productId);
                      }}
                      className="w-20 h-20 rounded-xl overflow-hidden bg-stone-100 shrink-0 cursor-pointer border border-stone-200/80"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <h4
                        onClick={() => {
                          setIsCartDrawerOpen(false);
                          navigateToProduct(item.productId);
                        }}
                        className="text-sm font-bold text-stone-900 hover:text-stone-600 line-clamp-1 cursor-pointer"
                      >
                        {item.title}
                      </h4>

                      <div className="flex flex-wrap gap-2 text-[11px] text-stone-500 mt-0.5">
                        {item.selectedColor && (
                          <span className="bg-stone-100 px-2 py-0.5 rounded text-stone-700">
                            {item.selectedColor}
                          </span>
                        )}
                        {item.selectedSize && (
                          <span className="bg-stone-100 px-2 py-0.5 rounded text-stone-700">
                            {item.selectedSize}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity controls */}
                        <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center text-xs font-bold text-stone-600 hover:bg-stone-200 transition-colors"
                          >
                            -
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-stone-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.maxStock}
                            className="w-6 h-6 flex items-center justify-center text-xs font-bold text-stone-600 hover:bg-stone-200 disabled:opacity-30 transition-colors"
                          >
                            +
                          </button>
                        </div>

                        {/* Price & Delete */}
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-stone-900">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-stone-400 hover:text-red-600 p-1 transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-stone-200 bg-stone-50/80">
                {/* Promo Code Form */}
                <div className="mb-4">
                  {appliedDiscount ? (
                    <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-emerald-600" />
                        <span className="font-bold text-emerald-900">{appliedDiscount.code}</span>
                        <span className="text-emerald-700">(-{formatPrice(discountAmount)})</span>
                      </div>
                      <button
                        onClick={removeDiscountCode}
                        className="text-stone-400 hover:text-stone-700 font-semibold text-[11px]"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyPromo} className="flex gap-2">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="Promo code (e.g. WELCOME10)"
                        className="flex-1 px-3 py-2 text-xs bg-white border border-stone-300 rounded-xl uppercase tracking-wider focus:outline-none focus:border-stone-900"
                      />
                      <button
                        type="submit"
                        className="px-3.5 py-2 bg-stone-800 hover:bg-stone-900 text-white text-xs font-bold rounded-xl transition-colors"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                  {promoFeedback && (
                    <p
                      className={`text-[11px] mt-1.5 ${
                        promoFeedback.isError ? 'text-red-600' : 'text-emerald-600'
                      }`}
                    >
                      {promoFeedback.text}
                    </p>
                  )}
                </div>

                {/* Subtotal & Breakdown */}
                <div className="space-y-1.5 text-xs text-stone-600 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-stone-900">{formatPrice(cartSubtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Discount</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>{hasPhysicalItems ? 'Estimated Shipping' : 'Digital Delivery'}</span>
                    <span>{hasPhysicalItems ? (shippingAmount === 0 ? 'FREE' : formatPrice(shippingAmount)) : 'FREE'}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-stone-200 text-sm font-bold text-stone-900">
                    <span>Estimated Total</span>
                    <span className="text-base font-extrabold">{formatPrice(cartTotal)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <button
                    id="cart-drawer-checkout-btn"
                    onClick={handleProceedToCheckout}
                    className="w-full py-3.5 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    Proceed to Checkout <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    id="cart-drawer-view-bag"
                    onClick={handleViewFullCart}
                    className="w-full py-2.5 px-4 bg-transparent hover:bg-stone-200/60 text-stone-800 rounded-xl text-xs font-bold transition-colors text-center"
                  >
                    View & Edit Full Bag
                  </button>
                </div>

                <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-stone-600">
                  <ShieldCheck className="w-3.5 h-3.5 text-stone-700" />
                  <span>Encrypted 256-Bit SSL Checkout on shattaan.com</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
