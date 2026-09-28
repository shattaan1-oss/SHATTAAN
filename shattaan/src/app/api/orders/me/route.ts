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

    const customerId = session.user.customerId;

    if (!customerId) {
      return NextResponse.json([]);
    }

    const orders = await prisma.order.findMany({
      where: {
        customerId,
      },
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
    console.error("Failed to load customer orders:", error);

    return NextResponse.json(
      { error: "Failed to load customer orders." },
      { status: 500 }
    );
  }
}