import { NextResponse } from "next/server";
import { auth } from "@/../auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required." },
        { status: 401 }
      );
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden." },
        { status: 403 }
      );
    }

    const orders = await prisma.order.findMany({
      include: {
        items: true,
        customer: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Failed to load admin orders:", error);

    return NextResponse.json(
      { error: "Failed to load orders." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required." },
        { status: 401 }
      );
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { orderId, fulfillmentStatus } = body;

    if (!orderId || typeof orderId !== "string") {
      return NextResponse.json(
        { error: "A valid orderId is required." },
        { status: 400 }
      );
    }

    const validStatuses = [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];

    if (!validStatuses.includes(fulfillmentStatus)) {
      return NextResponse.json(
        { error: "Invalid fulfillment status." },
        { status: 400 }
      );
    }

    const order = await prisma.order.update({
      where: { id: orderId },
      data: { fulfillmentStatus },
      include: {items: true, customer: true},
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("Failed to update admin order:", error);

    return NextResponse.json(
      { error: "Failed to update order." },
      { status: 500 }
    );
  }
}
