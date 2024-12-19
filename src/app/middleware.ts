// app/middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // A verificação do usuário é feita no localStorage
  // Para acessar localStorage dentro do middleware, usamos cookies ou headers, pois o localStorage
  // não está disponível diretamente dentro do middleware, que é executado no servidor.

  const user = req.cookies.get('user'); // Aqui usamos cookies como exemplo

  // Se o usuário não estiver logado e tentar acessar uma rota protegida (com "dashboard" no caminho),
  // redirecionamos para a página inicial
  if (!user && req.url.includes('/dashboard')) {
    return NextResponse.redirect(new URL('/', req.url)); // Redireciona para a home
  }

  return NextResponse.next(); // Permite a navegação caso o usuário esteja logado
}

// Especificando as rotas protegidas (aqui colocamos qualquer rota que tenha "dashboard")
export const config = {
  matcher: ['/dashboard/*'] // Protege qualquer rota que tenha "/dashboard"
};
