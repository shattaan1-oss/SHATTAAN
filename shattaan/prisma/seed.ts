import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import {
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
} from "../src/data/initialData";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting SHATTAAN database seed...");

  // 1. Import categories
  for (const category of INITIAL_CATEGORIES) {
    await prisma.category.upsert({
      where: {
        id: category.id,
      },
      update: {
        name: category.name,
        slug: category.slug,
        description: category.description,
        image: category.image,
        itemCount: category.itemCount,
        featured: category.featured,
      },
      create: {
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        image: category.image,
        itemCount: category.itemCount,
        featured: category.featured,
      },
    });
  }

  console.log(`Imported ${INITIAL_CATEGORIES.length} categories.`);

  // 2. Import products
  for (const product of INITIAL_PRODUCTS) {
    await prisma.product.upsert({
      where: {
        id: product.id,
      },
      update: {
        title: product.title,
        slug: product.slug,
        type: product.type,
        description: product.description,
        shortDescription: product.shortDescription,
        price: product.price,
        compareAtPrice: product.compareAtPrice ?? null,
        costPrice: product.costPrice ?? null,
        rating: product.rating,
        reviewCount: product.reviewCount,
        sku: product.sku,
        stock: product.stock,
        categoryId: product.category,
        subcategory: product.subcategory ?? null,
        tags: product.tags,
        images: product.images,
        isFeatured: product.isFeatured,
        isTrending: product.isTrending,
        isNewArrival: product.isNewArrival,
        sizes: product.sizes,
        specifications: product.specifications,
      },
      create: {
        id: product.id,
        title: product.title,
        slug: product.slug,
        type: product.type,
        description: product.description,
        shortDescription: product.shortDescription,
        price: product.price,
        compareAtPrice: product.compareAtPrice ?? null,
        costPrice: product.costPrice ?? null,
        rating: product.rating,
        reviewCount: product.reviewCount,
        sku: product.sku,
        stock: product.stock,
        categoryId: product.category,
        subcategory: product.subcategory ?? null,
        tags: product.tags,
        images: product.images,
        isFeatured: product.isFeatured,
        isTrending: product.isTrending,
        isNewArrival: product.isNewArrival,
        sizes: product.sizes,
        specifications: product.specifications,
      },
    });

    // Product colors
    await prisma.productColor.deleteMany({
      where: {
        productId: product.id,
      },
    });

    if (product.colors?.length) {
      await prisma.productColor.createMany({
        data: product.colors.map((color) => ({
          name: color.name,
          hex: color.hex,
          inStock: color.inStock,
          productId: product.id,
        })),
      });
    }

    // Digital product details
    if (product.digitalDetails) {
      await prisma.digitalProductDetails.upsert({
        where: {
          productId: product.id,
        },
        update: {
          format: product.digitalDetails.format,
          fileSize: product.digitalDetails.fileSize ?? null,
          deliveryMethod:
            product.digitalDetails.deliveryMethod ?? null,
          license: product.digitalDetails.license ?? null,
          previewUrl: product.digitalDetails.previewUrl ?? null,
        },
        create: {
          productId: product.id,
          format: product.digitalDetails.format,
          fileSize: product.digitalDetails.fileSize ?? null,
          deliveryMethod:
            product.digitalDetails.deliveryMethod ?? null,
          license: product.digitalDetails.license ?? null,
          previewUrl: product.digitalDetails.previewUrl ?? null,
        },
      });
    }

    // Physical product details
    if (product.physicalDetails) {
      await prisma.physicalProductDetails.upsert({
        where: {
          productId: product.id,
        },
        update: {
          weight: product.physicalDetails.weight ?? null,
          dimensions: product.physicalDetails.dimensions ?? null,
          shippingClass:
            product.physicalDetails.shippingClass ?? null,
        },
        create: {
          productId: product.id,
          weight: product.physicalDetails.weight ?? null,
          dimensions: product.physicalDetails.dimensions ?? null,
          shippingClass:
            product.physicalDetails.shippingClass ?? null,
        },
      });
    }

    console.log(`Imported product: ${product.title}`);
  }

  console.log(`Imported ${INITIAL_PRODUCTS.length} products.`);
  console.log("SHATTAAN database seed completed successfully.");
}

main()
  .catch((error) => {
    console.error("Database seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });