'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '../../context/StoreContext';
import { Address } from '../../types';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  Lock,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Zap,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    discountAmount,
    taxAmount,
    shippingAmount,
    cartTotal,
    appliedDiscount,
    hasPhysicalItems,
    hasDigitalItems,
    isDigitalOnly,
    formatPrice,
    placeOrder,
    currentUser,
    addToast,
  } = useStore();
  const router = useRouter();

  // Contact State
  const [email, setEmail] = useState(currentUser.email || '');
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [fullName, setFullName] = useState(currentUser.defaultAddress?.fullName || currentUser.name || '');

  // Shipping Address
  const [addressLine1, setAddressLine1] = useState(currentUser.defaultAddress?.addressLine1 || '');
  const [addressLine2, setAddressLine2] = useState(currentUser.defaultAddress?.addressLine2 || '');
  const [city, setCity] = useState(currentUser.defaultAddress?.city || 'New York');
  const [state, setState] = useState(currentUser.defaultAddress?.state || 'NY');
  const [postalCode, setPostalCode] = useState(currentUser.defaultAddress?.postalCode || '10001');
  const [country, setCountry] = useState(currentUser.defaultAddress?.country || 'United States');

  // Shipping & Payment Method
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express' | 'overnight'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'credit-card' | 'apple-pay' | 'paypal'>('credit-card');

  // Card details simulation
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [orderNotes, setOrderNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const autofillDemoAddress = () => {
    setFullName('Marcus Sterling');
    setEmail('shattaan.1@gmail.com');
    setPhone('+1 (555) 234-8900');
    setAddressLine1('742 Evergreen Promenade, Penthouse 4B');
    setAddressLine2('Skyline Tower');
    setCity('New York');
    setState('NY');
    setPostalCode('10001');
    setCountry('United States');
    addToast('info', 'Address Filled', 'Sample luxury shipping profile loaded.');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (isProcessing) return;

    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      addToast('error', 'Incomplete Details', 'Please complete your contact information.');
      return;
    }

    if (hasPhysicalItems && (!addressLine1.trim() || !city.trim() || !postalCode.trim())) {
      addToast('error', 'Incomplete Address', 'Please complete all required shipping fields.');
      return;
    }

    setIsProcessing(true);

    const shippingAddress: Address = {
      fullName,
      addressLine1: hasPhysicalItems ? addressLine1 : 'Digital Delivery Vault',
      addressLine2: hasPhysicalItems ? addressLine2 : undefined,
      city: hasPhysicalItems ? city : 'Digital',
      state: hasPhysicalItems ? state : 'Online',
      postalCode: hasPhysicalItems ? postalCode : '00000',
      country: hasPhysicalItems ? country : 'Global',
      phone,
    };

    setTimeout(() => {
      const order = placeOrder({
        customer: {
          name: fullName,
          email,
          phone,
          shippingAddress,
        },
        paymentMethod:
          paymentMethod === 'credit-card'
            ? 'Visa (•••• 4242)'
            : paymentMethod === 'apple-pay'
            ? 'Apple Pay'
            : 'PayPal Express',
        notes: orderNotes,
      });

      setIsProcessing(false);

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#1C1917', '#E5E7EB'],
        });
      } catch (err) {
        console.error(err);
      }

      router.push(`/order-success?id=${order.orderNumber}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center space-y-4">
        <h2 className="text-2xl font-bold text-stone-900">Your bag is empty</h2>
        <p className="text-xs text-stone-500">Add items before proceeding to checkout.</p>
        <Link
          href="/shop"
          className="inline-block px-6 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
        >
          Return to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Checkout Breadcrumb / Header */}
      <div className="border-b border-stone-200 pb-6 flex items-center justify-between">
        <div>
          <Link
            href="/cart"
            className="text-xs font-bold text-stone-500 hover:text-stone-900 flex items-center gap-1.5 mb-1.5"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Bag
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-950">
            Secure Checkout
          </h1>
        </div>

        {hasPhysicalItems && (
          <button
            type="button"
            onClick={autofillDemoAddress}
            className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold rounded-xl border border-amber-300 flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Zap className="w-3.5 h-3.5" />
            Autofill Test Address
          </button>
        )}
      </div>

      {/* Mixed Delivery Informational Clarity Section */}
      {hasPhysicalItems && hasDigitalItems && (
        <div className="bg-stone-50 border border-stone-200 rounded-3xl p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-stone-900">
              Mixed Fulfillment Protocol
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
              <p className="font-bold text-stone-900 flex items-center gap-1.5 text-xs">
                <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                Digital Delivery
              </p>
              <p className="text-[11px] leading-relaxed text-stone-600">
                Digital products will be delivered electronically after successful payment confirmation.
              </p>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
              <p className="font-bold text-stone-900 flex items-center gap-1.5 text-xs">
                <span className="w-2 h-2 rounded-full bg-stone-900 inline-block" />
                Physical Delivery
              </p>
              <p className="text-[11px] leading-relaxed text-stone-600">
                Physical products will ship separately using the selected courier service and tracking information.
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Input Sections (7 Cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* 1. Contact Information */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-stone-950 text-white text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h2 className="text-base font-bold text-stone-950">Contact Information</h2>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label htmlFor="contact-fullname" className="block font-bold text-stone-800 mb-1">
                  Full Name *
                </label>
                <input
                  id="contact-fullname"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Marcus Sterling"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-email" className="block font-bold text-stone-800 mb-1">
                    Email for Receipt & Deliverables *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div>
                  <label htmlFor="contact-phone" className="block font-bold text-stone-800 mb-1">
                    Phone Number *
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 2. Physical Shipping Destination OR Digital Deliverables Notice */}
          {hasPhysicalItems ? (
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-stone-950 text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h2 className="text-base font-bold text-stone-950">Shipping Destination</h2>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label htmlFor="shipping-address1" className="block font-bold text-stone-800 mb-1">
                    Street Address *
                  </label>
                  <input
                    id="shipping-address1"
                    type="text"
                    required={hasPhysicalItems}
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                    placeholder="742 Evergreen Promenade"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div>
                  <label htmlFor="shipping-address2" className="block font-bold text-stone-800 mb-1">
                    Apartment, Suite, Unit (Optional)
                  </label>
                  <input
                    id="shipping-address2"
                    type="text"
                    value={addressLine2}
                    onChange={(e) => setAddressLine2(e.target.value)}
                    placeholder="Penthouse 4B"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="shipping-city" className="block font-bold text-stone-800 mb-1">
                      City *
                    </label>
                    <input
                      id="shipping-city"
                      type="text"
                      required={hasPhysicalItems}
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900"
                    />
                  </div>

                  <div>
                    <label htmlFor="shipping-state" className="block font-bold text-stone-800 mb-1">
                      State / Prov *
                    </label>
                    <input
                      id="shipping-state"
                      type="text"
                      required={hasPhysicalItems}
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900"
                    />
                  </div>

                  <div>
                    <label htmlFor="shipping-postal" className="block font-bold text-stone-800 mb-1">
                      Postal Code *
                    </label>
                    <input
                      id="shipping-postal"
                      type="text"
                      required={hasPhysicalItems}
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900"
                    />
                  </div>

                  <div>
                    <label htmlFor="shipping-country" className="block font-bold text-stone-800 mb-1">
                      Country *
                    </label>
                    <select
                      id="shipping-country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-2.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900 text-xs"
                    >
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="France">France</option>
                      <option value="Germany">Germany</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                      <option value="Canada">Canada</option>
                      <option value="Japan">Japan</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-stone-950 text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h2 className="text-base font-bold text-stone-950">Electronic Delivery Destination</h2>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs">
                  <p className="font-bold text-stone-900">Digital Deliverables Delivery</p>
                  <p className="text-stone-600 text-[11px] leading-relaxed">
                    Digital products will be delivered electronically to <strong className="text-stone-950">{email || 'your email'}</strong> and will be available after payment confirmation.
                  </p>
                  <p className="text-emerald-800 font-bold text-[11px] pt-1">
                    Digital Delivery • $0.00 (Complimentary)
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 3. Delivery Method (Physical items only) */}
          {hasPhysicalItems && (
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-stone-950 text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h2 className="text-base font-bold text-stone-950">Courier Logistics</h2>
              </div>

              <fieldset className="space-y-3">
                <legend className="sr-only">Shipping Method</legend>
                <label
                  htmlFor="shipping-method-standard"
                  className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                    shippingMethod === 'standard'
                      ? 'border-stone-950 bg-stone-50'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      id="shipping-method-standard"
                      name="shippingMethod"
                      value="standard"
                      checked={shippingMethod === 'standard'}
                      onChange={() => setShippingMethod('standard')}
                      className="w-4 h-4 text-stone-950 focus:ring-stone-950 border-stone-300"
                    />
                    <Truck className="w-5 h-5 text-stone-900" />
                    <div>
                      <p className="text-xs font-bold text-stone-950">SHATTAAN Insured Express</p>
                      <p className="text-[11px] text-stone-500">2-3 Business Days • Full Signature Required</p>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-stone-950">
                    {shippingAmount === 0 ? 'FREE' : formatPrice(shippingAmount)}
                  </span>
                </label>
              </fieldset>
            </div>
          )}

          {/* 4. Payment Method */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-stone-950 text-white text-xs font-bold flex items-center justify-center">
                  {hasPhysicalItems ? '4' : '3'}
                </span>
                <h2 className="text-base font-bold text-stone-950">Payment Authorization</h2>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-stone-500">
                <Lock className="w-3.5 h-3.5 text-stone-700" />
                <span>Encrypted on shattaan.com</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('credit-card')}
                className={`py-3 px-2 rounded-2xl border-2 text-center transition-all ${
                  paymentMethod === 'credit-card'
                    ? 'border-stone-950 bg-stone-900 text-white shadow-sm'
                    : 'border-stone-200 hover:border-stone-400 text-stone-700'
                }`}
              >
                <CreditCard className="w-5 h-5 mx-auto mb-1" />
                <span className="text-[11px] font-bold block">Credit / Debit</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('apple-pay')}
                className={`py-3 px-2 rounded-2xl border-2 text-center transition-all ${
                  paymentMethod === 'apple-pay'
                    ? 'border-stone-950 bg-stone-900 text-white shadow-sm'
                    : 'border-stone-200 hover:border-stone-400 text-stone-700'
                }`}
              >
                <div className="text-sm font-extrabold mb-1"> Pay</div>
                <span className="text-[11px] font-bold block">Apple Pay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('paypal')}
                className={`py-3 px-2 rounded-2xl border-2 text-center transition-all ${
                  paymentMethod === 'paypal'
                    ? 'border-stone-950 bg-stone-900 text-white shadow-sm'
                    : 'border-stone-200 hover:border-stone-400 text-stone-700'
                }`}
              >
                <div className="text-sm font-extrabold text-amber-500 mb-1">PayPal</div>
                <span className="text-[11px] font-bold block">PayPal</span>
              </button>
            </div>

            {/* Simulated Credit Card form */}
            {paymentMethod === 'credit-card' && (
              <div className="space-y-3 pt-2 text-xs">
                <div>
                  <label htmlFor="card-number" className="block font-bold text-stone-800 mb-1">
                    Card Number
                  </label>
                  <input
                    id="card-number"
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4242 •••• •••• 4242"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl font-mono focus:outline-none focus:border-stone-900"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="card-expiry" className="block font-bold text-stone-800 mb-1">
                      Expires (MM/YY)
                    </label>
                    <input
                      id="card-expiry"
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="12/28"
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl font-mono focus:outline-none focus:border-stone-900"
                    />
                  </div>
                  <div>
                    <label htmlFor="card-cvc" className="block font-bold text-stone-800 mb-1">
                      Security CVC
                    </label>
                    <input
                      id="card-cvc"
                      type="text"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      placeholder="888"
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl font-mono focus:outline-none focus:border-stone-900"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Order Notes */}
            <div className="pt-2">
              <label htmlFor="order-notes" className="block text-xs font-bold text-stone-800 mb-1">
                Delivery Instructions / Concierge Notes (Optional)
              </label>
              <textarea
                id="order-notes"
                rows={2}
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                placeholder="e.g. Leave with residential concierge, call upon dispatch..."
                className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Order Review & Submit (5 Cols) */}
        <div className="lg:col-span-5 bg-stone-50 rounded-3xl p-6 sm:p-8 border border-stone-200 space-y-6 sticky top-28">
          <h3 className="text-lg font-bold text-stone-950">Review Your Bag</h3>

          {/* Items Preview */}
          <div className="divide-y divide-stone-200 max-h-60 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.id} className="py-3 flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-12 h-12 rounded-xl object-cover bg-white border border-stone-200 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-stone-900 truncate">{item.title}</p>
                  <p className="text-[11px] text-stone-500">
                    Qty: {item.quantity} {item.selectedColor ? `• ${item.selectedColor}` : ''}
                  </p>
                </div>
                <span className="text-xs font-extrabold text-stone-950">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing breakdown */}
          <div className="space-y-2 text-xs text-stone-600 pt-4 border-t border-stone-200">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-stone-900">{formatPrice(cartSubtotal)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Voucher ({appliedDiscount?.code})</span>
                <span>-{formatPrice(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>{hasPhysicalItems ? 'Shipping & Insurance' : 'Digital Delivery'}</span>
              <span>
                {hasPhysicalItems ? (
                  shippingAmount === 0 ? 'FREE' : formatPrice(shippingAmount)
                ) : (
                  <span className="text-emerald-700 font-semibold">$0.00</span>
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Calculated Tax</span>
              <span>{formatPrice(taxAmount)}</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-stone-200 text-base font-extrabold text-stone-950">
              <span>Total Due</span>
              <span className="text-xl">{formatPrice(cartTotal)}</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isProcessing}
            aria-busy={isProcessing ? 'true' : 'false'}
            className="w-full py-4 bg-stone-950 hover:bg-stone-800 disabled:bg-stone-600 disabled:cursor-not-allowed text-white rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Authorizing Transaction...
              </span>
            ) : (
              <>
                <span>Complete Purchase ({formatPrice(cartTotal)})</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="text-center text-[11px] text-stone-400">
            By placing this order you agree to the Terms of Service & Privacy Policy of shattaan.com.
          </p>
        </div>
      </form>
    </div>
  );
};
