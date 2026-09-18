'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import {
  Product,
  Category,
  CartItem,
  Order,
OrderItem,
  Customer,
  Review,
  DiscountCode,
  AdminTab,
  CurrencyCode,
  OrderStatus,
  PaymentStatus,
  Address
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_ORDERS,
  INITIAL_CUSTOMERS,
  INITIAL_REVIEWS,
  INITIAL_DISCOUNT_CODES,
  SAMPLE_CUSTOMER
} from '../data/initialData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}

export interface StoreContextType {
  // Navigation & View Selection State
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  adminTab: AdminTab;
  setAdminTab: (tab: AdminTab) => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Currency
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (amountInUSD: number) => string;

  // Products
  products: Product[];
  addProduct: (
  product: Omit<Product, 'id' | 'createdAt'>
) => Promise<Product | null>;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateStock: (id: string, newStock: number) => void;
  categories: Category[];

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string, selectedSize?: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartCount: number;
  freeShippingThreshold: number;
  hasPhysicalItems: boolean;
  hasDigitalItems: boolean;
  isDigitalOnly: boolean;

  // Discounts
  appliedDiscount: DiscountCode | null;
  applyDiscountCode: (code: string) => { success: boolean; message: string };
  removeDiscountCode: () => void;
  discountAmount: number;
  taxAmount: number;
  shippingAmount: number;
  cartTotal: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;

  // Orders
  orders: Order[];
  placeOrder: (orderData: {
    customer: {
      name: string;
      email: string;
      phone: string;
      shippingAddress: Address;
    };
    paymentMethod: string;
    notes?: string;
  }) => Promise<Order | null>;
  updateOrderStatus: (orderId: string, status: OrderStatus, trackingNumber?: string, carrier?: string) => void;
  updatePaymentStatus: (orderId: string, status: PaymentStatus) => void;
  recentOrder: Order | null;
  setRecentOrder: (order: Order | null) => void;

  // Reviews
  reviews: Review[];
  getProductReviews: (productId: string) => Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;

  // Customers & User
  customers: Customer[];
  currentUser: Customer;
  setCurrentUser: (customer: Customer) => void;
  updateCustomerProfile: (updates: Partial<Customer>) => void;

  // Toasts / Notifications
  toasts: ToastMessage[];
  addToast: (type: ToastMessage['type'], title: string, message: string) => void;
  removeToast: (id: string) => void;

  // Utilities
  resetToSampleData: () => void;
}

