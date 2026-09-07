'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useStore } from '../../context/StoreContext';
import { CurrencyCode } from '../../types';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  Shield,
  Truck,
  ArrowRight,
  Sparkles,
  Package,
  Download,
  Award,
  Sparkle,
  Compass,
  Shirt,
  Briefcase,
  Watch,
  Headphones,
  Flame,
  Home,
  Layers,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    cartCount,
    wishlist,
    setIsCartDrawerOpen,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    currency,
    setCurrency,
    formatPrice,
    products,
    currentUser,
  } = useStore();

  const router = useRouter();
  const pathname = usePathname();
  const isAdmin = pathname ? pathname.startsWith('/admin') : false;
  const isShopAll = pathname === '/shop' && !searchQuery;
  const isCategoryActive = (slug: string) => pathname === `/shop/${slug}`;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);
  const currencyRef = useRef<HTMLDivElement>(null);

  // Category metadata for enriched visual presentation
  const categoryMetadata: Record<string, { icon: React.ReactNode; subtitle: string }> = {
    'apparel': {
      icon: <Shirt className="w-4 h-4 text-stone-800" />,
      subtitle: 'Cashmere, bespoke couture & outerwear',
    },
    'leather-goods': {
      icon: <Briefcase className="w-4 h-4 text-stone-800" />,
      subtitle: 'Full-grain Tuscan calfskin & travel pieces',
    },
    'timepieces-jewelry': {
      icon: <Watch className="w-4 h-4 text-stone-800" />,
      subtitle: 'Swiss mechanical calibers & 18k accents',
    },
    'audio-tech': {
      icon: <Headphones className="w-4 h-4 text-stone-800" />,
      subtitle: 'Planar acoustics, studio gear & audio docks',
    },
    'fragrances-grooming': {
      icon: <Flame className="w-4 h-4 text-stone-800" />,
      subtitle: 'Rare oud, velvet amber & extrait de parfum',
    },
    'living-decor': {
      icon: <Home className="w-4 h-4 text-stone-800" />,
      subtitle: 'Murano glassware & sculptural lighting',
    },
  };

  // Filter matched products for instant search autocomplete dropdown
  const searchResults = searchQuery.trim()
    ? products
        .filter(
          (p) =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        .slice(0, 5)
    : [];

  // Close menus on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setIsAccountMenuOpen(false);
      }
      if (currencyRef.current && !currencyRef.current.contains(event.target as Node)) {
        setIsCurrencyMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
        setIsAccountMenuOpen(false);
        setIsCurrencyMenuOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Automatically close mobile menu when navigating views
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname, selectedCategory]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
      setSelectedCategory(null);
      router.push('/shop');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currencies: CurrencyCode[] = ['USD', 'EUR', 'GBP', 'AED', 'CAD'];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-stone-900 text-stone-100 text-xs py-2 px-4 sm:px-8 flex items-center justify-between border-b border-stone-800">
        <div className="hidden lg:flex items-center gap-4 text-stone-400">
          <span className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Truck className="w-3.5 h-3.5 text-amber-400" />
            <span>Complimentary Global Courier on $250+</span>
          </span>
          <span className="text-stone-700">•</span>
          <span className="text-stone-300">
            Code: <strong className="text-amber-300 tracking-wider">WELCOME10</strong> for 10% off
          </span>
        </div>

        {/* Center message for mobile */}
        <div className="flex-1 lg:hidden text-center text-[11px] font-medium text-stone-200 truncate px-2">
          SHATTAAN Marketplace • Worldwide Courier
        </div>

        {/* Right tools: Currency Selector & Admin Portal Quick Switch */}
        <div className="flex items-center gap-3 sm:gap-4 text-xs">
          {/* Currency Switcher */}
          <div className="relative" ref={currencyRef}>
            <button
              onClick={() => setIsCurrencyMenuOpen(!isCurrencyMenuOpen)}
              aria-haspopup="listbox"
              aria-expanded={isCurrencyMenuOpen}
              aria-label="Select currency"
              className="flex items-center gap-1 text-stone-300 hover:text-white transition-colors py-0.5 px-2 rounded-md hover:bg-stone-800"
            >
              <span className="font-semibold">{currency}</span>
              <ChevronDown className="w-3 h-3 text-stone-400" />
            </button>

            {isCurrencyMenuOpen && (
              <div
                role="listbox"
                aria-label="Currency options"
                className="absolute right-0 top-full mt-1.5 w-24 bg-stone-900 text-stone-200 rounded-xl shadow-xl border border-stone-800 py-1.5 z-50 max-w-[calc(100vw-24px)]"
              >
                {currencies.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setCurrency(c);
                      setIsCurrencyMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-stone-800 transition-colors flex items-center justify-between ${
                      currency === c ? 'text-amber-400 font-bold' : 'text-stone-300'
                    }`}
                  >
                    <span>{c}</span>
                    {currency === c && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <span className="text-stone-700 hidden sm:inline">•</span>

          {/* Admin Dashboard Switch Button */}
          <Link
            id="header-admin-toggle"
            href={isAdmin ? '/' : '/admin'}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase transition-all ${
              isAdmin
                ? 'bg-amber-400 text-stone-950 shadow-xs'
                : 'bg-stone-800 text-stone-200 hover:bg-stone-700 hover:text-white border border-stone-700'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>{isAdmin ? 'Exit Admin' : 'Admin'}</span>
          </Link>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3 sm:gap-4">
          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            className="lg:hidden p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-stone-800 hover:text-stone-950 rounded-xl hover:bg-stone-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
            aria-label={isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile category navigation'}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo & Domain Branding */}
          <Link
            href="/"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-stone-950 flex items-center justify-center text-amber-300 font-brand text-lg sm:text-xl font-bold shadow-md group-hover:scale-105 transition-transform duration-300">
              S
            </div>
            <div className="flex flex-col">
              <span className="font-brand text-xl sm:text-3xl font-extrabold tracking-[0.2em] text-stone-950 leading-none">
                SHATTAAN
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-widest text-stone-600 group-hover:text-stone-900 transition-colors mt-0.5">
                shattaan.com
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar with Live Autocomplete */}
          <div className="hidden md:flex flex-1 max-w-md mx-6 relative" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <input
                type="text"
                placeholder="Search luxury fashion, leather, timepieces..."
                aria-label="Search luxury fashion, leather, timepieces"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                className="w-full pl-10 pr-4 py-2.5 bg-stone-100/90 hover:bg-stone-100 focus:bg-white text-xs text-stone-900 rounded-full border border-stone-200 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 focus:outline-none transition-all placeholder:text-stone-400"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                  aria-label="Clear search query"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>

            {/* Live Autocomplete Dropdown */}
            {isSearchOpen && searchQuery.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden z-50">
                <div className="p-3 bg-stone-50 border-b border-stone-100 flex items-center justify-between text-xs font-semibold text-stone-600">
                  <span>Matched Results ({searchResults.length})</span>
                  <Link
                    href="/shop"
                    onClick={() => {
                      setIsSearchOpen(false);
                    }}
                    className="text-stone-900 font-bold hover:underline"
                  >
                    View all results →
                  </Link>
                </div>

                {searchResults.length === 0 ? (
                  <div className="p-5 text-center text-xs text-stone-500">
                    No matching products found for "{searchQuery}".
                  </div>
                ) : (
                  <div className="divide-y divide-stone-100 max-h-80 overflow-y-auto">
                    {searchResults.map((item) => (
                      <Link
                        key={item.id}
                        href={`/products/${item.slug}`}
                        onClick={() => {
                          setIsSearchOpen(false);
                        }}
                        className="p-3 flex items-center gap-3 hover:bg-stone-50 cursor-pointer transition-colors"
                      >
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-12 h-12 rounded-lg object-cover bg-stone-100 border border-stone-200/60 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="text-xs font-bold text-stone-900 truncate">
                            {item.title}
                          </h5>
                          <span className="text-[10px] text-stone-500 uppercase tracking-wider">
                            {item.category.replace('-', ' ')}
                          </span>
                        </div>
                        <span className="text-xs font-extrabold text-stone-900">
                          {formatPrice(item.price)}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Wishlist Button */}
            <Link
              id="header-wishlist-btn"
              href="/wishlist"
              className="relative p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-stone-700 hover:text-stone-950 hover:bg-stone-100 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
              title="Saved Items"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Shopping Bag Button */}
            <button
              id="header-cart-btn"
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-stone-700 hover:text-stone-950 hover:bg-stone-100 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
              title="Shopping Bag"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-stone-900 text-amber-300 text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Customer Account Menu */}
            <div className="relative" ref={accountRef}>
              <button
                id="header-account-btn"
                onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                aria-haspopup="menu"
                aria-expanded={isAccountMenuOpen}
                aria-label="Account navigation menu"
                className="flex items-center gap-1.5 p-1 sm:px-3 sm:py-2 rounded-full border border-stone-200 hover:border-stone-400 bg-stone-50/60 hover:bg-stone-100 transition-all text-xs font-semibold text-stone-800 min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
              >
                <div className="w-7 h-7 rounded-full bg-stone-900 text-amber-300 flex items-center justify-center text-xs font-bold shrink-0">
                  {currentUser.name.charAt(0)}
                </div>
                <span className="hidden sm:inline font-medium text-stone-700 max-w-[100px] truncate">
                  {currentUser.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400 hidden sm:inline" />
              </button>

              {isAccountMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-stone-200 py-2 z-50 divide-y divide-stone-100">
                  <div className="px-4 py-3">
                    <p className="text-xs font-bold text-stone-900">{currentUser.name}</p>
                    <p className="text-[11px] text-stone-500 truncate">{currentUser.email}</p>
                    <span className="inline-block mt-1.5 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-900 rounded">
                      VIP Client Member
                    </span>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/account"
                      onClick={() => setIsAccountMenuOpen(false)}
                      className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:bg-stone-50 hover:text-stone-950 flex items-center gap-2"
                    >
                      <User className="w-4 h-4 text-stone-400" />
                      <span>Account Dashboard</span>
                    </Link>
                    <Link
                      href="/account"
                      onClick={() => setIsAccountMenuOpen(false)}
                      className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:bg-stone-50 hover:text-stone-950 flex items-center gap-2"
                    >
                      <Package className="w-4 h-4 text-stone-400" />
                      <span>Order History</span>
                    </Link>
                    <Link
                      href="/account"
                      onClick={() => setIsAccountMenuOpen(false)}
                      className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:bg-stone-50 hover:text-stone-950 flex items-center gap-2"
                    >
                      <Truck className="w-4 h-4 text-stone-400" />
                      <span>Track Shipment</span>
                    </Link>
                    <Link
                      href="/wishlist"
                      onClick={() => setIsAccountMenuOpen(false)}
                      className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:bg-stone-50 hover:text-stone-950 flex items-center gap-2"
                    >
                      <Heart className="w-4 h-4 text-stone-400" />
                      <span>Saved Favorites ({wishlist.length})</span>
                    </Link>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/admin"
                      onClick={() => setIsAccountMenuOpen(false)}
                      className="w-full text-left px-4 py-2 text-xs font-bold text-amber-900 bg-amber-50/70 hover:bg-amber-100 flex items-center gap-2"
                    >
                      <LayoutDashboard className="w-4 h-4 text-amber-700" />
                      <span>Store Admin Dashboard</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Category Navigation Bar */}
        <nav className="hidden lg:flex items-center justify-between border-t border-stone-100 py-3 text-xs uppercase tracking-widest font-semibold text-stone-600">
          <div className="flex items-center gap-7">
            <Link
              href="/shop"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory(null);
              }}
              className={`hover:text-stone-950 transition-colors pb-0.5 ${
                isShopAll && !selectedCategory ? 'text-stone-950 font-bold border-b-2 border-stone-950' : ''
              }`}
            >
              All Marketplace
            </Link>

            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop/${cat.slug}`}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`hover:text-stone-950 transition-colors pb-0.5 ${
                  isCategoryActive(cat.slug) ? 'text-stone-950 font-bold border-b-2 border-stone-950' : ''
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6 normal-case text-xs tracking-normal font-medium text-stone-500">
            <Link
              href="/about"
              className="hover:text-stone-900 transition-colors"
            >
              About SHATTAAN
            </Link>
            <Link
              href="/contact"
              className="hover:text-stone-900 transition-colors"
            >
              Concierge Contact
            </Link>
          </div>
        </nav>
      </div>

      {/* Mobile Category-First Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Dark Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden fixed inset-x-0 top-full bottom-0 z-40 bg-stone-950/60 backdrop-blur-xs"
              aria-hidden="true"
            />

            {/* Mobile Navigation Drawer Panel */}
            <motion.nav
              id="mobile-nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="lg:hidden absolute top-full left-0 right-0 z-50 bg-stone-50 border-b border-stone-300 shadow-2xl max-h-[calc(100dvh-120px)] overflow-y-auto overscroll-contain"
            >
              <div className="max-w-xl mx-auto p-4 sm:p-6 space-y-6">
                {/* 1. Compact Search Field */}
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    placeholder="Search luxury fashion, leather, timepieces..."
                    aria-label="Search luxury fashion, leather, timepieces"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-9 py-2.5 bg-white text-xs text-stone-900 rounded-xl border border-stone-200 shadow-xs focus:border-stone-900 focus:outline-none transition-all placeholder:text-stone-400"
                  />
                  <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
                      aria-label="Clear search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </form>

                {/* 2. Primary Shopping Categories (Category-First) */}
                <div>
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-200">
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-stone-500">
                      Shopping Categories
                    </span>
                    <span className="text-[10px] font-mono text-stone-400 uppercase">
                      6 Ateliers
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {/* All Marketplace Link */}
                    <Link
                      href="/shop"
                      onClick={() => {
                        setSelectedCategory(null);
                        setSearchQuery('');
                        setIsMobileMenuOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between group min-h-[48px] ${
                        isShopAll && !selectedCategory
                          ? 'bg-stone-900 text-white shadow-sm'
                          : 'bg-white hover:bg-stone-100 border border-stone-200/80 text-stone-900'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            isShopAll && !selectedCategory
                              ? 'bg-stone-800 text-amber-300'
                              : 'bg-stone-100 text-stone-700'
                          }`}
                        >
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div className="truncate">
                          <span className="text-sm font-bold block leading-tight">
                            All Marketplace
                          </span>
                          <span
                            className={`text-[11px] block leading-tight truncate ${
                              isShopAll && !selectedCategory
                                ? 'text-stone-300'
                                : 'text-stone-500'
                            }`}
                          >
                            Explore our complete curated catalog
                          </span>
                        </div>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${
                          isShopAll && !selectedCategory
                            ? 'text-amber-300'
                            : 'text-stone-400'
                        }`}
                      />
                    </Link>

                    {/* Six Specific Categories */}
                    {categories.map((cat) => {
                      const isSelected = isCategoryActive(cat.slug);
                      const meta = categoryMetadata[cat.slug] || {
                        icon: <Package className="w-4 h-4 text-stone-700" />,
                        subtitle: cat.description,
                      };

                      return (
                        <Link
                          key={cat.id}
                          href={`/shop/${cat.slug}`}
                          onClick={() => {
                            setSelectedCategory(cat.slug);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between group min-h-[48px] ${
                            isSelected
                              ? 'bg-stone-900 text-white shadow-sm'
                              : 'bg-white hover:bg-stone-100 border border-stone-200/80 text-stone-900'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                isSelected
                                  ? 'bg-stone-800 text-amber-300'
                                  : 'bg-stone-100 text-stone-700'
                              }`}
                            >
                              {meta.icon}
                            </div>
                            <div className="truncate">
                              <span className="text-sm font-bold block leading-tight">
                                {cat.name}
                              </span>
                              <span
                                className={`text-[11px] block leading-tight truncate ${
                                  isSelected ? 'text-stone-300' : 'text-stone-500'
                                }`}
                              >
                                {meta.subtitle}
                              </span>
                            </div>
                          </div>
                          <ChevronRight
                            className={`w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${
                              isSelected ? 'text-amber-300' : 'text-stone-400'
                            }`}
                          />
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Curated Editions & Formats */}
                <div>
                  <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-stone-200">
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-stone-500">
                      Curated Editions
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/shop"
                      onClick={() => {
                        setSelectedCategory(null);
                        setSearchQuery('Digital');
                        setIsMobileMenuOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="p-3 bg-white hover:bg-stone-100 border border-stone-200/80 rounded-xl text-left transition-colors min-h-[44px] flex items-center gap-2.5 shadow-2xs"
                    >
                      <Download className="w-4 h-4 text-stone-700 shrink-0" />
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-stone-900 block truncate">
                          Digital Products
                        </span>
                        <span className="text-[10px] text-stone-500 block truncate">
                          Instant master files
                        </span>
                      </div>
                    </Link>

                    <Link
                      href="/shop"
                      onClick={() => {
                        setSelectedCategory(null);
                        setSearchQuery('');
                        setIsMobileMenuOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="p-3 bg-white hover:bg-stone-100 border border-stone-200/80 rounded-xl text-left transition-colors min-h-[44px] flex items-center gap-2.5 shadow-2xs"
                    >
                      <Package className="w-4 h-4 text-stone-700 shrink-0" />
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-stone-900 block truncate">
                          Physical Goods
                        </span>
                        <span className="text-[10px] text-stone-500 block truncate">
                          Courier shipping
                        </span>
                      </div>
                    </Link>

                    <Link
                      href="/shop"
                      onClick={() => {
                        setSelectedCategory(null);
                        setSearchQuery('New');
                        setIsMobileMenuOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="p-3 bg-white hover:bg-stone-100 border border-stone-200/80 rounded-xl text-left transition-colors min-h-[44px] flex items-center gap-2.5 shadow-2xs"
                    >
                      <Sparkle className="w-4 h-4 text-stone-700 shrink-0" />
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-stone-900 block truncate">
                          New Arrivals
                        </span>
                        <span className="text-[10px] text-stone-500 block truncate">
                          2026 releases
                        </span>
                      </div>
                    </Link>

                    <Link
                      href="/shop"
                      onClick={() => {
                        setSelectedCategory(null);
                        setSearchQuery('Best Seller');
                        setIsMobileMenuOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="p-3 bg-white hover:bg-stone-100 border border-stone-200/80 rounded-xl text-left transition-colors min-h-[44px] flex items-center gap-2.5 shadow-2xs"
                    >
                      <Award className="w-4 h-4 text-stone-700 shrink-0" />
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-stone-900 block truncate">
                          Best Sellers
                        </span>
                        <span className="text-[10px] text-stone-500 block truncate">
                          Client favorites
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* 4. Client Concierge & Account Services */}
                <div>
                  <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-stone-200">
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-stone-500">
                      Client Concierge & Account
                    </span>
                  </div>

                  <div className="bg-white border border-stone-200/80 rounded-2xl divide-y divide-stone-100 overflow-hidden shadow-2xs">
                    <Link
                      href="/account"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-stone-50 text-xs font-semibold text-stone-800 min-h-[44px] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <User className="w-4 h-4 text-stone-500 shrink-0" />
                        <span>VIP Account & Orders</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                    </Link>

                    <Link
                      href="/wishlist"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-stone-50 text-xs font-semibold text-stone-800 min-h-[44px] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Heart className="w-4 h-4 text-stone-500 shrink-0" />
                        <span>Saved Wishlist ({wishlist.length})</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                    </Link>

                    <Link
                      href="/about"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-stone-50 text-xs font-semibold text-stone-800 min-h-[44px] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Shield className="w-4 h-4 text-stone-500 shrink-0" />
                        <span>About SHATTAAN (shattaan.com)</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                    </Link>

                    <Link
                      href="/contact"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-stone-50 text-xs font-semibold text-stone-800 min-h-[44px] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Compass className="w-4 h-4 text-stone-500 shrink-0" />
                        <span>Concierge Contact & Support</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                    </Link>

                    <Link
                      href="/shipping-returns"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-stone-50 text-xs font-semibold text-stone-800 min-h-[44px] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Truck className="w-4 h-4 text-stone-500 shrink-0" />
                        <span>Shipping & Returns Policy</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                    </Link>
                  </div>
                </div>

                {/* 5. Store Admin Portal & Currency Control */}
                <div className="space-y-3 pt-2">
                  <Link
                    href="/admin"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full py-3.5 px-4 bg-stone-900 hover:bg-stone-800 text-amber-300 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors min-h-[44px]"
                  >
                    <LayoutDashboard className="w-4 h-4 text-amber-400" />
                    <span>Store Admin Dashboard</span>
                  </Link>

                  <div className="flex items-center justify-between px-2 pt-1 text-[11px] text-stone-500">
                    <span className="font-mono uppercase tracking-wider">Currency:</span>
                    <div className="flex items-center gap-1">
                      {currencies.map((c) => (
                        <button
                          key={c}
                          onClick={() => setCurrency(c)}
                          className={`px-2 py-1 rounded-md text-[11px] font-bold transition-colors ${
                            currency === c
                              ? 'bg-stone-900 text-amber-300'
                              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
