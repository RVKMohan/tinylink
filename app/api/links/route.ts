import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { CODE_REGEX, generateCode, isValidUrl } from '../../../lib/utils';

export async function GET() {
    const links = await prisma.link.findMany({
        where: { deleted: false },
        orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(links);
}


export async function POST(req: Request) {
  const body = await req.json().catch(()=>null);
  if (!body) return NextResponse.json({ error: 'invalid json' }, { status: 400 });

  let { url, code } = body as { url?: string; code?: string };

  if (!url || typeof url !== 'string' || !isValidUrl(url)) {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }

  if (code) {
    if (typeof code !== 'string' || !CODE_REGEX.test(code)) {
      return NextResponse.json({ error: 'Invalid code format (A-Za-z0-9, 6-8 chars)' }, { status: 400 });
    }
    const existing = await prisma.link.findUnique({ where: { code } });
    if (existing && !existing.deleted) {
      return NextResponse.json({ error: 'Code already exists' }, { status: 409 });
    }
  } else {
    let tries = 0;
    do {
      code = generateCode();
      const e = await prisma.link.findUnique({ where: { code } });
      if (!e) break;
      tries++;
      if (tries > 5) break;
    } while (true);
  }

  const created = await prisma.link.create({
    data: { url, code: code!, clicks: 0 },
  });

  return NextResponse.json(created, { status: 201 });
}