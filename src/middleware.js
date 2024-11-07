import { NextResponse } from 'next/server';

export function middleware(req) {
  // Obter o token de autenticação (isso pode vir de cookies, localStorage, etc.)
  const token = req.cookies.get('token'); // Exemplo usando cookies  
  console.log(token.value); 

  // Defina as rotas que deseja proteger
  const protectedRoutesAdm = ['/gerenciamento', '/gerenciamento/mesas', '/gerenciamento/usuarios', '/gerenciamento/produtos', '/usuarios/perfil'];
  const protectedRoutesRes = ['/gerenciamento/mesas', '/gerenciamento/produtos', '/usuarios/perfil'];
  const protectedRoutesCli = ['/usuarios/perfil', '/carrinho'];

  if (!token) {
    // Se o token não existir, redirecione para o login
    return NextResponse.redirect(new URL('/usuarios/login', req.url));
  }

  const nivelAcesso = token.value;
  if (nivelAcesso == 0 && protectedRoutesAdm.some(route => req.nextUrl.pathname.startsWith(route))) {
    return NextResponse.next(); // ADM tem acesso total às rotas de administrador
  } else if (nivelAcesso == 1 && protectedRoutesRes.some(route => req.nextUrl.pathname.startsWith(route))) {
    return NextResponse.next(); // Restaurante tem acesso às rotas específicas de restaurante
  } else if (nivelAcesso == 2 && protectedRoutesCli.some(route => req.nextUrl.pathname.startsWith(route))) {
    return NextResponse.next(); // Cliente tem acesso às rotas de cliente
  } else {
    // Caso o nível do usuário não corresponda à rota, redirecione para uma página de erro ou login
    return NextResponse.redirect(new URL('/usuarios/sem-permissao', req.url)); // Página de acesso negado
  }
}

export const config = {
  // matcher: ['/gerenciamento/mesas/:path*', '/gerenciamento/usuarios/:path*'], // Rotas que o middleware deve interceptar
  matcher: ['/gerenciamento/:path*', '/carrinho', '/usuarios/perfil'], // Rotas que o middleware deve interceptar
};

// testes
// http://localhost:3000/usuarios/perfil
// http://localhost:3000/carrinho
// - - - 

// http://localhost:3000/gerenciamento/produtos
// http://localhost:3000/gerenciamento/mesas
// http://localhost:3000/gerenciamento/funcionarios


// thomasfranciscocortereal@kaynak.com.br