const CURRENCY_RATES: Record<CurrencyCode, { symbol: string; rate: number; prefix: boolean }> = {
  USD: { symbol: '$', rate: 1.0, prefix: true },
  EUR: { symbol: '€', rate: 0.92, prefix: false },
  GBP: { symbol: '£', rate: 0.79, prefix: true },
  AED: { symbol: 'AED ', rate: 3.67, prefix: true },
  CAD: { symbol: 'CA$', rate: 1.36, prefix: true },
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [adminTab, setAdminTab] = useState<AdminTab>('dashboard');
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [hasHydrated, setHasHydrated] = useState<boolean>(false);

  // Currency persistence
  const [currency, setCurrencyState] = useState<CurrencyCode>('USD');

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyState(code);
    try {
      localStorage.setItem('shattaan_currency', code);
    } catch (e) {
      console.error(e);
    }
  };

  // Persistence - Products
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const categories = INITIAL_CATEGORIES;

  // Persistence - Cart
  const [cart, setCart] = useState<CartItem[]>([]);

  // Persistence - Wishlist (array of product IDs)
  const [wishlist, setWishlist] = useState<string[]>(['sht-001', 'sht-002']);

  // Persistence - Orders
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

  // Persistence - Customers
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);

  // Persistence - Reviews
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);

  // Current User
  const [currentUser, setCurrentUser] = useState<Customer>(SAMPLE_CUSTOMER);
  const [recentOrder, setRecentOrder] = useState<Order | null>(null);
  const [appliedDiscount, setAppliedDiscount] = useState<DiscountCode | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Hydration effect: Load stored data on client mount to prevent SSR mismatch
  useEffect(() => {
    setHasHydrated(true);
    try {
      const savedCurrency = localStorage.getItem('shattaan_currency');
      const validCurrencies: CurrencyCode[] = ['USD', 'EUR', 'GBP', 'AED', 'CAD'];
      if (savedCurrency && validCurrencies.includes(savedCurrency as CurrencyCode)) {
        setCurrencyState(savedCurrency as CurrencyCode);
      }

      const savedWishlist = localStorage.getItem('shattaan_wishlist');
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }

      const savedCart = localStorage.getItem('shattaan_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }

      const savedProducts = localStorage.getItem('shattaan_products');
      if (savedProducts) {
        const parsed: Product[] = JSON.parse(savedProducts);
        const migrated = parsed.map((p) => {
          if (!p.type) {
            const matched = INITIAL_PRODUCTS.find((init) => init.id === p.id);
            return {
              ...p,
              type: (matched?.type || 'physical') as Product['type'],
              digitalDetails: p.digitalDetails || matched?.digitalDetails,
              physicalDetails: p.physicalDetails || matched?.physicalDetails,
            };
          }
          return p;
        });
        const existingIds = new Set(migrated.map((p) => p.id));
        const missingInitial = INITIAL_PRODUCTS.filter((init) => !existingIds.has(init.id));
        setProducts([...migrated, ...missingInitial]);

            }

      const savedCustomers = localStorage.getItem('shattaan_customers');
      if (savedCustomers) {
        setCustomers(JSON.parse(savedCustomers));
      }

      const savedReviews = localStorage.getItem('shattaan_reviews');
      if (savedReviews) {
        setReviews(JSON.parse(savedReviews));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);
  // Load products from the real PostgreSQL database
  useEffect(() => {
    if (!hasHydrated) return;

    let cancelled = false;

    const loadDatabaseProducts = async () => {
      try {
        const response = await fetch('/api/products', {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`Products API returned ${response.status}`);
        }

        const databaseProducts: Product[] = await response.json();

        if (!cancelled && databaseProducts.length > 0) {
          setProducts(databaseProducts);
        }
      } catch (error) {
        console.error('Failed to load database products:', error);
      }
    };

    loadDatabaseProducts();

    return () => {
      cancelled = true;
    };
  }, [hasHydrated]);
// Load orders from the real PostgreSQL database
useEffect(() => {
  if (!hasHydrated) return;

  let cancelled = false;

  const loadDatabaseOrders = async () => {
    try {
      const response = await fetch('/api/orders', {
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error(`Orders API returned ${response.status}`);
      }

      const databaseOrders = await response.json();

      if (!cancelled) {
  setOrders(databaseOrders);

  const currentCustomer = databaseOrders.find(
    (order: Order) => order.customer?.id === currentUser.id
  )?.customer;

  if (currentCustomer) {
    setCurrentUser((prev) => ({
      ...prev,
      totalOrders: currentCustomer.totalOrders,
      totalSpent: Number(currentCustomer.totalSpent),
    }));
  }
}
    } catch (error) {
      console.error('Failed to load database orders:', error);
    }
  };

  loadDatabaseOrders();

  return () => {
    cancelled = true;
  };
}, [hasHydrated]);
 // Load customers from the real PostgreSQL database
useEffect(() => {
  if (!hasHydrated) return;

  let cancelled = false;

  const loadDatabaseCustomers = async () => {
    try {
      const response = await fetch('/api/customer', {
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error(`Customers API returned ${response.status}`);
      }

      const databaseCustomers = await response.json();

      if (!cancelled) {
        setCustomers(databaseCustomers);
      }
    } catch (error) {
      console.error('Failed to load database customers:', error);
    }
  };

  loadDatabaseCustomers();

  return () => {
    cancelled = true;
  };
}, [hasHydrated]);
// Sync to local storage only after hydration
  useEffect(() => {
    if (!hasHydrated) return;
    try {
      localStorage.setItem('shattaan_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products, hasHydrated]);

  useEffect(() => {
    if (!hasHydrated) return;
    try {
      localStorage.setItem('shattaan_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart, hasHydrated]);

  useEffect(() => {
    if (!hasHydrated) return;
    try {
      localStorage.setItem('shattaan_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist, hasHydrated]);

  
  useEffect(() => {
    if (!hasHydrated) return;
    try {
      localStorage.setItem('shattaan_customers', JSON.stringify(customers));
    } catch (e) {
      console.error(e);
    }
  }, [customers, hasHydrated]);

  useEffect(() => {
    if (!hasHydrated) return;
    try {
      localStorage.setItem('shattaan_reviews', JSON.stringify(reviews));
    } catch (e) {
      console.error(e);
    }
  }, [reviews, hasHydrated]);

  // Toast manager
  const addToast = (type: ToastMessage['type'], title: string, message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Price Formatter
  const formatPrice = (amountInUSD: number): string => {
    const config = CURRENCY_RATES[currency];
    const converted = amountInUSD * config.rate;
    const formatted = converted.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return config.prefix ? `${config.symbol}${formatted}` : `${formatted} ${config.symbol}`;
  };

  // Product CRUD
  const addProduct = async (
  newProdData: Omit<Product, 'id' | 'createdAt'>
): Promise<Product | null> => {
  try {
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProdData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to create product');
    }

    const newProduct: Product = {
      ...data,
      category: data.category?.id ?? newProdData.category,
      createdAt: data.createdAt ?? new Date().toISOString(),
    };

    setProducts((prev) => [newProduct, ...prev]);

    addToast(
      'success',
      'Product Created',
      `"${newProduct.title}" was added to the catalog.`
    );

    return newProduct;
  } catch (error) {
    console.error('Failed to create product:', error);

    addToast(
      'error',
      'Product Creation Failed',
      error instanceof Error
        ? error.message
        : 'The product could not be saved.'
    );

    return null;
  }
};

  const updateProduct = async (
  id: string,
  updates: Partial<Product>
): Promise<void> => {
  try {
    const response = await fetch(`/api/products/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to update product');
    }

    const updatedProduct: Product = {
      ...data,
      category: data.category?.id ?? updates.category,
      createdAt: data.createdAt ?? new Date().toISOString(),
    };

    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p))
    );

    addToast(
      'success',
      'Product Updated',
      'Changes were saved successfully.'
    );
  } catch (error) {
    console.error('Failed to update product:', error);

    addToast(
      'error',
      'Product Update Failed',
      error instanceof Error
        ? error.message
        : 'The product could not be updated.'
    );
  }
};

  const deleteProduct = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to delete product');
    }

    const prod = products.find((p) => p.id === id);

    setProducts((prev) => prev.filter((p) => p.id !== id));

    // Also remove from cart & wishlist if deleted
    setCart((prev) => prev.filter((item) => item.productId !== id));
    setWishlist((prev) => prev.filter((wId) => wId !== id));

    addToast(
      'info',
      'Product Removed',
      `"${prod?.title || 'Product'}" has been deleted.`
    );
  } catch (error) {
    console.error('Failed to delete product:', error);

    addToast(
      'error',
      'Product Deletion Failed',
      error instanceof Error
        ? error.message
        : 'The product could not be deleted.'
    );
  }
};

  const updateStock = async (
  id: string,
  newStock: number
): Promise<void> => {
  try {
    const response = await fetch(`/api/products/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        stock: Math.max(0, newStock),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to update inventory');
    }

    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, stock: Math.max(0, newStock) }
          : p
      )
    );

    addToast(
      'info',
      'Inventory Adjusted',
      `Stock level updated to ${Math.max(0, newStock)} units.`
    );
  } catch (error) {
    console.error('Failed to update inventory:', error);

    addToast(
      'error',
      'Inventory Update Failed',
      error instanceof Error
        ? error.message
        : 'The stock level could not be updated.'
    );
  }
};

  // Cart operations
  const addToCart = (
    product: Product,
    quantity: number = 1,
    selectedColor?: string,
    selectedSize?: string
  ) => {
    if (product.stock <= 0) {
      addToast('error', 'Out of Stock', 'This item is currently unavailable.');
      return;
    }

    const defaultColor = selectedColor || product.colors?.[0]?.name;
    const defaultSize = selectedSize || product.sizes?.[0];
    const cartItemId = `${product.id}-${defaultColor || 'default'}-${defaultSize || 'default'}`;

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === cartItemId);
      if (existing) {
        const nextQty = Math.min(existing.quantity + quantity, product.stock);
        return prevCart.map((item) =>
          item.id === cartItemId ? { ...item, quantity: nextQty } : item
        );
      } else {
        const newItem: CartItem = {
          id: cartItemId,
          productId: product.id,
          title: product.title,
          price: product.price,
          compareAtPrice: product.compareAtPrice,
          image: product.images[0] || '',
          selectedColor: defaultColor,
          selectedSize: defaultSize,
          quantity: Math.min(quantity, product.stock),
          maxStock: product.stock,
        };
        return [...prevCart, newItem];
      }
    });

    addToast(
      'success',
      'Added to Bag',
      `${quantity}x ${product.title} (${defaultColor || 'Standard'}) added to your bag.`
    );
    setIsCartDrawerOpen(true);
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const validQty = Math.min(quantity, item.maxStock);
          return { ...item, quantity: validQty };
        }
        return item;
      })
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
    addToast('info', 'Item Removed', 'The item was removed from your shopping bag.');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Cart Calculations
  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const freeShippingThreshold = 250;

  // Determine physical vs digital items in cart
  const hasPhysicalItems = useMemo(() => {
    return cart.some((item) => {
      const prod = products.find((p) => p.id === item.productId);
      return !prod || prod.type !== 'digital';
    });
  }, [cart, products]);

  const hasDigitalItems = useMemo(() => {
    return cart.some((item) => {
      const prod = products.find((p) => p.id === item.productId);
      return prod?.type === 'digital';
    });
  }, [cart, products]);

  const isDigitalOnly = useMemo(() => {
    return cart.length > 0 && !hasPhysicalItems;
  }, [cart, hasPhysicalItems]);

  // Discount calculation
  const discountAmount = useMemo(() => {
    if (!appliedDiscount || cartSubtotal === 0) return 0;
    if (appliedDiscount.minPurchase && cartSubtotal < appliedDiscount.minPurchase) {
      return 0;
    }
    if (appliedDiscount.type === 'percentage') {
      return (cartSubtotal * appliedDiscount.value) / 100;
    }
    return Math.min(cartSubtotal, appliedDiscount.value);
  }, [appliedDiscount, cartSubtotal]);

  const applyDiscountCode = (inputCode: string): { success: boolean; message: string } => {
    const clean = inputCode.trim().toUpperCase();
    const found = INITIAL_DISCOUNT_CODES.find((d) => d.code === clean);
    if (!found) {
      return { success: false, message: 'Invalid promo code. Try WELCOME10 or SHATTAAN20.' };
    }
    if (found.minPurchase && cartSubtotal < found.minPurchase) {
      return {
        success: false,
        message: `Order must be at least $${found.minPurchase} to apply ${found.code}.`,
      };
    }
    setAppliedDiscount(found);
    addToast('success', 'Promo Code Applied', `${found.code} saved you on this order.`);
    return { success: true, message: `Code ${found.code} applied successfully!` };
  };

  const removeDiscountCode = () => {
    setAppliedDiscount(null);
    addToast('info', 'Promo Removed', 'Discount code has been cleared.');
  };

  const shippingAmount = useMemo(() => {
    if (cartSubtotal === 0) return 0;
    // Digital-only orders always have $0 shipping
    if (!hasPhysicalItems) return 0;
    return cartSubtotal >= freeShippingThreshold ? 0 : 25;
  }, [cartSubtotal, freeShippingThreshold, hasPhysicalItems]);

  const taxAmount = useMemo(() => {
    const taxable = Math.max(0, cartSubtotal - discountAmount);
    return Math.round(taxable * 0.0825 * 100) / 100; // 8.25% standard tax
  }, [cartSubtotal, discountAmount]);

  const cartTotal = useMemo(() => {
    const afterDiscount = Math.max(0, cartSubtotal - discountAmount);
    return afterDiscount + shippingAmount + taxAmount;
  }, [cartSubtotal, discountAmount, shippingAmount, taxAmount]);

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    const prod = products.find((p) => p.id === productId);
    if (wishlist.includes(productId)) {
      setWishlist((prev) => prev.filter((id) => id !== productId));
      addToast('info', 'Wishlist', `Removed "${prod?.title || 'item'}" from your favorites.`);
    } else {
      setWishlist((prev) => [...prev, productId]);
      addToast('success', 'Wishlist', `Added "${prod?.title || 'item'}" to your saved pieces.`);
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const clearWishlist = () => {
    setWishlist([]);
    try {
      localStorage.removeItem('shattaan_wishlist');
    } catch (e) {
      console.error(e);
    }
    addToast('info', 'Wishlist Cleared', 'All saved items removed.');
  };

  // Orders
const placeOrder = async (orderData: {
  customer: {
    name: string;
    email: string;
    phone: string;
    shippingAddress: Address;
  };
  paymentMethod: string;
  notes?: string;
}): Promise<Order | null> => {
  try {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerId: currentUser.id,
        customer: {
          id: currentUser.id,
          name: orderData.customer.name,
          email: orderData.customer.email,
          phone: orderData.customer.phone,
          shippingAddress: orderData.customer.shippingAddress,
        },
        items: cart.map((item) => ({
          productId: item.productId,
          title: item.title,
          price: item.price,
          image: item.image,
          selectedColor: item.selectedColor,
          selectedSize: item.selectedSize,
          quantity: item.quantity,
        })),
        subtotal: cartSubtotal,
        discount: discountAmount,
        shippingFee: shippingAmount,
        tax: taxAmount,
        total: cartTotal,
        appliedPromoCode: appliedDiscount?.code,
        paymentMethod: orderData.paymentMethod,
        paymentStatus: 'pending',
        fulfillmentStatus: 'processing',
        notes: orderData.notes,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to create order.');
    }

    const newOrder: Order = {
      id: data.id,
      orderNumber: data.orderNumber,
      date: data.createdAt ?? new Date().toISOString(),
      customer: {
        id: currentUser.id,
        name: orderData.customer.name,
        email: orderData.customer.email,
        phone: orderData.customer.phone,
        shippingAddress: orderData.customer.shippingAddress,
      },
      items: data.items.map((item: OrderItem) => ({
        productId: item.productId,
        title: item.title,
        price: Number(item.price),
        image: item.image,
        selectedColor: item.selectedColor ?? undefined,
        selectedSize: item.selectedSize ?? undefined,
        quantity: item.quantity,
        isDigital: item.isDigital ?? false,
        downloadUrl: item.downloadUrl ?? undefined,
      })),
      subtotal: Number(data.subtotal),
      discount: Number(data.discount),
      shippingFee: Number(data.shippingFee),
      tax: Number(data.tax),
      total: Number(data.total),
      appliedPromoCode: data.appliedPromoCode ?? undefined,
      paymentMethod: data.paymentMethod,
      paymentStatus: data.paymentStatus,
      fulfillmentStatus: data.fulfillmentStatus,
      trackingNumber: data.trackingNumber ?? undefined,
      trackingCarrier: data.trackingCarrier ?? undefined,
      estimatedDeliveryDate: data.estimatedDeliveryDate
        ? String(data.estimatedDeliveryDate).split('T')[0]
        : undefined,
      notes: data.notes ?? undefined,
    };

    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        const cartItem = cart.find((item) => item.productId === product.id);

        if (!cartItem) return product;

        return {
          ...product,
          stock: Math.max(0, product.stock - cartItem.quantity),
        };
      })
    );

    setOrders((prev) => [newOrder, ...prev]);

    setCurrentUser((prev) => ({
      ...prev,
      totalOrders: prev.totalOrders + 1,
      totalSpent: prev.totalSpent + cartTotal,
    }));

    setRecentOrder(newOrder);
    clearCart();
    setAppliedDiscount(null);

    addToast(
      'success',
      'Order Created',
      `Order ${newOrder.orderNumber} was saved successfully.`
    );

    return newOrder;
  } catch (error) {
    console.error('Failed to place order:', error);

    addToast(
      'error',
      'Order Failed',
      error instanceof Error
        ? error.message
        : 'The order could not be created.'
    );

    return null;
  }
};
    const updateOrderStatus = (
  orderId: string,
  status: OrderStatus,
  trackingNumber?: string,
  carrier?: string
) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            fulfillmentStatus: status,
            ...(trackingNumber ? { trackingNumber } : {}),
            ...(carrier ? { trackingCarrier: carrier } : {}),
          };
        }
        return o;
      })
    );
    addToast('success', 'Order Updated', `Order status updated to "${status.toUpperCase()}".`);
  };

  const updatePaymentStatus = (orderId: string, status: PaymentStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, paymentStatus: status } : o))
    );
    addToast('info', 'Payment Updated', `Payment status changed to ${status}.`);
  };

  // Reviews
  const getProductReviews = (productId: string) => {
    return reviews.filter((r) => r.productId === productId);
  };

  const addReview = (newRev: Omit<Review, 'id' | 'date'>) => {
    const rev: Review = {
      ...newRev,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      helpfulCount: 1,
    };
    setReviews((prev) => [rev, ...prev]);

    // Recompute product rating
    const prodReviews = [...reviews.filter((r) => r.productId === newRev.productId), rev];
    const avg = prodReviews.reduce((sum, r) => sum + r.rating, 0) / prodReviews.length;
    setProducts((prev) =>
      prev.map((p) =>
        p.id === newRev.productId
          ? {
              ...p,
              rating: Math.round(avg * 10) / 10,
              reviewCount: prodReviews.length,
            }
          : p
      )
    );

    addToast('success', 'Review Submitted', 'Thank you for sharing your experience with SHATTAAN.');
  };

  // Customer profile update
  const updateCustomerProfile = (updates: Partial<Customer>) => {
    setCurrentUser((prev) => ({ ...prev, ...updates }));
    setCustomers((prev) =>
      prev.map((c) => (c.id === currentUser.id ? { ...c, ...updates } : c))
    );
    addToast('success', 'Profile Updated', 'Your customer account details have been saved.');
  };

  // Reset to initial sample data
  const resetToSampleData = () => {
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setCustomers(INITIAL_CUSTOMERS);
    setReviews(INITIAL_REVIEWS);
    setCart([]);
    setWishlist(['sht-001', 'sht-002']);
    localStorage.removeItem('shattaan_products');
    localStorage.removeItem('shattaan_orders');
    localStorage.removeItem('shattaan_customers');
    localStorage.removeItem('shattaan_reviews');
    localStorage.removeItem('shattaan_cart');
    localStorage.removeItem('shattaan_wishlist');
    addToast('info', 'Store Reset', 'Sample products, orders, and data restored.');
  };

  return (
    <StoreContext.Provider
      value={{
        selectedProductId,
        setSelectedProductId,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        adminTab,
        setAdminTab,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        quickViewProduct,
        setQuickViewProduct,
        currency,
        setCurrency,
        formatPrice,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        categories,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartCount,
        freeShippingThreshold,
        hasPhysicalItems,
        hasDigitalItems,
        isDigitalOnly,
        appliedDiscount,
        applyDiscountCode,
        removeDiscountCode,
        discountAmount,
        taxAmount,
        shippingAmount,
        cartTotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        orders,
        placeOrder,
        updateOrderStatus,
        updatePaymentStatus,
        recentOrder,
        setRecentOrder,
        reviews,
        getProductReviews,
        addReview,
        customers,
        currentUser,
        setCurrentUser,
        updateCustomerProfile,
        toasts,
        addToast,
        removeToast,
        resetToSampleData,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
