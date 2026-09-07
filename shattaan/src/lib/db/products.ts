import { prisma } from "@/lib/prisma";

export async function getDbProducts() {
  return prisma.product.findMany({
    include: {
      category: true,
      colors: true,
      digitalDetails: true,
      physicalDetails: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getDbProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      colors: true,
      digitalDetails: true,
      physicalDetails: true,
      reviews: true,
    },
  });
}