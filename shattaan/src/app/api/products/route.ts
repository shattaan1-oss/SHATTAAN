import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
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
}export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      title,
      slug,
      type,
      description,
      shortDescription,
      price,
      compareAtPrice,
      costPrice,
      rating,
      reviewCount,
      sku,
      stock,
      categoryId,
category,
      subcategory,
      tags,
      images,
      isFeatured,
      isTrending,
      isNewArrival,
      sizes,
      specifications,
    } = body;

    const resolvedCategoryId = categoryId ?? category;

if (!title || !slug || !type || !sku || !resolvedCategoryId) {
      return NextResponse.json(
        {
          error:
            "Title, slug, type, SKU, and category are required.",
        },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
id: `sht-${Date.now().toString().slice(-4)}`,
        title,
        slug,
        type,
        description: description ?? "",
        shortDescription: shortDescription ?? "",
        price: Number(price ?? 0),
        compareAtPrice:
          compareAtPrice !== undefined && compareAtPrice !== null
            ? Number(compareAtPrice)
            : null,
        costPrice:
          costPrice !== undefined && costPrice !== null
            ? Number(costPrice)
            : null,
        rating: Number(rating ?? 0),
        reviewCount: Number(reviewCount ?? 0),
        sku,
        stock: Number(stock ?? 0),
       category: {
  connect: { id: resolvedCategoryId },
},
        subcategory: subcategory ?? null,
        tags: Array.isArray(tags) ? tags : [],
        images: Array.isArray(images) ? images : [],
        isFeatured: Boolean(isFeatured),
        isTrending: Boolean(isTrending),
        isNewArrival: Boolean(isNewArrival),
        sizes: Array.isArray(sizes) ? sizes : [],
        specifications: specifications ?? {},
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Failed to create product:", error);

    return NextResponse.json(
      { error: "Failed to create product." },
      { status: 500 }
    );
  }
}