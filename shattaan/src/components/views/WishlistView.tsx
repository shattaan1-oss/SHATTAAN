'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';
import { Heart, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';

export const WishlistView: React.FC = () => {
  const { wishlist, products, addToCart, clearWishlist, addToast } = useStore();

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const handleAddAllToCart = () => {
    let count = 0;
    wishlistProducts.forEach((p) => {
      if (p.stock > 0) {
        addToCart(p, 1, p.colors?.[0]?.name, p.sizes?.[0]);
        count++;
      }
    });
    if (count > 0) {
      addToast('success', 'Wishlist Transferred', `Added ${count} items to your shopping bag.`);
    }
  };

  if (wishlistProducts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
          <Heart className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-stone-950">Your Wishlist is Empty</h1>
        <p className="text-sm text-stone-500 max-w-md mx-auto leading-relaxed">
          Save timeless items you love to your personal curation by clicking the heart icon on any product card.
        </p>
        <Link
          href="/shop"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-8 py-3.5 bg-stone-950 hover:bg-stone-800 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-colors inline-flex items-center gap-2"
        >
          <span>Explore Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="border-b border-stone-200 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-stone-500 block mb-1">
            Personal Collection
          </span>
          <h1 className="text-3xl font-extrabold text-stone-950">
            Saved Wishlist ({wishlistProducts.length})
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAddAllToCart}
            className="px-5 py-2.5 bg-stone-950 hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center gap-2 transition-colors shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add Available to Bag</span>
          </button>

          <button
            onClick={clearWishlist}
            className="px-3.5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Grid of Wishlist Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
