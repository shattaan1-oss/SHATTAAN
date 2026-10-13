import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductDetailView } from '@/components/views/ProductDetailView';
import { getDbProductBySlug } from '@/lib/db/products';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getDbProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found | SHATTAAN',
      description: 'The requested luxury piece could not be located in our catalog.',
    };
  }

  const primaryImage = product.images[0] || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d';

  return {
    title: `${product.title} | SHATTAAN`,
    description: product.shortDescription || product.description.slice(0, 160),
    openGraph: {
      title: `${product.title} | SHATTAAN`,
      description: product.shortDescription || product.description.slice(0, 160),
      images: [
        {
          url: primaryImage,
          width: 1200,
          height: 1200,
          alt: product.title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.title} | SHATTAAN`,
      description: product.shortDescription || product.description.slice(0, 160),
      images: [primaryImage],
    },
    alternates: {
      canonical: `/products/${product.slug || product.id}`,
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getDbProductBySlug(slug);

  if (!product) {
    notFound();
  }
    const formattedProduct = {
  id: product.id,
  title: product.title,
  slug: product.slug,
  type: product.type,
  description: product.description,
  shortDescription: product.shortDescription,
  price: Number(product.price),
  compareAtPrice:
    product.compareAtPrice !== null
      ? Number(product.compareAtPrice)
      : undefined,
  costPrice:
    product.costPrice !== null
      ? Number(product.costPrice)
      : undefined,
  rating: product.rating,
  reviewCount: product.reviewCount,
  sku: product.sku,
  stock: product.stock,
  category: product.category.id,
  subcategory: product.subcategory ?? undefined,
  tags: product.tags,
  images: product.images,
  isFeatured: product.isFeatured,
  isTrending: product.isTrending,
  isNewArrival: product.isNewArrival,
  colors: product.colors.map((color) => ({
    name: color.name,
    hex: color.hex,
    inStock: color.inStock,
  })),
  sizes: product.sizes,
  specifications:
  product.specifications &&
  typeof product.specifications === 'object' &&
  !Array.isArray(product.specifications)
    ? (product.specifications as Record<string, string>)
    : {},
  digitalDetails: product.digitalDetails
    ? {
        format: product.digitalDetails.format,
        fileSize: product.digitalDetails.fileSize ?? undefined,
        deliveryMethod: product.digitalDetails.deliveryMethod ?? undefined,
        license: product.digitalDetails.license ?? undefined,
        previewUrl: product.digitalDetails.previewUrl ?? undefined,
      }
    : undefined,
  physicalDetails: product.physicalDetails
    ? {
        weight: product.physicalDetails.weight ?? undefined,
        dimensions: product.physicalDetails.dimensions ?? undefined,
        shippingClass: product.physicalDetails.shippingClass ?? undefined,
      }
    : undefined,
  createdAt: product.createdAt.toISOString(),
};
  return <ProductDetailView initialProduct={formattedProduct} slug={slug} />;
}
