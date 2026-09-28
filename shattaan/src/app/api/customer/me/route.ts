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
      return NextResponse.json(
        { error: "No customer account is linked to this user." },
        { status: 404 }
      );
    }

    const customer = await prisma.customer.findUnique({
      where: {
        id: customerId,
      },
      include: {
        addresses: true,
      },
    });

    if (!customer) {
      return NextResponse.json(
        { error: "Customer account not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...customer,
      totalSpent: Number(customer.totalSpent),
    });
  } catch (error) {
    console.error("Failed to load customer profile:", error);

    return NextResponse.json(
      { error: "Failed to load customer profile." },
      { status: 500 }
    );
  }
}