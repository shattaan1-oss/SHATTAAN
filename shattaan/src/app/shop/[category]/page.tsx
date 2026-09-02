import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CatalogView } from '@/components/views/CatalogView';
import { getCategoryBySlug, getAllCategories } from '@/lib/data/products';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = await getCategoryBySlug(categorySlug);

  if (!category) {
    return {
      title: 'Category Not Found | SHATTAAN',
      description: 'The requested luxury collection could not be located.',
    };
  }

  return {
    title: `${category.name} | SHATTAAN Collection`,
    description: category.description,
    openGraph: {
      title: `${category.name} | SHATTAAN Collection`,
      description: category.description,
      images: category.image ? [{ url: category.image }] : [],
    },
    alternates: {
      canonical: `/shop/${category.slug}`,
    },
  };
}

export default async function CategoryShopPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = await getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  return <CatalogView initialCategory={categorySlug} />;
}
