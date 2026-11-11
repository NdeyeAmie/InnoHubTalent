import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  // Routes publiques
  if (!token && !req.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (token) {
    try {
      // ✅ Vérifie la validité du token et récupère le payload
      const { payload } = await jwtVerify(token, secret);
      const role = payload.role as string;

      console.log('ROLE:', role);

      const pathname = req.nextUrl.pathname;

      // 🔒 Vérification d'accès par rôle :
      if (
        pathname.startsWith('/admin') &&
        !['ADMIN', 'ADMINSYSTEM'].includes(role)
      ) {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }

      if (
        pathname.startsWith('/productmanager') &&
        !['PRODUCTMANAGER', 'ADMIN', 'ADMINSYSTEM'].includes(role)
      ) {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }

      // sinon OK
      return NextResponse.next();
    } catch (err) {
      console.error('JWT invalide :', err);

      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|api).*)'],
};
