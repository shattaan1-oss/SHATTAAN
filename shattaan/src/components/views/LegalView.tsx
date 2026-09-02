'use client';

import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { Shield, FileText, Truck, RotateCcw, Award } from 'lucide-react';

interface LegalViewProps {
  initialTab?: 'privacy' | 'terms' | 'shipping' | 'returns';
}

export const LegalView: React.FC<LegalViewProps> = ({ initialTab }) => {
  const { currentView } = useStore();

  const getInitialTab = () => {
    if (initialTab) return initialTab;
    if (currentView === 'privacy') return 'privacy';
    if (currentView === 'terms') return 'terms';
    if (currentView === 'shipping-returns') return 'shipping';
    return 'shipping';
  };

  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'shipping' | 'returns'>(getInitialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    } else if (currentView === 'privacy') {
      setActiveTab('privacy');
    } else if (currentView === 'terms') {
      setActiveTab('terms');
    } else if (currentView === 'shipping-returns') {
      setActiveTab('shipping');
    }
  }, [currentView, initialTab]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="border-b border-stone-200 pb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-stone-500 block mb-1">
          SHATTAAN Corporate & Legal
        </span>
        <h1 className="text-3xl font-extrabold text-stone-950">
          Policies & Terms of shattaan.com
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Last revised and published: January 2026 • Valid for all global transactions on shattaan.com
        </p>
      </div>

      {/* Grid: Nav Sidebar + Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <aside className="md:col-span-4 bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-1">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3 transition-colors ${
              activeTab === 'privacy'
                ? 'bg-stone-950 text-white'
                : 'text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Privacy & Data Governance</span>
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3 transition-colors ${
              activeTab === 'terms'
                ? 'bg-stone-950 text-white'
                : 'text-stone-700 hover:bg-stone-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Terms of Service</span>
          </button>

          <button
            onClick={() => setActiveTab('shipping')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3 transition-colors ${
              activeTab === 'shipping'
                ? 'bg-stone-950 text-white'
                : 'text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Courier & Global Logistics</span>
          </button>

          <button
            onClick={() => setActiveTab('returns')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3 transition-colors ${
              activeTab === 'returns'
                ? 'bg-stone-950 text-white'
                : 'text-stone-700 hover:bg-stone-200'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Returns & Authenticity Warranty</span>
          </button>
        </aside>

        {/* Legal Text Body */}
        <main className="md:col-span-8 bg-white p-6 sm:p-10 rounded-3xl border border-stone-200 shadow-xs prose prose-stone max-w-none text-xs sm:text-sm text-stone-700 space-y-6 leading-relaxed">
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-stone-950">Privacy & Data Governance Policy</h2>
              <p>
                At <strong>SHATTAAN (shattaan.com)</strong>, your privacy and personal data sanctity are upheld to the highest standards of international discretion. This policy outlines how information is collected, safeguarded, and utilized.
              </p>
              <h3 className="text-base font-bold text-stone-900 pt-2">1. Information We Collect</h3>
              <p>
                We only collect essential customer data required to fulfill luxury orders, issue authenticated receipts, and coordinate white-glove courier deliveries (name, billing address, shipping coordinates, telephone number, and payment verification tokens).
              </p>
              <h3 className="text-base font-bold text-stone-900 pt-2">2. Payment Security</h3>
              <p>
                All financial transactions executed through shattaan.com are processed with end-to-end 256-bit SSL encryption. We never retain full credit card numbers on our servers.
              </p>
              <h3 className="text-base font-bold text-stone-900 pt-2">3. Zero Data Monetization</h3>
              <p>
                SHATTAAN does not sell, rent, or trade your personal information or purchase history with third-party advertising syndicates.
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-stone-950">Terms of Service</h2>
              <p>
                By accessing or purchasing from <strong>shattaan.com</strong>, you agree to be bound by the following conditions of sale and brand governance.
              </p>
              <h3 className="text-base font-bold text-stone-900 pt-2">1. Orders & Pricing Integrity</h3>
              <p>
                All prices are listed in USD. While we endeavor to ensure all inventory counts and currency conversions are exact, SHATTAAN reserves the right to cancel or re-verify orders in the event of unintentional typographical or inventory discrepancies.
              </p>
              <h3 className="text-base font-bold text-stone-900 pt-2">2. Intellectual Property</h3>
              <p>
                All brand marks, visual imagery, typography, editorial copywriting, and product designs presented on shattaan.com are the exclusive intellectual property of SHATTAAN Luxury Goods Ltd.
              </p>
              <h3 className="text-base font-bold text-stone-900 pt-2">3. Limitation of Liability</h3>
              <p>
                SHATTAAN is committed to fulfilling authentic products with utmost care. Goods are backed by our 2-Year Luxury Craftsmanship Guarantee.
              </p>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-stone-950">Courier & Global Logistics Policy</h2>
              <p>
                SHATTAAN operates a specialized global dispatch hub guaranteeing prompt, insured delivery to over 90 countries worldwide.
              </p>
              <h3 className="text-base font-bold text-stone-900 pt-2">1. Complimentary Delivery</h3>
              <p>
                Orders exceeding <strong>$250.00 USD</strong> automatically qualify for complimentary express courier dispatch with signature verification.
              </p>
              <h3 className="text-base font-bold text-stone-900 pt-2">2. Customs, Duties & Import Taxes</h3>
              <p>
                All import duties, local value-added taxes (VAT/GST), and customs brokerage tariffs are pre-calculated at checkout, ensuring no unexpected door fees upon delivery.
              </p>
            </div>
          )}

          {activeTab === 'returns' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-stone-950">Returns & Authenticity Guarantee</h2>
              <p>
                We stand behind the peerless quality of every artifact curated for shattaan.com.
              </p>
              <h3 className="text-base font-bold text-stone-900 pt-2">1. 30-Day Bespoke Returns</h3>
              <p>
                Unworn, unwashed, and unaltered merchandise in its original protective packaging with security seals intact may be returned within 30 days of delivery.
              </p>
              <h3 className="text-base font-bold text-stone-900 pt-2">2. 2-Year Craft Warranty</h3>
              <p>
                All horological timepieces and leather hardware components are protected against manufacturing defects for two full calendar years.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
