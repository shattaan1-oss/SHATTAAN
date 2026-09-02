'use client';

import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const { addToast } = useStore();

  const [inquiryType, setInquiryType] = useState('Personal Concierge & Sizing');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [orderRef, setOrderRef] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      addToast(
        'success',
        'Message Transmitted',
        'Your concierge inquiry has been logged. A senior advisor will respond within 4 hours.'
      );
      setName('');
      setEmail('');
      setOrderRef('');
      setMessage('');
    }, 1000);
  };

  const faqs = [
    {
      q: 'How does SHATTAAN guarantee authentic European provenance?',
      a: 'Every piece is procured directly through our established contracts with generational Italian tanneries, Swiss horology workshops, and Japanese textile mills. Each item ships with a serialized cryptographic authentication certificate.',
    },
    {
      q: 'What are the global shipping timelines and customs handling?',
      a: 'We offer complimentary express courier shipping worldwide on orders above $250. Orders ship with DHL Express or FedEx Priority within 24 hours of payment verification, with all import duties pre-calculated and cleared.',
    },
    {
      q: 'What is the SHATTAAN return and exchange policy?',
      a: 'We welcome returns of unworn, pristine items in original packaging within 30 days of receipt. Our concierge team arranges complimentary white-glove courier pickup at your residential address.',
    },
    {
      q: 'Are custom bespoke commissions or personalized monograms available?',
      a: 'Yes. Our Tuscan leather goods and bespoke overcoats can be customized with discrete blind-embossed initials or custom linings. Please contact our private concierge directly via this form.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
          Client Services & Concierge
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-950">
          We are at your disposal
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
          Whether inquiring about rare timepieces, custom leather monogramming, or order logistics on <strong>shattaan.com</strong>, our client advisors are available 24/7.
        </p>
      </div>

      {/* Main Grid: Form + Direct Contact Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Form (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-6">
          <div>
            <h2 className="text-lg font-bold text-stone-950">Send an Inquiry</h2>
            <p className="text-xs text-stone-500">
              Direct response guaranteed within 4 business hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-stone-800 mb-1">Inquiry Topic</label>
              <select
                value={inquiryType}
                onChange={(e) => setInquiryType(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900"
              >
                <option value="Personal Concierge & Sizing">Personal Concierge & Sizing</option>
                <option value="Order Tracking & Logistics">Order Tracking & Logistics</option>
                <option value="Bespoke Monogramming Commission">Bespoke Monogramming Commission</option>
                <option value="Returns & Exchanges">Returns & Exchanges</option>
                <option value="Press & Commercial Partnerships">Press & Commercial Partnerships</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-stone-800 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Julian B."
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-800 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-stone-800 mb-1">Order Reference (If Applicable)</label>
              <input
                type="text"
                value={orderRef}
                onChange={(e) => setOrderRef(e.target.value)}
                placeholder="e.g. SHT-2026-8841"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl font-mono focus:outline-none focus:border-stone-900"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-800 mb-1">Detailed Message *</label>
              <textarea
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How may our private concierge assist you today?"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-stone-950 hover:bg-stone-800 text-white rounded-xl font-bold uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Transmitting...' : 'Dispatch Message'}</span>
            </button>
          </form>
        </div>

        {/* Right Column: Contact Channels & Flagship Salons (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-stone-900 text-white p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl border border-stone-800">
            <h3 className="text-base font-bold uppercase tracking-widest text-amber-400">
              Private Concierge Lines
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-stone-400 block">General & VIP Inquiries:</span>
                  <a href="mailto:concierge@shattaan.com" className="font-bold text-white hover:underline">
                    concierge@shattaan.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-stone-400 block">Global Telephone Concierge:</span>
                  <span className="font-mono font-bold text-white">+1 (800) 742-8826</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-stone-400 block">Concierge Hours:</span>
                  <span className="text-stone-300">24 Hours / 7 Days a Week</span>
                </div>
              </div>
            </div>
          </div>

          {/* Flagship Boutiques */}
          <div className="bg-stone-50 p-6 sm:p-8 rounded-3xl border border-stone-200 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-950">
              Flagship Salons
            </h3>

            <div className="space-y-3 text-xs divide-y divide-stone-200">
              <div className="pt-2 first:pt-0">
                <p className="font-bold text-stone-900">New York Flagship</p>
                <p className="text-stone-600">742 Madison Avenue, Upper East Side, NY 10065</p>
              </div>
              <div className="pt-3">
                <p className="font-bold text-stone-900">Parisian Atelier</p>
                <p className="text-stone-600">18 Place Vendôme, 75001 Paris, France</p>
              </div>
              <div className="pt-3">
                <p className="font-bold text-stone-900">Dubai Salon</p>
                <p className="text-stone-600">Fashion Avenue, The Dubai Mall, Downtown Dubai</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="max-w-4xl mx-auto pt-8 border-t border-stone-200 space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-extrabold text-stone-950">Frequently Answered Queries</h2>
          <p className="text-xs text-stone-500">Quick answers to common questions about shattaan.com</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-stone-900 hover:bg-stone-50 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-stone-500 shrink-0 transition-transform ${
                    openFaqIndex === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaqIndex === idx && (
                <div className="px-5 pb-5 text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
