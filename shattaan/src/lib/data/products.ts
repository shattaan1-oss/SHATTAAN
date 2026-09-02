import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_ORDERS, INITIAL_REVIEWS, INITIAL_CUSTOMERS, INITIAL_DISCOUNT_CODES } from '@/data/initialData';
import { Product, Category, Order, Review, Customer, DiscountCode } from '@/types';

/**
 * Data Access Layer (Abstraction boundary for future Prisma / Database integration)
 */

export async function getAllProducts(): Promise<Product[]> {
  return INITIAL_PRODUCTS;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const product = INITIAL_PRODUCTS.find(
    (p) => p.slug === slug || p.id === slug
  );
  return product || null;
}

export async function getProductById(id: string): Promise<Product | null> {
  const product = INITIAL_PRODUCTS.find((p) => p.id === id);
  return product || null;
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  return INITIAL_PRODUCTS.filter(
    (p) => p.category.toLowerCase() === categorySlug.toLowerCase()
  );
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return INITIAL_PRODUCTS.filter((p) => p.isFeatured);
}

export async function getTrendingProducts(): Promise<Product[]> {
  return INITIAL_PRODUCTS.filter((p) => p.isTrending);
}

export async function getNewArrivals(): Promise<Product[]> {
  return INITIAL_PRODUCTS.filter((p) => p.isNewArrival);
}

export async function getAllCategories(): Promise<Category[]> {
  return INITIAL_CATEGORIES;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const category = INITIAL_CATEGORIES.find(
    (c) => c.slug === slug || c.id === slug
  );
  return category || null;
}

export async function getAllOrders(): Promise<Order[]> {
  return INITIAL_ORDERS;
}

export async function getOrderById(id: string): Promise<Order | null> {
  const order = INITIAL_ORDERS.find(
    (o) => o.id === id || o.orderNumber === id
  );
  return order || null;
}

export async function getReviewsByProductId(productId: string): Promise<Review[]> {
  return INITIAL_REVIEWS.filter((r) => r.productId === productId);
}

export async function getAllCustomers(): Promise<Customer[]> {
  return INITIAL_CUSTOMERS;
}

export async function getAllDiscounts(): Promise<DiscountCode[]> {
  return INITIAL_DISCOUNT_CODES;
}
