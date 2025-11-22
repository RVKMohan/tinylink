import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
    const links = await prisma.link.findMany({
        where: { deleted: false },
        orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(links);
}