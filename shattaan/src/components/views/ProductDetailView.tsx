'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Share2,
  Check,
  X,
  MessageSquarePlus,
  ArrowRight,
  Info,
  Box,
  Download,
  FileCode,
} from 'lucide-react';

import { Product } from '../../types';

type TabKey = 'details' | 'specs' | 'reviews' | 'shipping';

interface ProductDetailViewProps {
  initialProduct?: Product;
  slug?: string;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({ initialProduct, slug }) => {
  const {
    selectedProductId,
    products,
    categories,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    getProductReviews,
    addReview,
    addToast,
  } = useStore();
  const router = useRouter();

  // Lookup product from props or store
  const product =
    initialProduct ||
    products.find((p) => p.slug === slug || p.id === slug || p.id === selectedProductId) ||
    products.find((p) => p.id === selectedProductId);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<TabKey>('details');

  // Review Modal state
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');

  // Size Guide Modal state
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Focus management refs for accessibility
  const reviewTriggerRef = useRef<HTMLButtonElement | null>(null);
  const sizeGuideTriggerRef = useRef<HTMLButtonElement | null>(null);
  const reviewModalRef = useRef<HTMLDivElement | null>(null);
  const sizeGuideModalRef = useRef<HTMLDivElement | null>(null);
  const reviewFirstInputRef = useRef<HTMLInputElement | null>(null);
  const sizeGuideCloseBtnRef = useRef<HTMLButtonElement | null>(null);

  // Synchronize state on product change
  useEffect(() => {
    if (product) {
      setSelectedImageIndex(0);
      const firstInStockColor =
        product.colors?.find((c) => c.inStock !== false)?.name ||
        product.colors?.[0]?.name ||
        '';
      setSelectedColor(firstInStockColor);
      setSelectedSize(product.sizes?.[0] || '');
      setQuantity(1);
    }
  }, [product]);

  // Review Modal focus management & Escape key trap
  useEffect(() => {
    if (isReviewModalOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          setIsReviewModalOpen(false);
          reviewTriggerRef.current?.focus();
          return;
        }

        if (e.key === 'Tab' && reviewModalRef.current) {
          const focusableEls = reviewModalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusableEls.length > 0) {
            const firstEl = focusableEls[0];
            const lastEl = focusableEls[focusableEls.length - 1];

            if (e.shiftKey && document.activeElement === firstEl) {
              e.preventDefault();
              lastEl.focus();
            } else if (!e.shiftKey && document.activeElement === lastEl) {
              e.preventDefault();
              firstEl.focus();
            }
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      const timer = setTimeout(() => {
        reviewFirstInputRef.current?.focus();
      }, 50);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        clearTimeout(timer);
      };
    }
  }, [isReviewModalOpen]);

