'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '../../context/StoreContext';
import { Order, Address } from '../../types';
import {
  User,
  Package,
  Heart,
  MapPin,
  Settings,
  CreditCard,
  Truck,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Edit2,
  Plus,
  ShoppingBag,
  RotateCcw,
  Printer,
  X,
} from 'lucide-react';

interface AccountViewProps {
  initialTab?: 'orders' | 'addresses' | 'profile';
}

export const AccountView: React.FC<AccountViewProps> = ({ initialTab = 'orders' }) => {
  const {
    currentUser,
    orders,
    wishlist,
    products,
    formatPrice,
    addToCart,
    updateCustomerProfile,
    addToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'profile'>(initialTab);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);

  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [nameInput, setNameInput] = useState(currentUser.name);
  const [emailInput, setEmailInput] = useState(currentUser.email);
  const [phoneInput, setPhoneInput] = useState(currentUser.phone);

  // Address Edit State
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressLine1, setAddressLine1] = useState(currentUser.defaultAddress?.addressLine1 || '');
  const [addressLine2, setAddressLine2] = useState(currentUser.defaultAddress?.addressLine2 || '');
  const [city, setCity] = useState(currentUser.defaultAddress?.city || '');
  const [state, setState] = useState(currentUser.defaultAddress?.state || '');
  const [postalCode, setPostalCode] = useState(currentUser.defaultAddress?.postalCode || '');
  const [country, setCountry] = useState(currentUser.defaultAddress?.country || 'United States');

  // Filter orders for this user or all store orders for demo
  const userOrders = orders;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCustomerProfile({
      name: nameInput,
      email: emailInput,
      phone: phoneInput,
    });
    setIsEditingProfile(false);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const newAddress: Address = {
      fullName: nameInput,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      phone: phoneInput,
    };
    updateCustomerProfile({
      defaultAddress: newAddress,
    });
    setIsEditingAddress(false);
  };

  const handleReorder = (order: Order) => {
    order.items.forEach((item) => {
      const prod = products.find((p) => p.id === item.productId);
      if (prod) {
        addToCart(prod, item.quantity, item.selectedColor, item.selectedSize);
      }
    });
    addToast('success', 'Order Items Added', 'Items from your previous order added to bag.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header & User Profile Top Card */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-stone-800">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-amber-400 text-stone-950 font-brand text-2xl font-bold flex items-center justify-center shadow-lg shrink-0">
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-white">{currentUser.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-400 text-stone-950">
                VIP Tier
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-1 font-mono">{currentUser.email}</p>
            <p className="text-[11px] text-stone-500 mt-0.5">
              Patron of SHATTAAN since {currentUser.joinedDate}
            </p>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t md:border-t-0 md:border-l border-stone-800 pt-4 md:pt-0 md:pl-8">
          <div>
            <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Total Orders</span>
            <span className="text-lg font-mono font-bold text-white">{userOrders.length}</span>
          </div>
          <div>
            <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Lifetime Spent</span>
            <span className="text-lg font-mono font-bold text-amber-400">
              {formatPrice(currentUser.totalSpent)}
            </span>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Saved Wishlist</span>
            <span className="text-lg font-mono font-bold text-white">{wishlist.length} Items</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 overflow-x-auto pb-px">
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-extrabold uppercase tracking-wider whitespace-nowrap transition-all ${
            activeTab === 'orders'
              ? 'text-stone-950 border-b-2 border-stone-950'
              : 'text-stone-400 hover:text-stone-700'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Order History ({userOrders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('addresses')}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-extrabold uppercase tracking-wider whitespace-nowrap transition-all ${
            activeTab === 'addresses'
              ? 'text-stone-950 border-b-2 border-stone-950'
              : 'text-stone-400 hover:text-stone-700'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Saved Addresses</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-extrabold uppercase tracking-wider whitespace-nowrap transition-all ${
            activeTab === 'profile'
              ? 'text-stone-950 border-b-2 border-stone-950'
              : 'text-stone-400 hover:text-stone-700'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Account Preferences</span>
        </button>
      </div>

      {/* TAB 1: ORDER HISTORY */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {userOrders.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-4">
              <Package className="w-12 h-12 text-stone-300 mx-auto" />
              <h3 className="text-base font-bold text-stone-900">No orders placed yet</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Once you acquire pieces on shattaan.com, your order tracking, serialized invoices, and shipping milestones will appear here.
              </p>
              <Link
                href="/shop"
                className="inline-block px-6 py-2.5 bg-stone-950 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
              >
                Browse Marketplace
              </Link>
            </div>
          ) : (
            userOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden"
              >
                {/* Order Header */}
                <div className="p-5 sm:p-6 bg-stone-50 border-b border-stone-200 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-4 text-xs">
                    <div>
                      <span className="text-stone-400 uppercase tracking-wider font-semibold block text-[10px]">
                        Order Number
                      </span>
                      <span className="font-mono font-bold text-stone-950">{order.orderNumber}</span>
                    </div>

                    <div className="border-l border-stone-200 pl-4">
                      <span className="text-stone-400 uppercase tracking-wider font-semibold block text-[10px]">
                        Date Placed
                      </span>
                      <span className="font-semibold text-stone-800">
                        {new Date(order.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>

                    <div className="border-l border-stone-200 pl-4">
                      <span className="text-stone-400 uppercase tracking-wider font-semibold block text-[10px]">
                        Total Amount
                      </span>
                      <span className="font-extrabold text-stone-950">{formatPrice(order.total)}</span>
                    </div>
                  </div>

                  {/* Badges & Invoices */}
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                        order.fulfillmentStatus === 'delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : order.fulfillmentStatus === 'shipped'
                          ? 'bg-sky-100 text-sky-800'
                          : order.fulfillmentStatus === 'processing'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-stone-100 text-stone-800'
                      }`}
                    >
                      {order.fulfillmentStatus}
                    </span>

                    <button
                      onClick={() => setSelectedInvoiceOrder(order)}
                      className="px-3 py-1.5 bg-white hover:bg-stone-100 text-stone-700 text-xs font-bold rounded-lg border border-stone-300 transition-colors flex items-center gap-1.5"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      Invoice
                    </button>
                  </div>
                </div>

                {/* Items List */}
                <div className="p-5 sm:p-6 divide-y divide-stone-100">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="py-3.5 flex items-center justify-between gap-4 first:pt-0">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-14 h-14 rounded-xl object-cover bg-stone-100 border border-stone-200 shrink-0"
                        />
                        <div>
                          <Link
                            href={`/products/${products.find((p) => p.id === item.productId)?.slug || item.productId}`}
                            className="text-xs sm:text-sm font-bold text-stone-950 hover:text-stone-600 cursor-pointer block"
                          >
                            {item.title}
                          </Link>
                          <p className="text-[11px] text-stone-500">
                            Quantity: {item.quantity}{' '}
                            {item.selectedColor ? `• ${item.selectedColor}` : ''}{' '}
                            {item.selectedSize ? `• ${item.selectedSize}` : ''}
                          </p>
                        </div>
                      </div>

                      <span className="text-xs sm:text-sm font-bold text-stone-900">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tracking & Reorder Footer */}
                <div className="p-4 sm:p-5 bg-stone-50/70 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-stone-600">
                    <Truck className="w-4 h-4 text-stone-900" />
                    <span>
                      Courier: <strong>{order.trackingCarrier || 'SHATTAAN Courier'}</strong> • Tracking:{' '}
                      <strong className="font-mono">{order.trackingNumber || 'Pending'}</strong>
                    </span>
                  </div>

                  <button
                    onClick={() => handleReorder(order)}
                    className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reorder Items
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 2: SAVED ADDRESSES */}
      {activeTab === 'addresses' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <div>
              <h2 className="text-lg font-bold text-stone-950">Shipping & Billing Addresses</h2>
              <p className="text-xs text-stone-500">
                Primary delivery address used for swift express checkout.
              </p>
            </div>
            {!isEditingAddress && (
              <button
                onClick={() => setIsEditingAddress(true)}
                className="px-4 py-2 bg-stone-950 text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center gap-1.5"
              >
                <Edit2 className="w-3.5 h-3.5" /> Edit Address
              </button>
            )}
          </div>

          {isEditingAddress ? (
            <form onSubmit={handleSaveAddress} className="space-y-4 max-w-xl text-xs">
              <div>
                <label className="block font-bold text-stone-800 mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-800 mb-1">Apartment, Suite, Unit</label>
                <input
                  type="text"
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-stone-800 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-800 mb-1">State / Province</label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-800 mb-1">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-stone-950 text-white font-bold rounded-xl"
                >
                  Save Address
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingAddress(false)}
                  className="px-4 py-2.5 bg-stone-200 text-stone-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 max-w-md space-y-2 text-xs">
              <span className="px-2.5 py-0.5 bg-stone-900 text-white rounded text-[10px] font-bold uppercase tracking-wider">
                Default Courier Address
              </span>
              <p className="font-bold text-sm text-stone-950">{currentUser.name}</p>
              <p className="text-stone-700">{currentUser.defaultAddress?.addressLine1}</p>
              {currentUser.defaultAddress?.addressLine2 && (
                <p className="text-stone-700">{currentUser.defaultAddress?.addressLine2}</p>
              )}
              <p className="text-stone-700">
                {currentUser.defaultAddress?.city}, {currentUser.defaultAddress?.state}{' '}
                {currentUser.defaultAddress?.postalCode}
              </p>
              <p className="text-stone-700">{currentUser.defaultAddress?.country}</p>
              <p className="text-stone-500 font-mono pt-1">{currentUser.phone}</p>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: PROFILE PREFERENCES */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6 max-w-2xl">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <div>
              <h2 className="text-lg font-bold text-stone-950">Profile & Credentials</h2>
              <p className="text-xs text-stone-500">
                Manage your contact details and luxury communication preferences.
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-stone-800 mb-1">Full Legal Name</label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-800 mb-1">Registered Email</label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-800 mb-1">Mobile / Concierge Phone</label>
              <input
                type="tel"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="px-6 py-3 bg-stone-950 hover:bg-stone-800 text-white rounded-xl font-bold uppercase tracking-wider text-xs transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Invoice Modal */}
      {selectedInvoiceOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm"
            onClick={() => setSelectedInvoiceOrder(null)}
          />
          <div className="relative bg-white w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl z-10 border border-stone-200 space-y-6">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-stone-950 text-amber-300 font-brand flex items-center justify-center font-bold">
                  S
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-950">SHATTAAN Official Invoice</h3>
                  <span className="text-[10px] font-mono text-stone-500">shattaan.com</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-lg flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" /> Print
                </button>
                <button
                  onClick={() => setSelectedInvoiceOrder(null)}
                  className="p-1.5 text-stone-400 hover:text-stone-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-stone-400 uppercase font-semibold text-[10px]">Billed To</p>
                <p className="font-bold text-stone-900 mt-0.5">{selectedInvoiceOrder.customer.name}</p>
                <p className="text-stone-600">{selectedInvoiceOrder.customer.shippingAddress.addressLine1}</p>
                <p className="text-stone-600">
                  {selectedInvoiceOrder.customer.shippingAddress.city}, {selectedInvoiceOrder.customer.shippingAddress.country}
                </p>
              </div>
              <div className="text-right">
                <p className="text-stone-400 uppercase font-semibold text-[10px]">Invoice Details</p>
                <p className="font-mono font-bold text-stone-900 mt-0.5">#{selectedInvoiceOrder.orderNumber}</p>
                <p className="text-stone-600 font-mono">Date: {new Date(selectedInvoiceOrder.date).toLocaleDateString()}</p>
                <p className="text-stone-600">Status: {selectedInvoiceOrder.paymentStatus.toUpperCase()}</p>
              </div>
            </div>

            <table className="w-full text-xs text-left border-y border-stone-200">
              <thead className="bg-stone-50 text-stone-700">
                <tr>
                  <th className="py-2.5 px-3">Item Description</th>
                  <th className="py-2.5 px-3 text-center">Qty</th>
                  <th className="py-2.5 px-3 text-right">Price</th>
                  <th className="py-2.5 px-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-800">
                {selectedInvoiceOrder.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-3 px-3 font-semibold">{item.title}</td>
                    <td className="py-3 px-3 text-center">{item.quantity}</td>
                    <td className="py-3 px-3 text-right">{formatPrice(item.price)}</td>
                    <td className="py-3 px-3 text-right font-bold">
                      {formatPrice(item.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end text-xs text-stone-700 space-y-1.5 flex-col items-end">
              <div className="flex justify-between w-48">
                <span>Subtotal:</span>
                <span className="font-semibold">{formatPrice(selectedInvoiceOrder.subtotal)}</span>
              </div>
              {selectedInvoiceOrder.discount > 0 && (
                <div className="flex justify-between w-48 text-emerald-700">
                  <span>Discount:</span>
                  <span>-{formatPrice(selectedInvoiceOrder.discount)}</span>
                </div>
              )}
              <div className="flex justify-between w-48">
                <span>Shipping:</span>
                <span>{selectedInvoiceOrder.shippingFee === 0 ? 'FREE' : formatPrice(selectedInvoiceOrder.shippingFee)}</span>
              </div>
              <div className="flex justify-between w-48">
                <span>Tax:</span>
                <span>{formatPrice(selectedInvoiceOrder.tax)}</span>
              </div>
              <div className="flex justify-between w-48 pt-2 border-t border-stone-300 font-extrabold text-sm text-stone-950">
                <span>Grand Total:</span>
                <span>{formatPrice(selectedInvoiceOrder.total)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
