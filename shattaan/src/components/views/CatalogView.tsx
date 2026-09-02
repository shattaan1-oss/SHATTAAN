'use client';

import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';
import {
  Filter,
  SlidersHorizontal,
  Grid3X3,
  List,
  Search,
  X,
  ChevronDown,
  Sparkles,
  ArrowUpDown,
  RotateCcw,
  Box,
  Layers,
} from 'lucide-react';

interface CatalogViewProps {
  initialCategory?: string;
}

export const CatalogView: React.FC<CatalogViewProps> = ({ initialCategory }) => {
  const {
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    formatPrice,
    setCurrentView,
  } = useStore();

  const currentActiveCategory = initialCategory || selectedCategory;

  const [productTypeFilter, setProductTypeFilter] = useState<'all' | 'digital' | 'physical'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [products]);

  // Product counts by type
  const typeCounts = useMemo(() => {
    const digital = products.filter((p) => p.type === 'digital').length;
    const physical = products.filter((p) => p.type === 'physical').length;
    return { all: products.length, digital, physical };
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Product Type Filter (All / Digital / Physical)
        if (productTypeFilter !== 'all' && product.type !== productTypeFilter) {
          return false;
        }
        // Category filter
        if (currentActiveCategory && product.category !== currentActiveCategory) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = product.title.toLowerCase().includes(q);
          const matchDesc = product.description.toLowerCase().includes(q);
          const matchCategory = product.category.toLowerCase().includes(q);
          const matchType = product.type.toLowerCase().includes(q);
          const matchTag = product.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchTitle && !matchDesc && !matchCategory && !matchType && !matchTag) {
            return false;
          }
        }
        // Price range
        if (product.price < minPrice || product.price > maxPrice) {
          return false;
        }
        // In stock
        if (inStockOnly && product.stock <= 0) {
          return false;
        }
        // Rating
        if (minRating > 0 && product.rating < minRating) {
          return false;
        }
        // Tag
        if (selectedTag && !product.tags.includes(selectedTag)) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, productTypeFilter, selectedCategory, searchQuery, minPrice, maxPrice, inStockOnly, minRating, selectedTag, sortBy]);

  const resetAllFilters = () => {
    setProductTypeFilter('all');
    setSelectedCategory(null);
    setSearchQuery('');
    setMinPrice(0);
    setMaxPrice(2000);
    setInStockOnly(false);
    setMinRating(0);
    setSelectedTag(null);
    setSortBy('featured');
  };

  const hasActiveFilters =
    productTypeFilter !== 'all' ||
    selectedCategory !== null ||
    searchQuery.trim() !== '' ||
    minPrice > 0 ||
    maxPrice < 2000 ||
    inStockOnly ||
    minRating > 0 ||
    selectedTag !== null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header & Title */}
      <div className="border-b border-stone-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 uppercase tracking-widest mb-1">
            <button onClick={() => setCurrentView('home')} className="hover:text-stone-900">
              Home
            </button>
            <span>/</span>
            <span className="text-stone-900">
              {selectedCategory
                ? categories.find((c) => c.slug === selectedCategory)?.name || 'Category'
                : 'All Products'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-950">
            {selectedCategory
              ? categories.find((c) => c.slug === selectedCategory)?.name
              : 'Marketplace Catalog'}
          </h1>
          <p className="text-xs text-stone-500 mt-1 max-w-xl">
            {selectedCategory
              ? categories.find((c) => c.slug === selectedCategory)?.description
              : 'Explore our master-crafted collection of physical luxury pieces and instant digital creative assets.'}
          </p>
        </div>

        {/* Action Controls: Layout & Sort */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Mobile filter toggle */}
          <button
            id="mobile-filter-toggle"
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="lg:hidden min-h-[44px] px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl border border-stone-200 flex items-center gap-2"
            aria-label="Toggle Catalog Filters"
          >
            <Filter className="w-4 h-4" />
            <span>Filters {hasActiveFilters && '• Active'}</span>
          </button>

          {/* Sort Dropdown */}
          <div className="relative inline-block">
            <select
              id="catalog-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="appearance-none pl-3.5 pr-8 py-2.5 bg-white text-xs font-bold text-stone-800 rounded-xl border border-stone-300 focus:outline-none focus:border-stone-900 cursor-pointer shadow-xs min-h-[44px]"
              aria-label="Sort catalog products"
            >
              <option value="featured">Sort: Curated Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest Arrivals</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-stone-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Grid/List View Toggles */}
          <div className="hidden sm:flex items-center p-1 bg-stone-100 rounded-xl border border-stone-200">
            <button
              id="layout-toggle-grid"
              onClick={() => setLayout('grid')}
              className={`p-2 rounded-lg transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center ${
                layout === 'grid' ? 'bg-white shadow-xs text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-700'
              }`}
              title="Grid View"
              aria-label="Grid View"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              id="layout-toggle-list"
              onClick={() => setLayout('list')}
              className={`p-2 rounded-lg transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center ${
                layout === 'list' ? 'bg-white shadow-xs text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-700'
              }`}
              title="List View"
              aria-label="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Type & Category Controls */}
      <div className="space-y-3">
        {/* Product Type Segmented Filter (All / Digital / Physical) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <div className="inline-flex p-1 bg-stone-100 border border-stone-200 rounded-2xl">
            <button
              id="filter-type-all"
              onClick={() => setProductTypeFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap min-h-[40px] ${
                productTypeFilter === 'all'
                  ? 'bg-white text-stone-950 shadow-xs border border-stone-200/80'
                  : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All Products</span>
              <span className="ml-1 text-[11px] font-mono text-stone-400">({typeCounts.all})</span>
            </button>

            <button
              id="filter-type-digital"
              onClick={() => setProductTypeFilter('digital')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap min-h-[40px] ${
                productTypeFilter === 'digital'
                  ? 'bg-indigo-950 text-indigo-100 shadow-xs'
                  : 'text-stone-600 hover:text-indigo-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Digital Products</span>
              <span className="ml-1 text-[11px] font-mono opacity-80">({typeCounts.digital})</span>
            </button>

            <button
              id="filter-type-physical"
              onClick={() => setProductTypeFilter('physical')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap min-h-[40px] ${
                productTypeFilter === 'physical'
                  ? 'bg-stone-900 text-stone-100 shadow-xs'
                  : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              <Box className="w-3.5 h-3.5 text-stone-400" />
              <span>Physical Products</span>
              <span className="ml-1 text-[11px] font-mono opacity-80">({typeCounts.physical})</span>
            </button>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            id="filter-cat-all"
            onClick={() => setSelectedCategory(null)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all min-h-[36px] ${
              selectedCategory === null
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => {
            const count = products.filter((p) => {
              const matchCat = p.category === cat.slug;
              const matchType = productTypeFilter === 'all' || p.type === productTypeFilter;
              return matchCat && matchType;
            }).length;
            return (
              <button
                key={cat.id}
                id={`filter-cat-${cat.slug}`}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all min-h-[36px] ${
                  selectedCategory === cat.slug
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Sidebar Filters */}
        <aside
          className={`lg:block ${
            isMobileFilterOpen ? 'block fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : 'hidden'
          } lg:relative lg:bg-transparent lg:p-0 space-y-6 bg-white lg:border-r lg:border-stone-200 lg:pr-6`}
        >
          {isMobileFilterOpen && (
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 lg:hidden">
              <h3 className="font-bold text-base text-stone-900">Filter Products</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2 text-stone-500 hover:text-stone-900 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Active Filters Header & Reset */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Filter Results
            </span>
            {hasActiveFilters && (
              <button
                id="reset-filters-btn"
                onClick={resetAllFilters}
                className="text-xs text-amber-800 hover:text-amber-900 font-semibold flex items-center gap-1 min-h-[36px]"
              >
                <RotateCcw className="w-3 h-3" /> Reset All
              </button>
            )}
          </div>

          {/* Product Type Filter (Sidebar Section) */}
          <div className="space-y-2 pt-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-900">
              Product Classification
            </label>
            <div className="space-y-1.5">
              {[
                { id: 'all', label: 'All Items', count: typeCounts.all },
                { id: 'digital', label: 'Digital Products', count: typeCounts.digital },
                { id: 'physical', label: 'Physical Products', count: typeCounts.physical },
              ].map((opt) => (
                <button
                  key={opt.id}
                  id={`sidebar-type-${opt.id}`}
                  onClick={() => setProductTypeFilter(opt.id as any)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors min-h-[40px] ${
                    productTypeFilter === opt.id
                      ? opt.id === 'digital'
                        ? 'bg-indigo-950 text-white shadow-xs'
                        : 'bg-stone-900 text-white shadow-xs'
                      : 'text-stone-700 hover:bg-stone-100 border border-stone-200/60'
                  }`}
                >
                  <span>{opt.label}</span>
                  <span className={`text-[11px] font-mono ${productTypeFilter === opt.id ? 'opacity-80' : 'text-stone-400'}`}>
                    ({opt.count})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Search Input in Sidebar */}
          <div className="pt-4 border-t border-stone-200">
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">Search Keywords</label>
            <div className="relative">
              <input
                id="sidebar-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search catalog..."
                className="w-full pl-8 pr-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900 min-h-[40px]"
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-2 pt-4 border-t border-stone-200">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-900">
              Price Range (Up to {formatPrice(maxPrice)})
            </label>
            <input
              id="price-range-slider"
              type="range"
              min="0"
              max="2000"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-stone-900 cursor-pointer"
            />
            <div className="flex items-center justify-between text-xs text-stone-500 font-mono">
              <span>{formatPrice(0)}</span>
              <span>{formatPrice(maxPrice)}</span>
            </div>
          </div>

          {/* In-Stock Filter Toggle */}
          <div className="pt-4 border-t border-stone-200">
            <label className="flex items-center justify-between cursor-pointer min-h-[40px]">
              <span className="text-xs font-semibold text-stone-800">In-Stock Items Only</span>
              <input
                id="instock-only-toggle"
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 rounded accent-stone-900 cursor-pointer"
              />
            </label>
          </div>

          {/* Rating Filter */}
          <div className="space-y-2 pt-4 border-t border-stone-200">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-900">
              Minimum Rating
            </label>
            <div className="space-y-1.5">
              {[0, 4.5, 4.8, 5.0].map((rate) => (
                <button
                  key={rate}
                  id={`rating-filter-${rate}`}
                  onClick={() => setMinRating(rate)}
                  className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors min-h-[36px] ${
                    minRating === rate
                      ? 'bg-stone-900 text-white'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <span>{rate === 0 ? 'All Ratings' : `${rate} Stars & Higher`}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Popular Tag Badges */}
          <div className="space-y-2 pt-4 border-t border-stone-200">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-900">
              Tags & Features
            </label>
            <div className="flex flex-wrap gap-1.5">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  id={`tag-filter-${tag.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className={`px-2.5 py-1.5 rounded-md text-[11px] font-semibold transition-all min-h-[32px] ${
                    selectedTag === tag
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {isMobileFilterOpen && (
            <div className="pt-6 lg:hidden">
              <button
                id="apply-mobile-filters-btn"
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full min-h-[44px] py-3 bg-stone-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md"
              >
                Apply Filters ({filteredProducts.length} Items)
              </button>
            </div>
          )}
        </aside>

        {/* Product Grid Area */}
        <main className="lg:col-span-3 space-y-6">
          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 p-3 bg-stone-100 rounded-xl border border-stone-200 text-xs">
              <span className="font-semibold text-stone-500">Active filters:</span>
              {productTypeFilter !== 'all' && (
                <span className="px-2.5 py-1 bg-white border border-stone-300 rounded-md font-bold text-stone-800 flex items-center gap-1.5">
                  Type: {productTypeFilter === 'digital' ? 'Digital Products' : 'Physical Products'}
                  <button
                    onClick={() => setProductTypeFilter('all')}
                    aria-label="Remove type filter"
                  >
                    <X className="w-3.5 h-3.5 text-stone-400 hover:text-stone-800" />
                  </button>
                </span>
              )}
              {selectedCategory && (
                <span className="px-2.5 py-1 bg-white border border-stone-300 rounded-md font-bold text-stone-800 flex items-center gap-1.5">
                  Category: {categories.find((c) => c.slug === selectedCategory)?.name}
                  <button
                    onClick={() => setSelectedCategory(null)}
                    aria-label="Remove category filter"
                  >
                    <X className="w-3.5 h-3.5 text-stone-400 hover:text-stone-800" />
                  </button>
                </span>
              )}
              {searchQuery.trim() && (
                <span className="px-2.5 py-1 bg-white border border-stone-300 rounded-md font-bold text-stone-800 flex items-center gap-1.5">
                  Search: "{searchQuery}"
                  <button
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search filter"
                  >
                    <X className="w-3.5 h-3.5 text-stone-400 hover:text-stone-800" />
                  </button>
                </span>
              )}
              {maxPrice < 2000 && (
                <span className="px-2.5 py-1 bg-white border border-stone-300 rounded-md font-bold text-stone-800 flex items-center gap-1.5">
                  Max: {formatPrice(maxPrice)}
                  <button
                    onClick={() => setMaxPrice(2000)}
                    aria-label="Reset max price"
                  >
                    <X className="w-3.5 h-3.5 text-stone-400 hover:text-stone-800" />
                  </button>
                </span>
              )}
              {inStockOnly && (
                <span className="px-2.5 py-1 bg-white border border-stone-300 rounded-md font-bold text-stone-800 flex items-center gap-1.5">
                  In Stock Only
                  <button
                    onClick={() => setInStockOnly(false)}
                    aria-label="Clear in stock filter"
                  >
                    <X className="w-3.5 h-3.5 text-stone-400 hover:text-stone-800" />
                  </button>
                </span>
              )}
              {minRating > 0 && (
                <span className="px-2.5 py-1 bg-white border border-stone-300 rounded-md font-bold text-stone-800 flex items-center gap-1.5">
                  Rating: {minRating}+ Stars
                  <button
                    onClick={() => setMinRating(0)}
                    aria-label="Reset rating filter"
                  >
                    <X className="w-3.5 h-3.5 text-stone-400 hover:text-stone-800" />
                  </button>
                </span>
              )}
              {selectedTag && (
                <span className="px-2.5 py-1 bg-white border border-stone-300 rounded-md font-bold text-stone-800 flex items-center gap-1.5">
                  Tag: {selectedTag}
                  <button
                    onClick={() => setSelectedTag(null)}
                    aria-label="Remove tag filter"
                  >
                    <X className="w-3.5 h-3.5 text-stone-400 hover:text-stone-800" />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Results Count */}
          <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
            <span>
              Showing <strong className="text-stone-900">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'piece' : 'pieces'} in catalog
            </span>
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-stone-900">No matching products found</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
                We couldn't find any pieces matching your specified filters. Try switching product type, widening your price range, or clearing active filters.
              </p>
              <button
                id="empty-reset-filters-btn"
                onClick={resetAllFilters}
                className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors min-h-[44px]"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div
              className={
                layout === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} layout={layout} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
