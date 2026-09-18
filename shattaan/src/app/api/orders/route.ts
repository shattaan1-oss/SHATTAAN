import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";
type OrderItemInput = {
  productId: string;
  title: string;
  price: number;
  image: string;
  selectedColor?: string;
  selectedSize?: string;
  quantity: number;
  isDigital?: boolean;
  downloadUrl?: string;
};

type CreateOrderInput = {
  customerId?: string;
  customer?: {
    id?: string;
    name: string;
    email: string;
    phone: string;
    shippingAddress: Record<string, unknown>;
    billingAddress?: Record<string, unknown>;
  };
  items: OrderItemInput[];
  subtotal: number;
  discount?: number;
  shippingFee?: number;
  tax?: number;
  total: number;
  appliedPromoCode?: string;
  paymentMethod: string;
  paymentStatus?: "paid" | "pending" | "failed" | "refunded";
  fulfillmentStatus?: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  trackingNumber?: string;
  trackingCarrier?: string;
  estimatedDeliveryDate?: string;
  notes?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateOrderInput;

    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: "An order must contain at least one item." },
        { status: 400 }
      );
    }

    if (!body.paymentMethod) {
      return NextResponse.json(
        { error: "Payment method is required." },
        { status: 400 }
      );
    }

    if (!body.customer?.shippingAddress) {
      return NextResponse.json(
        { error: "Shipping address is required." },
        { status: 400 }
      );
    }

    for (const item of body.items) {
      if (!item.productId || item.quantity < 1) {
        return NextResponse.json(
          { error: "Every order item must have a valid product and quantity." },
          { status: 400 }
        );
      }
    }

    const orderId = `ord-${crypto.randomUUID()}`;
    const orderNumber = `SHT-${new Date().getFullYear()}-${Date.now()
      .toString()
      .slice(-8)}`;

    const result = await prisma.$transaction(async (tx) => {
      // Verify the customer when a customer ID is supplied.
      let customerId: string | null = body.customerId ?? body.customer?.id ?? null;

      if (customerId) {
        const customer = await tx.customer.findUnique({
          where: { id: customerId },
        });

        if (!customer) {
          customerId = null;
        }
      }

      // Verify every product and reserve its inventory atomically.
      for (const item of body.items) {
        const updated = await tx.product.updateMany({
          where: {
            id: item.productId,
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
            `Product "${item.productId}" was not found or does not have enough inventory.`
          );
        }
      }

      const order = await tx.order.create({
        data: {
          id: orderId,
          orderNumber,
          customerId,

          subtotal: body.subtotal,
          discount: body.discount ?? 0,
          shippingFee: body.shippingFee ?? 0,
          tax: body.tax ?? 0,
          total: body.total,

          appliedPromoCode: body.appliedPromoCode ?? null,
          paymentMethod: body.paymentMethod,

          // Payment will remain pending until real payment verification is implemented.
          paymentStatus: body.paymentStatus ?? "pending",
          fulfillmentStatus: body.fulfillmentStatus ?? "processing",

          trackingNumber: body.trackingNumber ?? null,
          trackingCarrier: body.trackingCarrier ?? null,
          estimatedDeliveryDate: body.estimatedDeliveryDate
            ? new Date(body.estimatedDeliveryDate)
            : null,

          notes: body.notes ?? null,

          shippingAddress: body.customer.shippingAddress as Prisma.InputJsonValue,
billingAddress: body.customer.billingAddress
  ? (body.customer.billingAddress as Prisma.InputJsonValue)
  : null,

          items: {
            create: body.items.map((item) => ({
              productId: item.productId,
              title: item.title,
              price: item.price,
              image: item.image,
              selectedColor: item.selectedColor ?? null,
              selectedSize: item.selectedSize ?? null,
              quantity: item.quantity,
              isDigital: item.isDigital ?? false,
              downloadUrl: item.downloadUrl ?? null,
            })),
          },
        },
        include: {
          items: true,
          customer: true,
        },
      });

      // Update customer statistics when the order belongs to a customer.
      if (customerId) {
        await tx.customer.update({
          where: { id: customerId },
          data: {
            totalOrders: {
              increment: 1,
            },
            totalSpent: {
              increment: body.total,
            },
          },
        });
      }

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
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: true,
        customer: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Failed to load orders:', error);

    return NextResponse.json(
      {
        error: 'Failed to load orders.',
      },
      { status: 500 }
    );
  }
}
export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    const { orderId, fulfillmentStatus, trackingNumber, trackingCarrier } = body;

    if (!orderId || !fulfillmentStatus) {
      return NextResponse.json(
        { error: 'Order ID and fulfillment status are required.' },
        { status: 400 }
      );
    }

    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        fulfillmentStatus,
        ...(trackingNumber !== undefined ? { trackingNumber } : {}),
        ...(trackingCarrier !== undefined ? { trackingCarrier } : {}),
      },
      include: {
        items: true,
        customer: true,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error('Failed to update order:', error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Failed to update order.',
      },
      { status: 500 }
    );
  }
}