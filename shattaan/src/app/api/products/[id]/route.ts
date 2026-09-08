import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const {
      title,
      sku,
      category,
      categoryId,
      price,
      compareAtPrice,
      stock,
      description,
      images,
      isFeatured,
      tags,
    } = body;

    const resolvedCategoryId = categoryId ?? category;

    if (
  title === undefined &&
  sku === undefined &&
  resolvedCategoryId === undefined &&
  price === undefined &&
  compareAtPrice === undefined &&
  stock === undefined &&
  description === undefined &&
  images === undefined &&
  isFeatured === undefined &&
  tags === undefined
) {
  return NextResponse.json(
    { error: "No product changes were provided." },
    { status: 400 }
  );
}

    const product = await prisma.product.update({
      where: { id },
      data: {
  ...(title !== undefined && { title }),
  ...(sku !== undefined && { sku }),
  ...(resolvedCategoryId !== undefined && {
    category: {
      connect: { id: resolvedCategoryId },
    },
  }),
  ...(price !== undefined && { price: Number(price) }),
  ...(compareAtPrice !== undefined && {
    compareAtPrice:
      compareAtPrice === null ? null : Number(compareAtPrice),
  }),
  ...(stock !== undefined && {
    stock: Math.max(0, Number(stock)),
  }),
  ...(description !== undefined && { description }),
  ...(images !== undefined && {
    images: Array.isArray(images) ? images : [],
  }),
  ...(isFeatured !== undefined && { isFeatured: Boolean(isFeatured) }),
  ...(tags !== undefined && {
    tags: Array.isArray(tags) ? tags : [],
  }),
},
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Failed to update product:", error);

    return NextResponse.json(
      { error: "Failed to update product." },
      { status: 500 }
    );
  }
}
export async function DELETE(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found." },
        { status: 404 }
      );
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      id,
    });
  } catch (error) {
    console.error("Failed to delete product:", error);

    return NextResponse.json(
      { error: "Failed to delete product." },
      { status: 500 }
    );
  }
}