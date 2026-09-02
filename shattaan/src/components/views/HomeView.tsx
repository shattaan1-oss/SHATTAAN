'use client';

import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Award,
  Compass,
  Star,
  CheckCircle2,
  TrendingUp,
  ShoppingBag,
} from 'lucide-react';
import { motion } from 'motion/react';

export const HomeView: React.FC = () => {
  const {
    products,
    categories,
    setCurrentView,
    navigateToCategory,
    navigateToProduct,
    formatPrice,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'trending' | 'new' | 'featured'>('trending');

  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNewArrival);
  const trendingProducts = products.filter((p) => p.isTrending);

  const displayedTabProducts =
    activeTab === 'trending'
      ? trendingProducts
      : activeTab === 'new'
      ? newArrivals
      : featuredProducts;

  const heroHeroicProduct = products.find((p) => p.id === 'sht-001') || products[0];

  return (
    <div className="space-y-20 pb-20">
      {/* Editorial Hero Section */}
      <section className="relative bg-[#181615] text-white overflow-hidden rounded-b-3xl sm:rounded-b-[2.5rem] shadow-2xl">
        {/* Background Subtle Gradient & Glow */}
        <div className="absolute inset-0 bg-radial from-stone-800/40 via-transparent to-black pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-800/80 border border-stone-700/80 text-amber-300 text-xs font-semibold uppercase tracking-widest backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Spring/Summer 2026 Collection</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
                Modern Luxury.<br />
                <span className="text-stone-400 font-light">Enduring Craftsmanship.</span>
              </h1>

              <p className="text-sm sm:text-base text-stone-300 max-w-xl font-normal leading-relaxed">
                Welcome to SHATTAAN (shattaan.com). An international marketplace curated for connoisseurs of refined leather goods, bespoke cashmere, precision Swiss horology, and pure acoustics.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <button
                  id="hero-explore-btn"
                  onClick={() => {
                    setCurrentView('catalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="min-h-[44px] px-8 py-3.5 sm:py-4 bg-white hover:bg-stone-100 text-stone-950 font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 group"
                >
                  <span>Explore Marketplace</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  id="hero-about-btn"
                  onClick={() => {
                    setCurrentView('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="min-h-[44px] px-6 py-3.5 sm:py-4 bg-stone-900/80 hover:bg-stone-800 text-stone-200 border border-stone-700/80 font-semibold text-xs uppercase tracking-wider rounded-xl transition-colors backdrop-blur-sm flex items-center justify-center"
                >
                  Our Heritage
                </button>
              </div>

              {/* Badges Bar */}
              <div className="pt-6 border-t border-stone-800/80 flex flex-wrap items-center gap-6 text-xs text-stone-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>100% Certified Authentic</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Artisan Tuscan Leathers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-amber-400" />
                  <span>Global Express Logistics</span>
                </div>
              </div>
            </motion.div>

            {/* Right Hero Product Card Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-md bg-stone-900/90 rounded-3xl p-4 border border-stone-800 shadow-2xl backdrop-blur-md">
                <div
                  onClick={() => navigateToProduct(heroHeroicProduct.id)}
                  className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-stone-950 cursor-pointer group"
                >
                  <img
                    src={heroHeroicProduct.images[0]}
                    alt={heroHeroicProduct.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-amber-400 text-stone-950 font-extrabold text-[10px] uppercase tracking-widest rounded-md shadow-md">
                      Flagship Feature
                    </span>
                  </div>

                  {/* Bottom Overlay Info */}
                  <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl bg-stone-950/80 backdrop-blur-md border border-stone-800 text-white flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-amber-400 font-bold">
                        {heroHeroicProduct.category.replace('-', ' ')}
                      </span>
                      <h4 className="text-sm font-bold text-white line-clamp-1">
                        {heroHeroicProduct.title}
                      </h4>
                      <p className="text-xs font-mono font-bold text-stone-300 mt-0.5">
                        {formatPrice(heroHeroicProduct.price)}
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateToProduct(heroHeroicProduct.id);
                      }}
                      className="w-10 h-10 rounded-xl bg-white text-stone-950 flex items-center justify-center font-bold hover:bg-amber-400 transition-colors shrink-0 shadow-lg"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Explore by Category Visual Tiles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-stone-600">
              Curated Departments
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 mt-1">
              Shop by Category
            </h2>
          </div>
          <button
            onClick={() => {
              setCurrentView('catalog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-bold uppercase tracking-wider text-stone-900 hover:text-stone-600 flex items-center gap-1.5 transition-colors"
          >
            <span>View All Collections</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={cat.id}
              onClick={() => navigateToCategory(cat.slug)}
              className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 border border-stone-200"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              <div className="absolute inset-x-6 bottom-6 text-white flex flex-col justify-end">
                <span className="text-[11px] font-mono tracking-widest text-amber-300 uppercase font-semibold">
                  {cat.itemCount} Curated Pieces
                </span>
                <h3 className="text-xl font-bold text-white mt-1 group-hover:text-amber-300 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-stone-300 mt-1.5 line-clamp-2 leading-relaxed opacity-90">
                  {cat.description}
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white group-hover:translate-x-1 transition-transform">
                  <span>Explore Department</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Collection Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-stone-600">
              The Masterworks
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 mt-1">
              Featured Highlights
            </h2>
          </div>
          <button
            onClick={() => {
              setCurrentView('catalog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-bold uppercase tracking-wider text-stone-900 hover:text-stone-600 flex items-center gap-1.5 transition-colors"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Brand Craftsmanship & Heritage Feature Banner */}
      <section className="bg-stone-900 text-white py-16 sm:py-24 rounded-3xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden relative shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              The SHATTAAN Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Designed for Longevity.<br />Handcrafted Without Compromise.
            </h2>
            <p className="text-sm text-stone-300 leading-relaxed">
              Every item featured on shattaan.com adheres to uncompromising standards of material integrity, structural balance, and heritage manufacturing. From full-grain vegetable-tanned Italian leathers to grade-5 titanium acoustic enclosures, we reject planned obsolescence.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-stone-800">
              <div>
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-amber-400">
                  100%
                </span>
                <p className="text-[11px] text-stone-400 uppercase tracking-wider mt-1">
                  Full-Grain Leather
                </p>
              </div>
              <div>
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-amber-400">
                  Swiss
                </span>
                <p className="text-[11px] text-stone-400 uppercase tracking-wider mt-1">
                  Horology Calibers
                </p>
              </div>
              <div>
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-amber-400">
                  Zero
                </span>
                <p className="text-[11px] text-stone-400 uppercase tracking-wider mt-1">
                  Synthetic Fillers
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setCurrentView('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs uppercase tracking-widest rounded-xl transition-colors inline-flex items-center gap-2"
            >
              Read Our Brand Story <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-stone-800">
                <img
                  src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80"
                  alt="Craftsmanship leather"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden bg-stone-800">
                <img
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
                  alt="Timepiece precision"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="aspect-square rounded-2xl overflow-hidden bg-stone-800">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
                  alt="Acoustic engineering"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-stone-800">
                <img
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80"
                  alt="Fine apparel"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending & New Season Tabs Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-stone-600">
              Curated Collections
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 mt-1">
              Explore What's In Focus
            </h2>
          </div>

          {/* Tab buttons */}
          <div className="flex items-center p-1 bg-stone-100 rounded-xl border border-stone-200 text-xs font-bold">
            <button
              onClick={() => setActiveTab('trending')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === 'trending'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Trending Now
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === 'new'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              New Arrivals
            </button>
            <button
              onClick={() => setActiveTab('featured')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === 'featured'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Curated Picks
            </button>
          </div>
        </div>

        {displayedTabProducts.length === 0 ? (
          <div className="bg-stone-50 border border-stone-200 rounded-3xl p-10 sm:p-14 text-center max-w-2xl mx-auto flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-stone-200/70 text-stone-700 flex items-center justify-center mb-4">
              <ShoppingBag className="w-7 h-7 text-stone-600" />
            </div>
            <h3 className="text-lg font-bold text-stone-900">
              No Items Currently in this Curated Selection
            </h3>
            <p className="text-xs text-stone-600 max-w-md mt-2 leading-relaxed">
              Our ateliers are currently preparing new editions for this section. Explore our full catalog to discover all available pieces.
            </p>
            <button
              onClick={() => {
                setCurrentView('catalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="mt-6 px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
            >
              <span>Explore Full Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedTabProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Verified Buyer Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-100 rounded-3xl p-8 sm:p-12 border border-stone-200/80">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-stone-500">
              Verified Client Experiences
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 mt-1">
              Words From Our Patrons
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 flex flex-col justify-between">
              <div>
                <div className="flex text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <h4 className="text-sm font-bold text-stone-900 mb-1">
                  "Exceeded all expectations."
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  "The Obsidian Weekender Duffle is sublime. The leather aroma, the heft of the PVD brass zippers, and the attention to stitch alignment show real mastery."
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs font-bold text-stone-900">Alexander S.</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                  Verified Buyer
                </span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 flex flex-col justify-between">
              <div>
                <div className="flex text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <h4 className="text-sm font-bold text-stone-900 mb-1">
                  "Phenomenal acoustic clarity."
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  "The Aura Studio planar headphones reveal nuances in orchestral recordings that high-end studio monitors often miss. Packaging was immaculate."
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs font-bold text-stone-900">Sophia C.</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                  Verified Buyer
                </span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 flex flex-col justify-between">
              <div>
                <div className="flex text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <h4 className="text-sm font-bold text-stone-900 mb-1">
                  "Instant staple timepiece."
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  "The Monolith Chronograph looks like a piece that should cost triple. The bead-blasted 316L finish is flawless and it keeps razor-sharp time."
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs font-bold text-stone-900">Marcus V.</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                  Verified Buyer
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
