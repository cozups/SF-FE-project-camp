import { type NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // 쿠키로 로그인 여부 확인
  const user = request.cookies.get('user');

  // 로그인 상태일 때 메인 페이지나 로그인 페이지에 접근하면 boards 페이지로 리다이렉트
  if (
    (request.nextUrl.pathname === '/join' && user) ||
    (request.nextUrl.pathname === '/login' && user) ||
    (request.nextUrl.pathname === '/' && user)
  ) {
    return NextResponse.redirect(new URL('/boards', request.url));
  }

  // 로그인 상태가 아닐 경우, 콘텐츠 페이지 접근 불가 -> 로그인 페이지 리다이렉트
  if (request.nextUrl.pathname.startsWith('/boards') && !user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// 미들웨어가 적용될 경로 설정
export const config = {
  matcher: ['/', '/join', '/login', '/boards/:path*'],
};
