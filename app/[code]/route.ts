import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';


export async function GET(req: Request, { params }: { params: { code: string } }) {
  const { code } = params;
  const link = await prisma.link.findUnique({ where: { code } });
  if (!link || link.deleted) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  await prisma.link.update({
    where: { code },
    data: { clicks: { increment: 1 }, lastClicked: new Date() },
  });

  return NextResponse.redirect(link.url, 302);
}
