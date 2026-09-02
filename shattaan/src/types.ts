export interface ProductColor {
  name: string;
  hex: string;
  inStock: boolean;
}

export type ProductType = 'digital' | 'physical';

export interface DigitalProductDetails {
  format: string;
  fileSize?: string;
  deliveryMethod?: string;
  license?: string;
  previewUrl?: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  type: ProductType;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  costPrice?: number;
  rating: number;
  reviewCount: number;
  sku: string;
  stock: number;
  category: string;
  subcategory?: string;
  tags: string[];
  images: string[];
  isFeatured?: boolean;
  isTrending?: boolean;
  isNewArrival?: boolean;
  colors?: ProductColor[];
  sizes?: string[];
  specifications?: Record<string, string>;
  digitalDetails?: DigitalProductDetails;
  physicalDetails?: {
    weight?: string;
    dimensions?: string;
    shippingClass?: string;
  };
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
  featured?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  selectedColor?: string;
  selectedSize?: string;
  quantity: number;
  maxStock: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface Address {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  image: string;
  selectedColor?: string;
  selectedSize?: string;
  quantity: number;
  isDigital?: boolean;
  downloadUrl?: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'paid' | 'pending' | 'failed' | 'refunded';

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customer: {
    id?: string;
    name: string;
    email: string;
    phone: string;
    shippingAddress: Address;
    billingAddress?: Address;
  };
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  tax: number;
  total: number;
  appliedPromoCode?: string;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  fulfillmentStatus: OrderStatus;
  trackingNumber?: string;
  trackingCarrier?: string;
  estimatedDeliveryDate?: string;
  notes?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  joinedDate: string;
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'vip' | 'inactive';
  defaultAddress?: Address;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  helpfulCount?: number;
}

export interface DiscountCode {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minPurchase?: number;
  description: string;
}

export type NavigationView = 
  | 'home'
  | 'catalog'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'order-success'
  | 'account'
  | 'wishlist'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'shipping-returns'
  | 'track-order'
  | 'admin';

export type AdminTab = 
  | 'dashboard'
  | 'products'
  | 'orders'
  | 'customers'
  | 'inventory'
  | 'settings';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'AED' | 'CAD';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // relative to USD
}
