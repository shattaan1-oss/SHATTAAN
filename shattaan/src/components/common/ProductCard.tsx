'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { Heart, ShoppingBag, Eye, Star, Check, Sparkles, Box } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  layout?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, layout = 'grid' }) => {
  const {
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
  } = useStore();

  const [isHovered, setIsHovered] = useState(false);
  const [isQuickAdded, setIsQuickAdded] = useState(false);
  const isSaved = isInWishlist(product.id);
  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const currentImage = isHovered && product.images.length > 1 ? product.images[1] : product.images[0];
  const isDigital = product.type === 'digital';

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.stock <= 0) return;
    addToCart(product, 1);
    setIsQuickAdded(true);
    setTimeout(() => {
      setIsQuickAdded(false);
    }, 1600);
  };

  if (layout === 'list') {
    return (
      <div
        id={`product-card-list-${product.id}`}
        className="group bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/80 hover:border-stone-400 hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row gap-5 items-stretch"
      >
        <Link
          href={`/products/${product.slug}`}
          className="relative w-full sm:w-52 h-52 rounded-xl overflow-hidden bg-stone-100 shrink-0 cursor-pointer block"
        >
          <img
            src={currentImage}
            alt={product.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {/* Top badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 pointer-events-none">
            <span
              className={`px-2 py-0.5 text-[10px] font-extrabold tracking-wider uppercase rounded-md shadow-xs flex items-center gap-1 ${
                isDigital
                  ? 'bg-indigo-950 text-indigo-200 border border-indigo-700/50'
                  : 'bg-stone-900 text-stone-300'
              }`}
            >
              {isDigital ? <Sparkles className="w-3 h-3 text-indigo-300" /> : <Box className="w-3 h-3 text-stone-400" />}
              {isDigital ? 'Digital' : 'Physical'}
            </span>
            {discountPercent > 0 && (
              <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-red-900 text-white rounded-md shadow-sm">
                -{discountPercent}%
              </span>
            )}
          </div>
        </Link>

        <div className="flex-1 w-full min-w-0 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold uppercase tracking-widest text-stone-500">
                  {product.category.replace('-', ' ')}
                </span>
                <span className="text-stone-300">•</span>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    isDigital
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                      : 'bg-stone-100 text-stone-600 border border-stone-200'
                  }`}
                >
                  {isDigital ? 'Instant Digital Access' : 'Physical Piece'}
                </span>
              </div>
              <button
                id={`wishlist-btn-list-${product.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product.id);
                }}
                className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full border transition-all ${
                  isSaved
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'border-stone-200 text-stone-400 hover:text-stone-900 hover:border-stone-400'
                }`}
                aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
                title={isSaved ? 'Remove from saved' : 'Save to wishlist'}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            </div>

            <Link
              href={`/products/${product.slug}`}
              className="text-lg font-bold text-stone-900 hover:text-stone-600 transition-colors mt-1 cursor-pointer block"
            >
              {product.title}
            </Link>

            <p className="text-sm text-stone-600 line-clamp-2 mt-1.5 leading-relaxed">
              {product.shortDescription || product.description}
            </p>

            <div className="flex items-center gap-1.5 mt-2.5">
              <div className="flex items-center text-amber-500">
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="text-sm font-semibold text-stone-800">{product.rating}</span>
              <span className="text-xs text-stone-600 font-medium">({product.reviewCount} reviews)</span>
              {isDigital ? (
                <span className="ml-3 text-xs font-semibold text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                  Instant Download
                </span>
              ) : product.stock <= 5 && product.stock > 0 ? (
                <span className="ml-3 text-xs font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-300">
                  Only {product.stock} left
                </span>
              ) : null}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-stone-100">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-stone-900">{formatPrice(product.price)}</span>
              {product.compareAtPrice && (
                <span className="text-sm text-stone-500 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                id={`quickview-btn-list-${product.id}`}
                onClick={() => setQuickViewProduct(product)}
                className="flex-1 sm:flex-initial min-h-[44px] px-4 py-2.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 active:bg-stone-300 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                aria-label={`Quick view ${product.title}`}
              >
                <Eye className="w-4 h-4" />
                Quick View
              </button>
              <button
                id={`add-to-cart-list-${product.id}`}
                onClick={handleQuickAdd}
                disabled={product.stock <= 0}
                className={`flex-1 sm:flex-initial min-h-[44px] px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 ${
                  isQuickAdded
                    ? 'bg-emerald-700 text-white'
                    : 'bg-stone-900 hover:bg-stone-800 active:bg-stone-950 disabled:bg-stone-300 text-white'
                }`}
                aria-label={product.stock <= 0 ? 'Sold Out' : `Add ${product.title} to bag`}
              >
                {isQuickAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    Added!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    {product.stock <= 0 ? 'Sold Out' : 'Add to Bag'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id={`product-card-${product.id}`}
      className="group bg-white rounded-2xl border border-stone-200/80 hover:border-stone-400 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Canvas */}
      <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden">
        <Link href={`/products/${product.slug}`} className="block w-full h-full cursor-pointer">
          <img
            src={currentImage}
            alt={product.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
        </Link>

        {/* Badges Container */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none z-10">
          <span
            className={`px-2.5 py-1 text-[10px] font-extrabold tracking-wider uppercase rounded-md shadow-xs flex items-center gap-1 ${
              isDigital
                ? 'bg-indigo-950 text-indigo-200 border border-indigo-700/50'
                : 'bg-stone-900 text-stone-300'
            }`}
          >
            {isDigital ? <Sparkles className="w-3 h-3 text-indigo-300" /> : <Box className="w-3 h-3 text-stone-400" />}
            {isDigital ? 'Digital' : 'Physical'}
          </span>
          {product.isNewArrival && (
            <span className="px-2.5 py-1 text-[10px] font-extrabold tracking-widest uppercase bg-stone-900 text-amber-300 rounded-md shadow-md">
              New Season
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2.5 py-1 text-[10px] font-extrabold tracking-wider uppercase bg-red-900 text-white rounded-md shadow-md">
              Save {discountPercent}%
            </span>
          )}
          {product.isFeatured && !product.isNewArrival && (
            <span className="px-2.5 py-1 text-[10px] font-extrabold tracking-wider uppercase bg-stone-800 text-stone-200 rounded-md">
              Curated
            </span>
          )}
        </div>

        {/* Top Right Wishlist button (44x44px touch target) */}
        <button
          id={`wishlist-toggle-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 min-w-[44px] min-h-[44px] w-11 h-11 rounded-full flex items-center justify-center transition-all shadow-md backdrop-blur-sm z-10 ${
            isSaved
              ? 'bg-rose-50 text-rose-600 border border-rose-200'
              : 'bg-white/90 text-stone-600 hover:text-stone-900 hover:bg-white active:bg-stone-100'
          }`}
          aria-label={isSaved ? `Remove ${product.title} from wishlist` : `Add ${product.title} to wishlist`}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* Desktop-Only Hover Action Bar (hidden on touch/smaller viewports, shown on lg+ hover) */}
        <div className="hidden lg:flex absolute inset-x-3 bottom-3 items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-10">
          <button
            id={`quickview-trigger-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 py-2.5 px-3 bg-white/95 hover:bg-white text-stone-900 text-xs font-bold rounded-xl shadow-lg flex items-center justify-center gap-1.5 transition-colors border border-stone-200/60"
            aria-label={`Quick view ${product.title}`}
          >
            <Eye className="w-3.5 h-3.5 text-stone-500" />
            Quick View
          </button>
          <button
            id={`quick-add-btn-${product.id}`}
            onClick={handleQuickAdd}
            disabled={product.stock <= 0}
            className={`py-2.5 px-3.5 text-white text-xs font-bold rounded-xl shadow-lg flex items-center justify-center gap-1.5 transition-colors ${
              isQuickAdded
                ? 'bg-emerald-700'
                : 'bg-stone-900 hover:bg-stone-800 disabled:bg-stone-400'
            }`}
            aria-label={product.stock <= 0 ? 'Sold Out' : `Add ${product.title} to bag`}
            title="Add to Shopping Bag"
          >
            {isQuickAdded ? (
              <Check className="w-3.5 h-3.5 text-white" />
            ) : (
              <ShoppingBag className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-stone-600 font-medium mb-1">
            <span className="uppercase tracking-widest text-[11px] font-semibold text-stone-600 truncate max-w-[140px]">
              {product.category.replace('-', ' ')}
            </span>
            <div className="flex items-center gap-1 shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span className="font-semibold text-stone-800">{product.rating}</span>
            </div>
          </div>

          <Link
            href={`/products/${product.slug}`}
            className="font-bold text-stone-900 text-base line-clamp-1 hover:text-stone-600 transition-colors cursor-pointer block"
            title={product.title}
          >
            {product.title}
          </Link>

          <p className="text-xs text-stone-600 mt-1 line-clamp-1">
            {product.shortDescription || product.description}
          </p>

          {/* Color Dots */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2.5">
              {product.colors.slice(0, 4).map((c, i) => (
                <span
                  key={i}
                  className="w-3 h-3 rounded-full border border-stone-300/80 shadow-xs"
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-[10px] text-stone-600 font-semibold">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Pricing & Stock status */}
        <div className="mt-3 pt-3 border-t border-stone-100">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-base sm:text-lg font-bold text-stone-900">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-xs text-stone-500 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>

            {isDigital ? (
              <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                Digital
              </span>
            ) : product.stock <= 0 ? (
              <span className="text-[11px] font-semibold text-rose-800 uppercase tracking-wider">
                Sold Out
              </span>
            ) : product.stock <= 5 ? (
              <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-300">
                Low Stock ({product.stock})
              </span>
            ) : (
              <span className="text-[11px] font-semibold text-emerald-800 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> In Stock
              </span>
            )}
          </div>

          {/* Mobile Direct Action Row (Visible on screens < lg, providing clear 44px touch targets without requiring hover) */}
          <div className="flex lg:hidden items-center gap-2 mt-3 pt-2.5 border-t border-stone-100">
            <button
              id={`mobile-quickview-btn-${product.id}`}
              onClick={() => setQuickViewProduct(product)}
              className="flex-1 min-h-[44px] py-2.5 px-3 bg-stone-100 active:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-stone-200/80"
              aria-label={`Quick view ${product.title}`}
            >
              <Eye className="w-3.5 h-3.5 text-stone-600" />
              <span>Quick View</span>
            </button>
            <button
              id={`mobile-add-btn-${product.id}`}
              onClick={handleQuickAdd}
              disabled={product.stock <= 0}
              className={`flex-1 min-h-[44px] py-2.5 px-3 text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                isQuickAdded
                  ? 'bg-emerald-700'
                  : 'bg-stone-900 active:bg-stone-950 disabled:bg-stone-300'
              }`}
              aria-label={product.stock <= 0 ? 'Sold Out' : `Add ${product.title} to bag`}
            >
              {isQuickAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{product.stock <= 0 ? 'Sold Out' : 'Add to Bag'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

