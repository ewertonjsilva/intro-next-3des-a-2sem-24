import { NextResponse } from 'next/server';

export function middleware(req) {
  // Obter o token de autenticação (isso pode vir de cookies, localStorage, etc.)
  const token = req.cookies.get('token'); // Exemplo usando cookies

  // Defina as rotas que deseja proteger
  const protectedRoutes = ['/gerenciamento/mesas', '/gerenciamento/usuarios']; // Adicione suas rotas privadas

  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    // Se o token não existir, redirecione para a página de login
    if (!token) {
      return NextResponse.redirect(new URL('/usuarios/login', req.url));
    }
  }

  // Continuar normalmente se o usuário estiver autenticado
  return NextResponse.next();
}

export const config = {
  matcher: ['/gerenciamento/mesas/:path*', '/gerenciamento/usuarios/:path*'], // Rotas que o middleware deve interceptar
};
