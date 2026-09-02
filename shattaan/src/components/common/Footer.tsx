'use client';

import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  ArrowRight,
  Mail,
  CheckCircle2,
  Lock,
  Globe,
  LayoutDashboard,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const {
    setCurrentView,
    navigateToCategory,
    categories,
    addToast,
  } = useStore();

  const [emailInput, setEmailInput] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim() && emailInput.includes('@')) {
      setIsSubscribed(true);
      addToast('success', 'VIP Access Confirmed', 'Welcome to SHATTAAN Privé. Check your inbox for code WELCOME10.');
      setEmailInput('');
    }
  };

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      {/* 4 Value Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 border-b border-stone-800/80">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-center shrink-0 text-amber-400">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide">Complimentary Courier</h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Insured express delivery worldwide on all curated orders over $250.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-center shrink-0 text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide">Certified Authenticity</h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Every piece is artisan-verified with a serialized certificate of origin.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-center shrink-0 text-amber-400">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide">30-Day Returns</h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Prepaid return labels and white-glove courier pickups globally.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-center shrink-0 text-amber-400">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide">Client Concierge</h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Dedicated style advisors and order specialists available 24/7.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div
            onClick={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center text-stone-950 font-brand text-lg font-bold shadow-md">
              S
            </div>
            <div>
              <span className="font-brand text-2xl font-extrabold tracking-[0.2em] text-white">
                SHATTAAN
              </span>
              <span className="block text-[10px] uppercase font-mono tracking-widest text-amber-400/90">
                shattaan.com
              </span>
            </div>
          </div>

          <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
            SHATTAAN is a global online luxury marketplace bringing together world-class craftsmanship, modern tailoring, fine leather goods, and refined acoustics.
          </p>

          {/* Newsletter Form */}
          <div className="pt-2">
            <p className="text-xs font-bold text-white uppercase tracking-wider mb-2">
              Join SHATTAAN Privé
            </p>
            {isSubscribed ? (
              <div className="p-3 bg-stone-900 border border-emerald-500/40 rounded-xl text-xs text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>You're enrolled. Use code <strong>WELCOME10</strong> for 10% off.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full pl-9 pr-3 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                  <Mail className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shrink-0"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Categories Column */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-white">Collections</h4>
          <ul className="space-y-2 text-xs text-stone-400">
            <li>
              <button
                onClick={() => {
                  setCurrentView('catalog');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-amber-400 transition-colors"
              >
                All Products Catalog
              </button>
            </li>
            {categories.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => navigateToCategory(cat.slug)}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Care Column */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-white">Customer Care</h4>
          <ul className="space-y-2 text-xs text-stone-400">
            <li>
              <button
                onClick={() => {
                  setCurrentView('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-amber-400 transition-colors"
              >
                Contact Concierge
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setCurrentView('track-order');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-amber-400 transition-colors"
              >
                Track Your Shipment
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setCurrentView('shipping-returns');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-amber-400 transition-colors"
              >
                Shipping & Delivery
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setCurrentView('account');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-amber-400 transition-colors"
              >
                My Account & Orders
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setCurrentView('wishlist');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-amber-400 transition-colors"
              >
                Saved Wishlist
              </button>
            </li>
          </ul>
        </div>

        {/* About & Legal Column */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-white">The House</h4>
          <ul className="space-y-2 text-xs text-stone-400">
            <li>
              <button
                onClick={() => {
                  setCurrentView('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-amber-400 transition-colors"
              >
                Our Brand Heritage
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setCurrentView('privacy');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-amber-400 transition-colors"
              >
                Privacy Policy
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setCurrentView('terms');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-amber-400 transition-colors"
              >
                Terms of Service
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setCurrentView('admin');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-amber-400 transition-colors text-amber-300 font-semibold flex items-center gap-1.5 pt-1"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                Store Admin Portal
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar: Copyright, Domain & Security */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-stone-400" />
          <span>© {new Date().getFullYear()} SHATTAAN (shattaan.com). All rights reserved.</span>
        </div>

        {/* Simulated Payment Badges */}
        <div className="flex items-center gap-3 text-[11px] font-mono text-stone-400">
          <span className="px-2 py-1 bg-stone-900 border border-stone-800 rounded">VISA</span>
          <span className="px-2 py-1 bg-stone-900 border border-stone-800 rounded">MASTERCARD</span>
          <span className="px-2 py-1 bg-stone-900 border border-stone-800 rounded">AMEX</span>
          <span className="px-2 py-1 bg-stone-900 border border-stone-800 rounded">APPLE PAY</span>
          <span className="px-2 py-1 bg-stone-900 border border-stone-800 rounded">PAYPAL</span>
        </div>
      </div>
    </footer>
  );
};
