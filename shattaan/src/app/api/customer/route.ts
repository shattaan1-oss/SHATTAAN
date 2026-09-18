import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      orderBy: {
        joinedDate: 'desc',
      },
    });

    return NextResponse.json(
      customers.map((customer) => ({
        ...customer,
        totalSpent: Number(customer.totalSpent),
      }))
    );
  } catch (error) {
    console.error('Failed to load customers:', error);

    return NextResponse.json(
      { error: 'Failed to load customers.' },
      { status: 500 }
    );
  }
}