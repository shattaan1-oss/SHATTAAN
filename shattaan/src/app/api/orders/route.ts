import { NextResponse } from "next/server";
import { auth } from "@/../auth";
import { prisma } from "@/lib/prisma";

type OrderItemInput = {
  productId: string;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
};

type CreateOrderInput = {
  items: OrderItemInput[];
  customer?: {
    shippingAddress?: Record<string, unknown>;
    billingAddress?: Record<string, unknown>;
  };
  paymentMethod: string;
  notes?: string;
};

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required." },
        { status: 401 }
      );
    }

    const customerId = session.user.customerId;

    if (!customerId) {
      return NextResponse.json(
        { error: "No customer account is linked to this user." },
        { status: 403 }
      );
    }

    const body = (await request.json()) as CreateOrderInput;

    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { error: "At least one product is required." },
        { status: 400 }
      );
    }

    if (
      typeof body.paymentMethod !== "string" ||
      !body.paymentMethod.trim()
    ) {
      return NextResponse.json(
        { error: "Payment method is required." },
        { status: 400 }
      );
    }

    for (const item of body.items) {
      if (
        typeof item.productId !== "string" ||
        !item.productId ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1
      ) {
        return NextResponse.json(
          { error: "Every order item must have a valid product and quantity." },
          { status: 400 }
        );
      }
    }

    if (!body.customer?.shippingAddress) {
      return NextResponse.json(
        { error: "Shipping address is required." },
        { status: 400 }
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      const customer = await tx.customer.findUnique({
        where: { id: customerId },
      });

      if (!customer) {
        throw new Error("Customer account not found.");
      }

      const verifiedItems: Array<{
        productId: string;
        title: string;
        price: number;
        image: string;
        selectedColor: string | null;
        selectedSize: string | null;
        quantity: number;
        isDigital: boolean;
        downloadUrl: string | null;
      }> = [];

      let subtotal = 0;

      for (const item of body.items) {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
        });

        if (!product) {
          throw new Error(`Product "${item.productId}" was not found.`);
        }

        const updated = await tx.product.updateMany({
          where: {
            id: product.id,
            stock: {
              gte: item.quantity,
            },
          },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });

        if (updated.count !== 1) {
          throw new Error(
            `Product "${product.title}" does not have enough inventory.`
          );
        }

        const price = Number(product.price);
        subtotal += price * item.quantity;

        verifiedItems.push({
          productId: product.id,
          title: product.title,
          price,
          image: product.images[0] ?? "",
          selectedColor: item.selectedColor ?? null,
          selectedSize: item.selectedSize ?? null,
          quantity: item.quantity,
          isDigital: product.type === "digital",
          downloadUrl: null,
        });
      }

      // Pricing is intentionally server-controlled.
      // Discounts, shipping and tax will be connected to
      // their real services in later phases.
      const discount = 0;
      const shippingFee = 0;
      const tax = 0;
      const total = subtotal;

      const orderNumber = `SHT-${new Date().getFullYear()}-${Date.now()
        .toString()
        .slice(-8)}`;

      const order = await tx.order.create({
        data: {
          id: `ord-${crypto.randomUUID()}`,
          orderNumber,
          customerId,
          subtotal,
          discount,
          shippingFee,
          tax,
          total,
          appliedPromoCode: null,
          paymentMethod: body.paymentMethod.trim(),
          paymentStatus: "pending",
          fulfillmentStatus: "processing",
          trackingNumber: null,
          trackingCarrier: null,
          estimatedDeliveryDate: null,
          notes: body.notes?.trim() || null,
          shippingAddress: JSON.parse(JSON.stringify(body.customer.shippingAddress)),
billingAddress: body.customer.billingAddress
  ? JSON.parse(JSON.stringify(body.customer.billingAddress))
  : null,
          items: {
            create: verifiedItems,
          },
        },
        include: {
          items: true,
          customer: true,
        },
      });

      await tx.customer.update({
        where: { id: customerId },
        data: {
          totalOrders: { increment: 1 },
          totalSpent: { increment: total },
        },
      });

      return order;
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Failed to create order:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to create order.",
      },
      { status: 500 }
    );
  }
}