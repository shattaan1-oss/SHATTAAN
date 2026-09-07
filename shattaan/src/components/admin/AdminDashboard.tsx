'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '../../context/StoreContext';
import { Product, Order, Customer } from '../../types';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Plus,
  Edit2,
  Trash2,
  Search,
  CheckCircle2,
  AlertCircle,
  Truck,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  Sparkles,
  X,
  Eye,
  Sliders,
  RotateCcw,
  Tag,
  Layers,
  ArrowLeft,
} from 'lucide-react';

interface AdminDashboardProps {
  initialTab?: 'overview' | 'products' | 'orders' | 'customers' | 'dashboard' | 'settings';
  initialAction?: 'new';
  selectedProductId?: string;
  selectedOrderId?: string;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  initialTab = 'overview',
  initialAction,
  selectedProductId,
  selectedOrderId,
}) => {
  const {
    products,
    categories,
    orders,
    customers,
    formatPrice,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    addToast,
  } = useStore();

  const normalizedTab =
    initialTab === 'dashboard' ? 'overview' : (initialTab as 'overview' | 'products' | 'orders' | 'customers');

  const [adminTab, setAdminTab] = useState<'overview' | 'products' | 'orders' | 'customers'>(normalizedTab);

  // Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(
    initialAction === 'new' || !!selectedProductId
  );
  const [editingProductId, setEditingProductId] = useState<string | null>(selectedProductId || null);

  // Form Fields for Add/Edit Product
  const [title, setTitle] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState('apparel');
  const [price, setPrice] = useState<number>(250);
  const [compareAtPrice, setCompareAtPrice] = useState<number | undefined>(undefined);
  const [stock, setStock] = useState<number>(20);
  const [description, setDescription] = useState('');
  const [imagesInput, setImagesInput] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [tagsInput, setTagsInput] = useState('');

  // Search & Filter in Admin
  const [productSearch, setProductSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [selectedOrderForDetail, setSelectedOrderForDetail] = useState<Order | null>(null);

  // Calculate Metrics
  const totalRevenue = orders.reduce((acc, o) => acc + (o.paymentStatus === 'paid' ? o.total : 0), 0);
  const pendingOrders = orders.filter((o) => o.fulfillmentStatus === 'processing' || o.fulfillmentStatus === 'pending').length;
  const lowStockCount = products.filter((p) => p.stock <= 5).length;

  const openAddProductModal = () => {
    setEditingProductId(null);
    setTitle('');
    setSku(`SHT-${Math.floor(1000 + Math.random() * 9000)}`);
    setCategory('apparel');
    setPrice(350);
    setCompareAtPrice(undefined);
    setStock(15);
    setDescription('');
    setImagesInput('https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80');
    setIsFeatured(false);
    setTagsInput('Luxury, New Arrival, Limited Edition');
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (product: Product) => {
    setEditingProductId(product.id);
    setTitle(product.title);
    setSku(product.sku);
    setCategory(product.category);
    setPrice(product.price);
    setCompareAtPrice(product.compareAtPrice);
    setStock(product.stock);
    setDescription(product.description);
    setImagesInput(product.images.join('\n'));
    setIsFeatured(product.isFeatured);
    setTagsInput(product.tags.join(', '));
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !sku.trim()) return;

    const images = imagesInput
      .split('\n')
      .map((url) => url.trim())
      .filter((url) => url.length > 0);

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    if (editingProductId) {
      updateProduct(editingProductId, {
        title,
        sku,
        category,
        price,
        compareAtPrice: compareAtPrice || undefined,
        stock,
        description,
        images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80'],
        isFeatured,
        tags,
      });
    } else {
      const generatedSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      addProduct({
        title,
        slug: generatedSlug || `piece-${Date.now()}`,
        sku,
        category,
        type: 'physical',
        price,
        compareAtPrice: compareAtPrice || undefined,
        stock,
        shortDescription: description.slice(0, 120),
        description,
        images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80'],
        rating: 5.0,
        reviewCount: 0,
        isFeatured,
        tags,
      });
    }

    setIsProductModalOpen(false);
  };

  const filteredAdminProducts = products.filter((p) => {
    if (productSearch.trim()) {
      const q = productSearch.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const filteredAdminOrders = orders.filter((o) => {
    if (orderStatusFilter !== 'all' && o.fulfillmentStatus !== orderStatusFilter) {
      return false;
    }
    if (orderSearch.trim()) {
      const q = orderSearch.toLowerCase();
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.customer.name.toLowerCase().includes(q) ||
        o.customer.email.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Banner with Storefront Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-400 text-stone-950 uppercase tracking-widest">
              Live Store Admin
            </span>
            <span className="text-xs text-stone-500 font-mono">shattaan.com</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-950 mt-1">
            SHATTAAN Command Center
          </h1>
        </div>

        <Link
          href="/"
          className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors border border-stone-200 self-start sm:self-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit to Customer Storefront</span>
        </Link>
      </div>

      {/* Admin Nav Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 overflow-x-auto pb-px">
        <button
          onClick={() => setAdminTab('overview')}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-extrabold uppercase tracking-wider whitespace-nowrap transition-all ${
            adminTab === 'overview'
              ? 'text-stone-950 border-b-2 border-stone-950'
              : 'text-stone-400 hover:text-stone-700'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Overview</span>
        </button>

        <button
          onClick={() => setAdminTab('products')}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-extrabold uppercase tracking-wider whitespace-nowrap transition-all ${
            adminTab === 'products'
              ? 'text-stone-950 border-b-2 border-stone-950'
              : 'text-stone-400 hover:text-stone-700'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Products ({products.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('orders')}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-extrabold uppercase tracking-wider whitespace-nowrap transition-all ${
            adminTab === 'orders'
              ? 'text-stone-950 border-b-2 border-stone-950'
              : 'text-stone-400 hover:text-stone-700'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('customers')}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-extrabold uppercase tracking-wider whitespace-nowrap transition-all ${
            adminTab === 'customers'
              ? 'text-stone-950 border-b-2 border-stone-950'
              : 'text-stone-400 hover:text-stone-700'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Customers ({customers.length})</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW & ANALYTICS */}
      {adminTab === 'overview' && (
        <div className="space-y-8">
          {/* Key Metric Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-stone-500 uppercase tracking-wider">
                <span>Total Gross Sales</span>
                <DollarSign className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-extrabold text-stone-950">
                {formatPrice(totalRevenue)}
              </div>
              <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +18.4% this month
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-stone-500 uppercase tracking-wider">
                <span>Total Orders</span>
                <ShoppingBag className="w-4 h-4 text-stone-700" />
              </div>
              <div className="text-2xl font-extrabold text-stone-950">
                {orders.length}
              </div>
              <p className="text-[11px] text-stone-500">
                {pendingOrders} awaiting fulfillment
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-stone-500 uppercase tracking-wider">
                <span>Active Catalog Items</span>
                <Package className="w-4 h-4 text-stone-700" />
              </div>
              <div className="text-2xl font-extrabold text-stone-950">
                {products.length}
              </div>
              <p className="text-[11px] text-stone-500">
                Across {categories.length} luxury collections
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-stone-500 uppercase tracking-wider">
                <span>Low Inventory</span>
                <AlertCircle className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-2xl font-extrabold text-amber-700">
                {lowStockCount} Items
              </div>
              <p className="text-[11px] text-stone-500">
                Stock replenishment needed
              </p>
            </div>
          </div>

          {/* Quick Actions & Recent Orders Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Recent Orders List (7 Cols) */}
            <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h3 className="text-base font-bold text-stone-950">Recent Client Orders</h3>
                <button
                  onClick={() => setAdminTab('orders')}
                  className="text-xs font-bold text-stone-600 hover:text-stone-900 flex items-center gap-1"
                >
                  <span>View All</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="divide-y divide-stone-100">
                {orders.slice(0, 4).map((o) => (
                  <div key={o.id} className="py-3 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-mono font-bold text-stone-950 block">{o.orderNumber}</span>
                      <span className="text-stone-500">{o.customer.name} • {o.items.length} items</span>
                    </div>
                    <div className="text-right">
                      <span className="font-extrabold text-stone-950 block">{formatPrice(o.total)}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-stone-100 text-stone-800">
                        {o.fulfillmentStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Management Short-cuts (5 Cols) */}
            <div className="lg:col-span-5 bg-stone-50 p-6 rounded-3xl border border-stone-200 space-y-4">
              <h3 className="text-base font-bold text-stone-950">Quick Catalog Actions</h3>

              <div className="space-y-3">
                <button
                  onClick={openAddProductModal}
                  className="w-full py-3.5 px-4 bg-stone-950 hover:bg-stone-800 text-white rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Product</span>
                </button>

                <button
                  onClick={() => setAdminTab('orders')}
                  className="w-full py-3 px-4 bg-white hover:bg-stone-100 text-stone-900 border border-stone-300 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <Truck className="w-4 h-4" />
                  <span>Manage Dispatch Queue ({pendingOrders})</span>
                </button>

                <button
                  onClick={() => {
                    addToast('info', 'Cache Synced', 'All store inventory refreshed.');
                  }}
                  className="w-full py-3 px-4 bg-white hover:bg-stone-100 text-stone-900 border border-stone-300 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Sync Catalog Cache</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCT MANAGEMENT */}
      {adminTab === 'products' && (
        <div className="space-y-6">
          {/* Action Row: Search & Add Product */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Search products by title, SKU, or category..."
                className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-white border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <button
              onClick={openAddProductModal}
              className="px-5 py-2.5 bg-stone-950 hover:bg-stone-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors shadow-md shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>

          {/* Product Table */}
          <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase font-bold tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4">SKU</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Stock</th>
                    <th className="py-3 px-4">Featured</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-800">
                  {filteredAdminProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-stone-50/60 transition-colors">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <img
                          src={p.images[0]}
                          alt={p.title}
                          className="w-12 h-12 rounded-xl object-cover bg-stone-100 border border-stone-200 shrink-0"
                        />
                        <div className="max-w-xs">
                          <p className="font-bold text-stone-950 truncate">{p.title}</p>
                          <p className="text-[11px] text-stone-500 truncate">{p.description}</p>
                        </div>
                      </td>

                      <td className="py-3 px-4 font-mono font-bold text-stone-700">{p.sku}</td>

                      <td className="py-3 px-4">
                        <span className="px-2.5 py-1 rounded-md bg-stone-100 font-semibold text-stone-800 text-[11px]">
                          {p.category}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-extrabold text-stone-950">{formatPrice(p.price)}</span>
                        {p.compareAtPrice && (
                          <span className="text-[10px] text-stone-400 block line-through">
                            {formatPrice(p.compareAtPrice)}
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`font-bold font-mono px-2 py-0.5 rounded text-[11px] ${
                            p.stock <= 3
                              ? 'bg-red-100 text-red-800'
                              : p.stock <= 8
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {p.stock} in vault
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <button
                          onClick={() => updateProduct(p.id, { isFeatured: !p.isFeatured })}
                          className={`p-1 rounded-lg transition-colors ${
                            p.isFeatured ? 'text-amber-500' : 'text-stone-300 hover:text-stone-500'
                          }`}
                          title="Toggle featured status"
                        >
                          <Sparkles className="w-4 h-4 fill-current" />
                        </button>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditProductModal(p)}
                            className="p-2 text-stone-600 hover:text-stone-950 hover:bg-stone-100 rounded-lg transition-colors"
                            title="Edit Product"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ORDER MANAGEMENT */}
      {adminTab === 'orders' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                placeholder="Search orders by number, client name, or email..."
                className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-white border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto">
              {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                <button
                  key={status}
                  onClick={() => setOrderStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                    orderStatusFilter === status
                      ? 'bg-stone-900 text-white'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase font-bold tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Order #</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Items</th>
                    <th className="py-3 px-4">Total</th>
                    <th className="py-3 px-4">Payment</th>
                    <th className="py-3 px-4">Fulfillment Status</th>
                    <th className="py-3 px-4 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-800">
                  {filteredAdminOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-stone-50/60 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-stone-950">
                        {order.orderNumber}
                      </td>

                      <td className="py-3 px-4 text-stone-500 font-mono">
                        {new Date(order.date).toLocaleDateString()}
                      </td>

                      <td className="py-3 px-4">
                        <p className="font-bold text-stone-900">{order.customer.name}</p>
                        <p className="text-[11px] text-stone-400">{order.customer.email}</p>
                      </td>

                      <td className="py-3 px-4 font-semibold">
                        {order.items.reduce((s, i) => s + i.quantity, 0)} pcs
                      </td>

                      <td className="py-3 px-4 font-extrabold text-stone-950">
                        {formatPrice(order.total)}
                      </td>

                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                          {order.paymentStatus}
                        </span>
                      </td>

                      {/* Dropdown status modifier */}
                      <td className="py-3 px-4">
                        <select
                          value={order.fulfillmentStatus}
                          onChange={(e) =>
                            updateOrderStatus(
                              order.id,
                              e.target.value as any,
                              order.paymentStatus,
                              order.trackingNumber || `DHL-${Math.floor(1000000 + Math.random() * 9000000)}`
                            )
                          }
                          className="px-2.5 py-1 text-xs font-bold rounded-lg border border-stone-300 bg-white focus:outline-none focus:border-stone-900 cursor-pointer"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing (In Vault)</option>
                          <option value="shipped">Shipped (In Transit)</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setSelectedOrderForDetail(order)}
                          className="p-2 text-stone-600 hover:text-stone-950 hover:bg-stone-100 rounded-lg transition-colors"
                          title="View Order Breakdown"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CUSTOMERS DIRECTORY */}
      {adminTab === 'customers' && (
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="p-5 border-b border-stone-200">
            <h3 className="text-base font-bold text-stone-950">Registered VIP Patrons</h3>
            <p className="text-xs text-stone-500">Clients registered on shattaan.com</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase font-bold tracking-wider">
                <tr>
                  <th className="py-3 px-4">Client Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Joined Date</th>
                  <th className="py-3 px-4">Lifetime Orders</th>
                  <th className="py-3 px-4 text-right">Total Spent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-800">
                {customers.map((c) => (
                  <tr key={c.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-3 px-4 font-bold text-stone-950">{c.name}</td>
                    <td className="py-3 px-4 font-mono text-stone-600">{c.email}</td>
                    <td className="py-3 px-4 font-mono text-stone-600">{c.phone || '—'}</td>
                    <td className="py-3 px-4 text-stone-500">{c.joinedDate}</td>
                    <td className="py-3 px-4 font-bold">{c.totalOrders} purchases</td>
                    <td className="py-3 px-4 text-right font-extrabold text-stone-950">
                      {formatPrice(c.totalSpent)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ADD / EDIT PRODUCT MODAL */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm"
            onClick={() => setIsProductModalOpen(false)}
          />
          <div className="relative bg-white w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl z-10 border border-stone-200 space-y-6">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="text-lg font-bold text-stone-950">
                {editingProductId ? 'Edit Product Details' : 'Add New Luxury Piece'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="text-stone-400 hover:text-stone-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-800 mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Cashmere Chesterfield Overcoat"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-800 mb-1">SKU Reference *</label>
                  <input
                    type="text"
                    required
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="e.g. SHT-9014"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl font-mono focus:outline-none focus:border-stone-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-stone-800 mb-1">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900"
                  >
                    {categories.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-800 mb-1">Selling Price ($ USD) *</label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-800 mb-1">Compare Price (Optional)</label>
                  <input
                    type="number"
                    min="1"
                    value={compareAtPrice || ''}
                    onChange={(e) => setCompareAtPrice(e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="e.g. 450"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-800 mb-1">Inventory Vault Stock *</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      className="w-4 h-4 accent-stone-900 rounded"
                    />
                    <span className="font-bold text-stone-800">Feature on Homepage Hero & Showcase</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-800 mb-1">Image URLs (One per line)</label>
                <textarea
                  rows={3}
                  value={imagesInput}
                  onChange={(e) => setImagesInput(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl font-mono text-[11px] focus:outline-none focus:border-stone-900"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-800 mb-1">Tags (Comma-separated)</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="Cashmere, Italian, Tailored, Winter"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-800 mb-1">Artisan Description & Story *</label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Craftsmanship details, materials, tailoring notes..."
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3.5 bg-stone-950 hover:bg-stone-800 text-white rounded-xl font-bold uppercase tracking-wider transition-colors shadow-md"
                >
                  {editingProductId ? 'Save Product Changes' : 'Publish Product to Store'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-6 py-3.5 bg-stone-200 text-stone-800 rounded-xl font-bold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ORDER DETAIL BREAKDOWN MODAL */}
      {selectedOrderForDetail && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm"
            onClick={() => setSelectedOrderForDetail(null)}
          />
          <div className="relative bg-white w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl z-10 border border-stone-200 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <h3 className="text-base font-bold text-stone-950">
                  Order #{selectedOrderForDetail.orderNumber}
                </h3>
                <p className="text-[11px] text-stone-500">{new Date(selectedOrderForDetail.date).toLocaleString()}</p>
              </div>
              <button
                onClick={() => setSelectedOrderForDetail(null)}
                className="text-stone-400 hover:text-stone-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Recipient & Address */}
            <div className="bg-stone-50 p-4 rounded-2xl text-xs space-y-1">
              <p className="font-bold text-stone-900">{selectedOrderForDetail.customer.name}</p>
              <p className="text-stone-600">{selectedOrderForDetail.customer.email}</p>
              <p className="text-stone-600">{selectedOrderForDetail.customer.shippingAddress.addressLine1}</p>
              <p className="text-stone-600">
                {selectedOrderForDetail.customer.shippingAddress.city},{' '}
                {selectedOrderForDetail.customer.shippingAddress.country}
              </p>
            </div>

            {/* Items */}
            <div className="divide-y divide-stone-100 max-h-56 overflow-y-auto">
              {selectedOrderForDetail.items.map((it, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img src={it.image} alt="" className="w-10 h-10 rounded-lg object-cover bg-stone-100" />
                    <div>
                      <p className="font-bold text-stone-900">{it.title}</p>
                      <p className="text-[11px] text-stone-500">Qty: {it.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-stone-950">{formatPrice(it.price * it.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-stone-200 flex justify-between font-extrabold text-sm text-stone-950">
              <span>Grand Total</span>
              <span>{formatPrice(selectedOrderForDetail.total)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
