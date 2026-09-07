import { NextResponse } from "next/server";
import { getDbProducts } from "@/lib/db/products";

export async function GET() {
  try {
    const products = await getDbProducts();

    const formattedProducts = products.map((product) => ({
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
      specifications: product.specifications ?? {},
      digitalDetails: product.digitalDetails
        ? {
            format: product.digitalDetails.format,
            fileSize: product.digitalDetails.fileSize ?? undefined,
            deliveryMethod:
              product.digitalDetails.deliveryMethod ?? undefined,
            license: product.digitalDetails.license ?? undefined,
            previewUrl: product.digitalDetails.previewUrl ?? undefined,
          }
        : undefined,
      physicalDetails: product.physicalDetails
        ? {
            weight: product.physicalDetails.weight ?? undefined,
            dimensions: product.physicalDetails.dimensions ?? undefined,
            shippingClass:
              product.physicalDetails.shippingClass ?? undefined,
          }
        : undefined,
      createdAt: product.createdAt.toISOString(),
    }));

    return NextResponse.json(formattedProducts);
  } catch (error) {
    console.error("Failed to load products:", error);

    return NextResponse.json(
      { error: "Failed to load products" },
      { status: 500 }
    );
  }
}