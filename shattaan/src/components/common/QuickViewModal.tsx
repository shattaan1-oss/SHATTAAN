'use client';

import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Star, ShoppingBag, Heart, ArrowRight, Truck, Box, Sparkles, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigateToProduct,
  } = useStore();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedImageIndex(0);
      const firstInStockColor =
        quickViewProduct.colors?.find((c) => c.inStock !== false)?.name ||
        quickViewProduct.colors?.[0]?.name ||
        '';
      setSelectedColor(firstInStockColor);
      setSelectedSize(quickViewProduct.sizes?.[0] || '');
      setQuantity(1);
    }
  }, [quickViewProduct]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setQuickViewProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setQuickViewProduct]);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isDigital = product.type === 'digital';
  const isSaved = isInWishlist(product.id);
  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    setQuickViewProduct(null);
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 md:p-10"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quickview-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewProduct(null)}
          className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden z-10 my-8"
        >
          {/* Close button */}
          <button
            id="close-quickview-modal"
            onClick={() => setQuickViewProduct(null)}
            aria-label="Close quick view modal"
            className="absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-white/90 hover:bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-600 hover:text-stone-900 transition-colors shadow-sm min-w-[44px] min-h-[44px]"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Gallery Column */}
            <div className="bg-stone-100 p-6 flex flex-col justify-between">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-stone-200/60 shadow-inner">
                <img
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover object-center"
                />
                {discountPercent > 0 && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-bold bg-red-900 text-white rounded-md uppercase tracking-wider">
                    Save {discountPercent}%
                  </span>
                )}
                {/* Product Type Tag */}
                <div className="absolute bottom-3 left-3">
                  {isDigital ? (
                    <span className="px-2.5 py-1 bg-indigo-950/90 backdrop-blur-sm text-indigo-100 text-[11px] font-extrabold uppercase tracking-wide rounded-lg flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-indigo-400" /> Digital Product
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 bg-stone-950/90 backdrop-blur-sm text-stone-100 text-[11px] font-extrabold uppercase tracking-wide rounded-lg flex items-center gap-1">
                      <Box className="w-3 h-3 text-stone-400" /> Physical Product
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      aria-label={`View image ${idx + 1}`}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all min-h-[44px] ${
                        selectedImageIndex === idx
                          ? 'border-stone-900 shadow-md scale-95'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details Column */}
            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-stone-500 mb-2 flex-wrap gap-1">
                  <div className="flex items-center gap-2">
                    <span className="uppercase tracking-widest font-semibold text-stone-600">
                      {product.category.replace('-', ' ')}
                    </span>
                    {isDigital ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-indigo-100 text-indigo-900 border border-indigo-200">
                        <Sparkles className="w-2.5 h-2.5 text-indigo-600" />
                        Digital
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-stone-100 text-stone-800 border border-stone-200">
                        <Box className="w-2.5 h-2.5 text-stone-600" />
                        Physical
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-stone-600">SKU: {product.sku}</span>
                </div>

                <h2 id="quickview-title" className="text-xl sm:text-2xl font-bold text-stone-900 leading-tight">
                  {product.title}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
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
                  <span className="text-sm font-bold text-stone-800">{product.rating}</span>
                  <span className="text-xs text-stone-500">({product.reviewCount} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mt-4">
                  <span className="text-2xl font-extrabold text-stone-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-base text-stone-500 line-through">
                      {formatPrice(product.compareAtPrice)}
                    </span>
                  )}
                  {isDigital ? (
                    <span className="text-xs font-semibold text-indigo-800 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                      Instant Download
                    </span>
                  ) : product.stock > 0 ? (
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-300">
                      In Stock ({product.stock} available)
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-rose-800 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-300">
                      Out of Stock
                    </span>
                  )}
                </div>

                <p className="text-sm text-stone-600 mt-3 leading-relaxed">
                  {product.shortDescription || product.description}
                </p>

                {/* Digital Specs snippet if digital */}
                {isDigital && product.digitalDetails && (
                  <div className="mt-4 p-3 bg-indigo-50/70 border border-indigo-200/70 rounded-xl text-xs space-y-1 text-indigo-900">
                    <div className="font-bold flex items-center gap-1 text-[11px] uppercase tracking-wider text-indigo-950">
                      <Download className="w-3.5 h-3.5 text-indigo-600" /> Digital Deliverable
                    </div>
                    <div className="flex justify-between text-[11px] flex-wrap gap-1">
                      <span>Format: <strong>{product.digitalDetails.format}</strong></span>
                      {product.digitalDetails.fileSize && <span>Size: <strong>{product.digitalDetails.fileSize}</strong></span>}
                      {product.digitalDetails.license && <span>License: <strong>{product.digitalDetails.license}</strong></span>}
                    </div>
                  </div>
                )}

                {/* Color Selector */}
                {!isDigital && product.colors && product.colors.length > 0 && (
                  <div className="mt-5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                      Color: <span className="text-stone-900 font-normal">{selectedColor}</span>
                    </label>
                    <div className="flex gap-2.5">
                      {product.colors.map((color) => {
                        const isColorInStock = color.inStock !== false;
                        return (
                          <button
                            key={color.name}
                            type="button"
                            disabled={!isColorInStock}
                            aria-disabled={!isColorInStock}
                            onClick={() => isColorInStock && setSelectedColor(color.name)}
                            className={`group relative p-0.5 rounded-full border-2 transition-all min-w-[36px] min-h-[36px] flex items-center justify-center ${
                              !isColorInStock
                                ? 'opacity-40 cursor-not-allowed border-transparent'
                                : selectedColor === color.name
                                ? 'border-stone-900 scale-110 shadow-sm'
                                : 'border-transparent hover:border-stone-300'
                            }`}
                            title={isColorInStock ? color.name : `${color.name} (Out of Stock)`}
                            aria-label={`${color.name}${isColorInStock ? '' : ' - Out of Stock'}`}
                          >
                            <span
                              className="relative block w-6 h-6 rounded-full border border-stone-300/80 overflow-hidden"
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

                {/* Size Selector */}
                {!isDigital && product.sizes && product.sizes.length > 0 && (
                  <div className="mt-4">
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                      Size: <span className="text-stone-900 font-normal">{selectedSize}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all min-h-[44px] ${
                            selectedSize === size
                              ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                              : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-400'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Quantity & CTA */}
              <div className="mt-6 pt-5 border-t border-stone-200">
                <div className="flex items-center gap-3">
                  {/* Quantity (physical only) */}
                  {!isDigital && (
                    <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50 p-1">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        disabled={quantity <= 1}
                        aria-label="Decrease quantity"
                        className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-stone-600 hover:bg-white disabled:opacity-30 transition-colors"
                      >
                        -
                      </button>
                      <span className="w-9 text-center font-bold text-sm text-stone-900" aria-label={`Quantity ${quantity}`}>
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                        disabled={quantity >= product.stock}
                        aria-label="Increase quantity"
                        className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-stone-600 hover:bg-white disabled:opacity-30 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  )}

                  {/* Add to Cart */}
                  <button
                    id="quickview-add-to-cart"
                    onClick={handleAddToCart}
                    disabled={!isDigital && product.stock <= 0}
                    className="flex-1 min-h-[48px] py-3.5 px-5 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-300 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    {!isDigital && product.stock <= 0 ? 'Out of Stock' : isDigital ? 'Add Digital Asset' : 'Add to Bag'}
                  </button>

                  {/* Wishlist */}
                  <button
                    id="quickview-wishlist-toggle"
                    onClick={() => toggleWishlist(product.id)}
                    className={`min-w-[48px] min-h-[48px] p-3 rounded-xl border flex items-center justify-center transition-all ${
                      isSaved
                        ? 'bg-rose-50 border-rose-200 text-rose-600'
                        : 'border-stone-300 text-stone-600 hover:text-stone-900 hover:border-stone-500'
                    }`}
                    title={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
                    aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* View Full Details link */}
                <div className="flex items-center justify-between mt-4 text-xs text-stone-500 flex-wrap gap-2">
                  <span className="flex items-center gap-1.5 text-stone-600">
                    {isDigital ? (
                      <>
                        <Download className="w-3.5 h-3.5 text-indigo-600" /> Instant Download & License
                      </>
                    ) : (
                      <>
                        <Truck className="w-3.5 h-3.5 text-stone-700" /> Complimentary Global Courier
                      </>
                    )}
                  </span>
                  <button
                    onClick={() => {
                      setQuickViewProduct(null);
                      navigateToProduct(product.id);
                    }}
                    className="font-bold text-stone-900 hover:underline flex items-center gap-1 min-h-[36px]"
                  >
                    Full Product Specifications <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