  // Size Guide Modal focus management & Escape key trap
  useEffect(() => {
    if (isSizeGuideOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          setIsSizeGuideOpen(false);
          sizeGuideTriggerRef.current?.focus();
          return;
        }

        if (e.key === 'Tab' && sizeGuideModalRef.current) {
          const focusableEls = sizeGuideModalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusableEls.length > 0) {
            const firstEl = focusableEls[0];
            const lastEl = focusableEls[focusableEls.length - 1];

            if (e.shiftKey && document.activeElement === firstEl) {
              e.preventDefault();
              lastEl.focus();
            } else if (!e.shiftKey && document.activeElement === lastEl) {
              e.preventDefault();
              firstEl.focus();
            }
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      const timer = setTimeout(() => {
        sizeGuideCloseBtnRef.current?.focus();
      }, 50);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        clearTimeout(timer);
      };
    }
  }, [isSizeGuideOpen]);

  // P1 FIX 1: Dedicated Product Not Found State (No fallback to products[0])
  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-stone-100 border border-stone-200 text-stone-500 flex items-center justify-center mx-auto shadow-sm">
          <Box className="w-8 h-8 text-stone-400" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-stone-500">
            Vault Catalog Notice
          </span>
          <h1 className="text-3xl font-extrabold text-stone-950">
            Product Not Found
          </h1>
          <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
            The requested item is no longer available, may have been relocated in our archival vault, or the link is invalid.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href="/shop"
            className="w-full sm:w-auto px-6 py-3.5 bg-stone-950 hover:bg-stone-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            Return to Marketplace
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-xs flex items-center justify-center"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const isDigital = product.type === 'digital';
  const isSaved = isInWishlist(product.id);
  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const productReviews = getProductReviews(product.id);
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Check if current variant is in stock
  const selectedColorObj = product.colors?.find((c) => c.name === selectedColor);
  const isSelectedVariantAvailable = !selectedColorObj || selectedColorObj.inStock !== false;

  const handleAddToCart = () => {
    if (!isDigital && product.colors && selectedColor) {
      if (selectedColorObj && selectedColorObj.inStock === false) {
        addToast('error', 'Variant Unavailable', 'The selected colorway is currently out of stock.');
        return;
      }
    }
    if (!isDigital && product.stock <= 0) {
      addToast('error', 'Out of Stock', 'This piece is currently out of stock.');
      return;
    }
    addToCart(product, quantity, selectedColor, selectedSize);
  };

  const handleBuyNow = () => {
    if (!isDigital && product.colors && selectedColor) {
      if (selectedColorObj && selectedColorObj.inStock === false) {
        addToast('error', 'Variant Unavailable', 'The selected colorway is currently out of stock.');
        return;
      }
    }
    if (!isDigital && product.stock <= 0) {
      addToast('error', 'Out of Stock', 'This piece is currently out of stock.');
      return;
    }
    addToCart(product, quantity, selectedColor, selectedSize);
    router.push('/checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('info', 'Link Copied', 'Product URL copied to your clipboard.');
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewComment.trim()) return;

    addReview({
      productId: product.id,
      author: reviewAuthor.trim(),
      rating: reviewRating,
      title: reviewTitle.trim() || 'Outstanding piece',
      comment: reviewComment.trim(),
      verifiedPurchase: true,
    });

    setIsReviewModalOpen(false);
    setReviewAuthor('');
    setReviewTitle('');
    setReviewComment('');
    reviewTriggerRef.current?.focus();
    addToast('success', 'Review Submitted', 'Your verified review has been published.');
  };

  // Keyboard navigation across product tabs
  const tabList: TabKey[] = ['details', 'specs', 'reviews', 'shipping'];
  const handleTabKeyDown = (e: React.KeyboardEvent, currentTab: TabKey) => {
    const currentIndex = tabList.indexOf(currentTab);
    let targetIndex = -1;
    if (e.key === 'ArrowRight') {
      targetIndex = (currentIndex + 1) % tabList.length;
    } else if (e.key === 'ArrowLeft') {
      targetIndex = (currentIndex - 1 + tabList.length) % tabList.length;
    } else if (e.key === 'Home') {
      targetIndex = 0;
    } else if (e.key === 'End') {
      targetIndex = tabList.length - 1;
    }

    if (targetIndex !== -1) {
      e.preventDefault();
      const nextTab = tabList[targetIndex];
      setActiveTab(nextTab);
      const nextTabEl = document.getElementById(`product-tab-${nextTab}`);
      nextTabEl?.focus();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-stone-500 uppercase tracking-widest">
        <Link
          href="/"
          className="hover:text-stone-900 focus:outline-none focus-visible:underline"
        >
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" aria-hidden="true" />
        <Link
          href={`/shop/${product.category}`}
          className="hover:text-stone-900 focus:outline-none focus-visible:underline"
        >
          {categories.find((c) => c.slug === product.category)?.name || product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" aria-hidden="true" />
        <span className="text-stone-900 truncate max-w-xs" aria-current="page">{product.title}</span>
      </nav>

      {/* Main Product Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Gallery (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-stone-100 border border-stone-200 shadow-md">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover object-center"
            />
            {discountPercent > 0 && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-red-900 text-white font-extrabold text-xs uppercase tracking-wider rounded-md shadow-md">
                Save {discountPercent}%
              </span>
            )}
            {/* Product Type Tag on Gallery */}
            <div className="absolute bottom-4 left-4">
              {isDigital ? (
                <span className="px-3 py-1.5 bg-indigo-950/90 backdrop-blur-sm text-indigo-100 text-xs font-extrabold uppercase tracking-wider rounded-xl shadow-md flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  Instant Digital Delivery
                </span>
              ) : (
                <span className="px-3 py-1.5 bg-stone-950/90 backdrop-blur-sm text-stone-100 text-xs font-extrabold uppercase tracking-wider rounded-xl shadow-md flex items-center gap-1.5">
                  <Box className="w-3.5 h-3.5 text-stone-400" />
                  Physical Handcrafted Item
                </span>
              )}
            </div>

            <button
              onClick={handleShare}
              className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-stone-900 flex items-center justify-center shadow-md transition-colors"
              title="Share product"
              aria-label="Share product"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  aria-label={`View product image ${idx + 1}`}
                  className={`relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 border-2 transition-all min-h-[44px] ${
                    selectedImageIndex === idx
                      ? 'border-stone-950 shadow-md scale-95'
                      : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Info & Actions (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs text-stone-500 font-mono mb-2 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="uppercase tracking-widest font-semibold text-stone-600">
                  {product.category.replace('-', ' ')}
                </span>
                {/* Type classification badge */}
                {isDigital ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-indigo-100 text-indigo-900 border border-indigo-200">
                    <Sparkles className="w-3 h-3 text-indigo-600" />
                    Digital
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-stone-100 text-stone-800 border border-stone-200">
                    <Box className="w-3 h-3 text-stone-600" />
                    Physical
                  </span>
                )}
              </div>
              <span>SKU: {product.sku}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-950 leading-tight">
              {product.title}
            </h1>

            {/* Rating Stars */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) ? 'fill-current' : 'text-stone-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-stone-900">{product.rating}</span>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('reviews');
                  const tabEl = document.getElementById('product-tab-reviews');
                  tabEl?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }}
                className="text-xs text-stone-500 hover:text-stone-900 underline cursor-pointer"
              >
                ({productReviews.length} client reviews)
              </button>
            </div>

            {/* Price block */}
            <div className="flex items-baseline gap-3 mt-4 pt-4 border-t border-stone-200">
              <span className="text-3xl font-extrabold text-stone-950">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-lg text-stone-400 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>

            <p className="text-xs text-stone-500 mt-1">
              {isDigital
                ? 'Includes instant license download and lifetime asset access.'
                : 'Taxes and insured duties calculated at checkout.'}
            </p>
          </div>

          <p className="text-sm text-stone-700 leading-relaxed">
            {product.description}
          </p>

          {/* P1 FIX 5: Normalized Digital Details Overview Banner */}
          {isDigital && product.digitalDetails && (
            <div className="p-4 bg-indigo-50/80 border border-indigo-200/80 rounded-2xl space-y-2 text-xs text-indigo-950">
              <div className="font-bold flex items-center gap-1.5 text-indigo-900">
                <Download className="w-4 h-4 text-indigo-600" /> Instant Digital Delivery
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-indigo-800">
                <div>Format: <strong className="font-semibold text-indigo-950">{product.digitalDetails.format}</strong></div>
                {product.digitalDetails.fileSize && <div>Size: <strong className="font-semibold text-indigo-950">{product.digitalDetails.fileSize}</strong></div>}
                {product.digitalDetails.license && <div>License: <strong className="font-semibold text-indigo-950">{product.digitalDetails.license}</strong></div>}
                <div>Delivery: <strong className="font-semibold text-indigo-950">{product.digitalDetails.deliveryMethod || 'Instant Secure Link'}</strong></div>
              </div>
            </div>
          )}

          {/* P1 FIX 4: Out-of-Stock Colorway Indicators */}
          {!isDigital && product.colors && product.colors.length > 0 && (
            <div className="pt-4 border-t border-stone-200">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-900 mb-2">
                Colorway: <span className="text-stone-600 font-normal">{selectedColor}</span>
              </label>
              <div className="flex items-center gap-3 flex-wrap">
                {product.colors.map((color) => {
                  const isColorInStock = color.inStock !== false;
                  return (
                    <button
                      key={color.name}
                      type="button"
                      disabled={!isColorInStock}
                      aria-disabled={!isColorInStock}
                      onClick={() => isColorInStock && setSelectedColor(color.name)}
                      className={`group relative p-1 rounded-full border-2 transition-all min-w-[36px] min-h-[36px] flex items-center justify-center ${
                        !isColorInStock
                          ? 'opacity-40 cursor-not-allowed border-transparent'
                          : selectedColor === color.name
                          ? 'border-stone-950 scale-110 shadow-sm'
                          : 'border-transparent hover:border-stone-300'
                      }`}
                      title={isColorInStock ? color.name : `${color.name} (Out of Stock)`}
                      aria-label={`${color.name}${isColorInStock ? '' : ' - Out of Stock'}`}
                    >
                      <span
                        className="relative block w-7 h-7 rounded-full border border-stone-300/80 shadow-xs overflow-hidden"
                        style={{ backgroundColor: color.hex }}
                      >
                        {!isColorInStock && (
                          <span className="absolute inset-0 flex items-center justify-center">
                            <span className="w-full h-[2px] bg-red-600 rotate-45 transform origin-center" />
                          </span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* P1 FIX 4: Out-of-Stock Size Indicators & Size Guide Trigger */}
          {!isDigital && product.sizes && product.sizes.length > 0 && (
            <div className="pt-4 border-t border-stone-200">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-900">
                  Size / Fit: <span className="text-stone-600 font-normal">{selectedSize}</span>
                </label>
                <button
                  ref={sizeGuideTriggerRef}
                  onClick={() => setIsSizeGuideOpen(true)}
                  aria-haspopup="dialog"
                  className="text-xs text-stone-500 hover:text-stone-900 underline font-medium min-h-[32px] flex items-center focus:outline-none focus-visible:ring-1 focus-visible:ring-stone-950"
                >
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((size) => {
                  const isAvailable = product.stock > 0;
                  return (
                    <button
                      key={size}
                      type="button"
                      disabled={!isAvailable}
                      aria-disabled={!isAvailable}
                      onClick={() => isAvailable && setSelectedSize(size)}
                      className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all min-h-[44px] ${
                        !isAvailable
                          ? 'opacity-40 cursor-not-allowed bg-stone-100 text-stone-400 border-stone-200 line-through'
                          : selectedSize === size
                          ? 'bg-stone-950 text-white border-stone-950 shadow-sm'
                          : 'bg-white text-stone-800 border-stone-300 hover:border-stone-500'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Stock Urgency indicator */}
          <div className="pt-2">
            {isDigital ? (
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-900">
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                <span>Unlimited Digital Inventory — Instant Download Access</span>
              </div>
            ) : product.stock <= 0 ? (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-bold text-rose-800">
                Currently Out of Stock. Join the waitlist for the next release.
              </div>
            ) : product.stock <= 5 ? (
              <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-xs font-bold text-amber-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Low Stock: Only {product.stock} units remaining in the vault.</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>In Stock & Ready for Immediate Express Dispatch</span>
              </div>
            )}
          </div>

          {/* Action Row: Quantity + Add to Bag + Wishlist */}
          <div className="pt-4 space-y-3">
            <div className="flex items-center gap-3">
              {/* Quantity Stepper (for physical items) */}
              {!isDigital && (
                <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50 p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1 || !isSelectedVariantAvailable}
                    className="w-11 h-11 rounded-lg flex items-center justify-center font-bold text-stone-700 hover:bg-white disabled:opacity-30 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span
                    aria-live="polite"
                    className="w-10 text-center font-extrabold text-sm text-stone-900"
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    disabled={quantity >= product.stock || !isSelectedVariantAvailable}
                    className="w-11 h-11 rounded-lg flex items-center justify-center font-bold text-stone-700 hover:bg-white disabled:opacity-30 transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              )}

              {/* Add to Bag */}
              <button
                id="product-detail-add-bag"
                onClick={handleAddToCart}
                disabled={(!isDigital && product.stock <= 0) || !isSelectedVariantAvailable}
                className="flex-1 min-h-[48px] py-4 px-6 bg-stone-950 hover:bg-stone-800 disabled:bg-stone-300 disabled:cursor-not-allowed text-white rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                {!isDigital && product.stock <= 0
                  ? 'Out of Stock'
                  : !isSelectedVariantAvailable
                  ? 'Colorway Unavailable'
                  : isDigital
                  ? 'Add Digital Asset'
                  : 'Add to Bag'}
              </button>

              {/* Wishlist Button */}
              <button
                id="product-detail-wishlist"
                onClick={() => toggleWishlist(product.id)}
                className={`min-w-[48px] min-h-[48px] p-3.5 rounded-xl border flex items-center justify-center transition-all ${
                  isSaved
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'border-stone-300 text-stone-600 hover:text-stone-900 hover:border-stone-500'
                }`}
                title={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
                aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Direct Buy Now Button */}
            {(isDigital || (product.stock > 0 && isSelectedVariantAvailable)) && (
              <button
                id="product-detail-buy-now"
                onClick={handleBuyNow}
                className="w-full min-h-[44px] py-3.5 px-6 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>{isDigital ? 'Express Instant Checkout' : 'Express Buy Now'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Trust Guarantees */}
          <div className="pt-6 border-t border-stone-200 grid grid-cols-2 gap-4 text-xs text-stone-600">
            {isDigital ? (
              <>
                <div className="flex items-center gap-2.5">
                  <Download className="w-4 h-4 text-indigo-700 shrink-0" />
                  <span>Instant File Access Post-Payment</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-stone-900 shrink-0" />
                  <span>Commercial & Personal License</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <FileCode className="w-4 h-4 text-stone-900 shrink-0" />
                  <span>Lossless Master Source Files</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-stone-900 shrink-0" />
                  <span>Free Lifetime Asset Updates</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-stone-900 shrink-0" />
                  <span>Complimentary Courier on $250+</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-stone-900 shrink-0" />
                  <span>100% Certified Authentic</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <RotateCcw className="w-4 h-4 text-stone-900 shrink-0" />
                  <span>30-Day Bespoke Returns</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-stone-900 shrink-0" />
                  <span>Lifetime Craft Warranty</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* P1 FIX 2: Fully Accessible Tabbed Information Architecture */}
      <div className="pt-10 border-t border-stone-200">
        {/* Accessible Tabs Bar */}
        <div
          role="tablist"
          aria-label="Product specifications and details tabs"
          className="flex items-center gap-4 sm:gap-8 border-b border-stone-200 overflow-x-auto pb-px"
        >
          <button
            role="tab"
            id="product-tab-details"
            aria-selected={activeTab === 'details'}
            aria-controls="product-tabpanel-details"
            tabIndex={activeTab === 'details' ? 0 : -1}
            onClick={() => setActiveTab('details')}
            onKeyDown={(e) => handleTabKeyDown(e, 'details')}
            className={`pb-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider whitespace-nowrap transition-all min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 ${
              activeTab === 'details'
                ? 'text-stone-950 border-b-2 border-stone-950'
                : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            Overview & Story
          </button>
          <button
            role="tab"
            id="product-tab-specs"
            aria-selected={activeTab === 'specs'}
            aria-controls="product-tabpanel-specs"
            tabIndex={activeTab === 'specs' ? 0 : -1}
            onClick={() => setActiveTab('specs')}
            onKeyDown={(e) => handleTabKeyDown(e, 'specs')}
            className={`pb-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider whitespace-nowrap transition-all min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 ${
              activeTab === 'specs'
                ? 'text-stone-950 border-b-2 border-stone-950'
                : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            Specifications & Format
          </button>
          <button
            role="tab"
            id="product-tab-reviews"
            aria-selected={activeTab === 'reviews'}
            aria-controls="product-tabpanel-reviews"
            tabIndex={activeTab === 'reviews' ? 0 : -1}
            onClick={() => setActiveTab('reviews')}
            onKeyDown={(e) => handleTabKeyDown(e, 'reviews')}
            className={`pb-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider whitespace-nowrap transition-all min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 ${
              activeTab === 'reviews'
                ? 'text-stone-950 border-b-2 border-stone-950'
                : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            Client Reviews ({productReviews.length})
          </button>
          <button
            role="tab"
            id="product-tab-shipping"
            aria-selected={activeTab === 'shipping'}
            aria-controls="product-tabpanel-shipping"
            tabIndex={activeTab === 'shipping' ? 0 : -1}
            onClick={() => setActiveTab('shipping')}
            onKeyDown={(e) => handleTabKeyDown(e, 'shipping')}
            className={`pb-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider whitespace-nowrap transition-all min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 ${
              activeTab === 'shipping'
                ? 'text-stone-950 border-b-2 border-stone-950'
                : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            {isDigital ? 'Instant Delivery & License' : 'Shipping & White-Glove Care'}
          </button>
        </div>

        {/* Tab Content Panels */}
        <div className="py-8">
          {activeTab === 'details' && (
            <div
              role="tabpanel"
              id="product-tabpanel-details"
              aria-labelledby="product-tab-details"
              tabIndex={0}
              className="max-w-3xl space-y-4 text-sm text-stone-700 leading-relaxed focus:outline-none"
            >
              <h3 className="text-lg font-bold text-stone-950">Artisan Narrative</h3>
              <p>{product.description}</p>
              <p>
                Every piece in our {product.category.replace('-', ' ')} department undergoes a multi-stage quality examination. Sourced through direct relationships with generational European ateliers and master craftsmen.
              </p>
            </div>
          )}

          {activeTab === 'specs' && (
            <div
              role="tabpanel"
              id="product-tabpanel-specs"
              aria-labelledby="product-tab-specs"
              tabIndex={0}
              className="max-w-2xl space-y-6 focus:outline-none"
            >
              <h3 className="text-lg font-bold text-stone-950">Technical Specifications & Assets</h3>
              
              {/* P1 FIX 5: Normalized Digital Details Table */}
              {isDigital && product.digitalDetails && (
                <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 space-y-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
                    <Download className="w-4 h-4 text-indigo-600" />
                    Digital Deliverable Specifications
                  </h4>
                  <div className="divide-y divide-stone-200 text-xs">
                    <div className="py-2.5 flex justify-between">
                      <span className="font-semibold text-stone-500">Master Format</span>
                      <span className="font-bold text-stone-900">{product.digitalDetails.format}</span>
                    </div>
                    {product.digitalDetails.fileSize && (
                      <div className="py-2.5 flex justify-between">
                        <span className="font-semibold text-stone-500">File Package Size</span>
                        <span className="font-bold text-stone-900">{product.digitalDetails.fileSize}</span>
                      </div>
                    )}
                    {product.digitalDetails.license && (
                      <div className="py-2.5 flex justify-between">
                        <span className="font-semibold text-stone-500">Licensing Model</span>
                        <span className="font-bold text-stone-900">{product.digitalDetails.license}</span>
                      </div>
                    )}
                    <div className="py-2.5 flex justify-between">
                      <span className="font-semibold text-stone-500">Delivery Method</span>
                      <span className="font-bold text-stone-900">{product.digitalDetails.deliveryMethod || 'Immediate direct download link + email receipt'}</span>
                    </div>
                    <div className="py-2.5 flex justify-between">
                      <span className="font-semibold text-stone-500">Compatibility</span>
                      <span className="font-bold text-stone-900">macOS, Windows, iOS, Android, Linux</span>
                    </div>
                  </div>
                </div>
              )}

              {product.specifications ? (
                <div className="divide-y divide-stone-200 border-y border-stone-200">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="py-3 flex justify-between text-xs sm:text-sm">
                      <span className="font-semibold text-stone-500">{key}</span>
                      <span className="font-bold text-stone-900 text-right">{value}</span>
                    </div>
                  ))}
                </div>
              ) : !isDigital ? (
                <p className="text-xs text-stone-500">Standard specifications apply for this item.</p>
              ) : null}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div
              role="tabpanel"
              id="product-tabpanel-reviews"
              aria-labelledby="product-tab-reviews"
              tabIndex={0}
              className="space-y-8 max-w-4xl focus:outline-none"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-stone-50 p-6 rounded-2xl border border-stone-200">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-extrabold text-stone-950">{product.rating}</div>
                  <div>
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating) ? 'fill-current' : 'text-stone-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Based on {productReviews.length} verified purchases
                    </p>
                  </div>
                </div>

                <button
                  ref={reviewTriggerRef}
                  onClick={() => setIsReviewModalOpen(true)}
                  aria-haspopup="dialog"
                  className="px-5 py-2.5 bg-stone-950 hover:bg-stone-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors min-h-[44px]"
                >
                  <MessageSquarePlus className="w-4 h-4" />
                  Write a Review
                </button>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {productReviews.length === 0 ? (
                  <p className="text-xs text-stone-500 italic">No reviews yet for this product. Be the first to share your experience.</p>
                ) : (
                  productReviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex text-amber-500">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${
                                  i < rev.rating ? 'fill-current' : 'text-stone-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs font-bold text-stone-900">{rev.title}</span>
                        </div>
                        <span className="text-[11px] text-stone-400 font-mono">{rev.date}</span>
                      </div>
                      <p className="text-xs text-stone-700 leading-relaxed">{rev.comment}</p>
                      <div className="flex items-center gap-2 pt-2 text-[11px] text-stone-500">
                        <span className="font-semibold text-stone-800">{rev.author}</span>
                        {rev.verifiedPurchase && (
                          <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold text-[10px]">
                            Verified Buyer
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div
              role="tabpanel"
              id="product-tabpanel-shipping"
              aria-labelledby="product-tab-shipping"
              tabIndex={0}
              className="max-w-3xl space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed focus:outline-none"
            >
              {isDigital ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-stone-950">Instant Digital Delivery Protocol</h3>
                  <p>
                    Digital orders are fulfilled instantaneously via automated download token issuance. No physical shipping is required.
                  </p>
                  <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-2 text-xs">
                    <h4 className="font-bold text-stone-900">How Delivery Works:</h4>
                    <ol className="list-decimal pl-4 space-y-1.5 text-stone-600">
                      <li><strong>Instant Confirmation:</strong> Secure direct download link appears immediately upon successful checkout.</li>
                      <li><strong>Email Archive:</strong> A permanent encrypted download link and commercial license certificate are emailed to you.</li>
                      <li><strong>Account Library:</strong> Access your downloads anytime from your SHATTAAN profile library.</li>
                      <li><strong>Updates Included:</strong> Any future revisions or high-resolution updates to this asset are provided free of charge.</li>
                    </ol>
                  </div>
                  <p className="text-xs text-stone-500">
                    License: Includes full commercial and non-commercial rights as outlined in the SHATTAAN Digital Master License Agreement.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-stone-950">SHATTAAN Global Logistics</h3>
                  <p>
                    All orders placed on <strong>shattaan.com</strong> are prepared within our temperature-controlled vault and dispatched via fully tracked DHL Express or FedEx Priority.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs text-stone-600">
                    <li><strong>North America:</strong> 2-3 Business Days (Complimentary over $250)</li>
                    <li><strong>United Kingdom & Europe:</strong> 2-4 Business Days</li>
                    <li><strong>Middle East (UAE, Saudi Arabia):</strong> 3-5 Business Days</li>
                    <li><strong>Asia-Pacific:</strong> 3-5 Business Days</li>
                  </ul>
                  <p className="text-xs text-stone-500 pt-2">
                    Every shipment includes protective custom packaging, archival dust covers, and signature verification upon delivery.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-stone-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-stone-500">
                Complete Your Ensemble
              </span>
              <h2 className="text-2xl font-extrabold text-stone-950 mt-1">
                Complementary Masterworks
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* P1 FIX 3: Accessible Write Review Modal */}
      {isReviewModalOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="review-modal-title"
        >
          <div
            className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm"
            onClick={() => {
              setIsReviewModalOpen(false);
              reviewTriggerRef.current?.focus();
            }}
          />
          <div
            ref={reviewModalRef}
            className="relative bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl z-10 border border-stone-200 space-y-5"
          >
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 id="review-modal-title" className="text-lg font-bold text-stone-950">
                Write a Review
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsReviewModalOpen(false);
                  reviewTriggerRef.current?.focus();
                }}
                aria-label="Close review dialog"
                className="text-stone-400 hover:text-stone-800 p-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
              <div>
                <label htmlFor="review-author-input" className="block font-bold text-stone-800 mb-1">
                  Your Name
                </label>
                <input
                  id="review-author-input"
                  ref={reviewFirstInputRef}
                  type="text"
                  required
                  value={reviewAuthor}
                  onChange={(e) => setReviewAuthor(e.target.value)}
                  placeholder="e.g. Julian B."
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900 text-xs"
                />
              </div>

              <div>
                <label id="review-rating-label" className="block font-bold text-stone-800 mb-1">
                  Rating
                </label>
                <div
                  role="radiogroup"
                  aria-labelledby="review-rating-label"
                  className="flex gap-2"
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      role="radio"
                      aria-checked={reviewRating === star}
                      aria-label={`Rate ${star} out of 5 stars`}
                      title={`Rate ${star} out of 5 stars`}
                      onClick={() => setReviewRating(star)}
                      className="p-1 text-amber-500 hover:scale-110 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 rounded-lg min-w-[36px] min-h-[36px] flex items-center justify-center"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= reviewRating ? 'fill-current' : 'text-stone-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="review-title-input" className="block font-bold text-stone-800 mb-1">
                  Headline
                </label>
                <input
                  id="review-title-input"
                  type="text"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  placeholder="e.g. Exceptional craftsmanship"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900 text-xs"
                />
              </div>

              <div>
                <label htmlFor="review-comment-input" className="block font-bold text-stone-800 mb-1">
                  Review Comments
                </label>
                <textarea
                  id="review-comment-input"
                  required
                  rows={4}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Describe the materials, fit, aesthetics, or packaging..."
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900 text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-stone-950 hover:bg-stone-800 text-white rounded-xl font-bold uppercase tracking-wider transition-colors min-h-[44px]"
              >
                Submit Verified Review
              </button>
            </form>
          </div>
        </div>
      )}

      {/* P1 FIX 3: Accessible Size Guide Modal */}
      {isSizeGuideOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sizeguide-modal-title"
        >
          <div
            className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm"
            onClick={() => {
              setIsSizeGuideOpen(false);
              sizeGuideTriggerRef.current?.focus();
            }}
          />
          <div
            ref={sizeGuideModalRef}
            className="relative bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl z-10 border border-stone-200 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 id="sizeguide-modal-title" className="text-lg font-bold text-stone-950">
                Sizing & Proportion Chart
              </h3>
              <button
                ref={sizeGuideCloseBtnRef}
                type="button"
                onClick={() => {
                  setIsSizeGuideOpen(false);
                  sizeGuideTriggerRef.current?.focus();
                }}
                aria-label="Close size guide dialog"
                className="text-stone-400 hover:text-stone-800 p-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-stone-600">
              All SHATTAAN apparel adheres to classic tailored sizing standards. For relaxed drape overcoats, order true to your chest measure.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-stone-200">
                <thead className="bg-stone-100 font-bold text-stone-800">
                  <tr>
                    <th className="p-2 border-b">Size</th>
                    <th className="p-2 border-b">Chest (in)</th>
                    <th className="p-2 border-b">Waist (in)</th>
                    <th className="p-2 border-b">EU / IT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  <tr>
                    <td className="p-2 font-bold">S</td>
                    <td className="p-2">36 - 38</td>
                    <td className="p-2">30 - 32</td>
                    <td className="p-2">48</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold">M</td>
                    <td className="p-2">38 - 40</td>
                    <td className="p-2">32 - 34</td>
                    <td className="p-2">50</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold">L</td>
                    <td className="p-2">41 - 43</td>
                    <td className="p-2">34 - 36</td>
                    <td className="p-2">52</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold">XL</td>
                    <td className="p-2">44 - 46</td>
                    <td className="p-2">36 - 38</td>
                    <td className="p-2">54</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
