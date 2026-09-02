import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductDetailView } from '@/components/views/ProductDetailView';
import { getProductBySlug, getAllProducts } from '@/lib/data/products';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

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
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailView initialProduct={product} slug={slug} />;
}
