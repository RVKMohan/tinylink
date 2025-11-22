import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';


export async function DELETE(req: Request, { params }: { params: { code: string }}) {
  const { code } = params;
  const link = await prisma.link.findUnique({ where: { code } });
  if (!link || link.deleted) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  await prisma.link.update({
    where: { code },
    data: { deleted: true },
  });

  return NextResponse.json({ ok: true });
}
