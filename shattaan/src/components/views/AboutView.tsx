'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Sparkles, Globe, Heart, Award, ArrowRight } from 'lucide-react';

export const AboutView: React.FC = () => {

  return (
    <div className="space-y-16 py-8 sm:py-12">
      {/* Brand Hero Statement */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-800">
          The Heritage of SHATTAAN
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-950 leading-tight">
          Where Generational Craft Meets Contemporary Restraint.
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl mx-auto">
          Founded on the principle that true luxury exists in permanence rather than novelty, 
          <strong> shattaan.com</strong> curates exceptional garments, handcrafted accessories, precision horology, and acoustic engineering.
        </p>
      </section>

      {/* Editorial Image Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border border-stone-200">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80"
            alt="SHATTAAN Atelier"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-transparent flex items-end p-8 sm:p-12">
            <div className="text-white max-w-lg">
              <span className="text-xs uppercase tracking-widest text-amber-300 font-bold block mb-1">
                Florence • Geneva • Tokyo
              </span>
              <h3 className="text-2xl font-bold">Uncompromising European & Japanese Guilds</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Core Tenets */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-stone-50 p-8 rounded-3xl border border-stone-200 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-stone-950 text-amber-300 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-950">Ethical Material Provenance</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every millimeter of cashmere is sourced from sustainable Mongolian free-grazing co-operatives; our full-grain leathers are gold-certified Tuscan vegetable tanneries.
            </p>
          </div>

          <div className="bg-stone-50 p-8 rounded-3xl border border-stone-200 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-stone-950 text-amber-300 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-950">Master Atelier Network</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              We eliminate unnecessary intermediary markups by collaborating directly with multi-generational master craftsmen across Italy, Switzerland, Germany, and Japan.
            </p>
          </div>

          <div className="bg-stone-50 p-8 rounded-3xl border border-stone-200 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-stone-950 text-amber-300 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-950">Lifetime Authenticity Guarantee</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every acquisition from shattaan.com arrives with an individual serial certificate, micro-engraved verification seal, and archival care guide.
            </p>
          </div>
        </div>
      </section>

      {/* Flagship Quote / Invitation */}
      <section className="bg-stone-950 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-amber-400 font-brand text-2xl font-bold tracking-widest block">
            SHATTAAN
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            "We do not design for a single season. We create heirlooms for the discerning few."
          </h2>
          <div className="pt-4">
            <Link
              href="/shop"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-xl text-xs font-extrabold uppercase tracking-widest transition-colors inline-flex items-center gap-2"
            >
              <span>Explore The Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
