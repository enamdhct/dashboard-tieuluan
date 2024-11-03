import { NextResponse, NextRequest } from "next/server";
// import { createUser } from "./libs/User";

export async function middleware(request) {

  const login = request.cookies.get('accessToken')
  // console.log(login)
  if (login == undefined){
    if (request.nextUrl.pathname == '/admin/auth/login') {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/admin/auth/login', request.url));
  }else{
    if(request.nextUrl.pathname == "/admin/auth/logout"){
      // request.cookies.delete('accessToken')
      const reponse = NextResponse.redirect(new URL('/admin/auth/login', request.url))
      reponse.cookies.delete("accessToken")
      reponse.cookies.delete("userID")
      return reponse;
    }
    if (request.nextUrl.pathname == "/" || request.nextUrl.pathname == "/admin" || request.nextUrl.pathname == '/admin/auth/login') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    return NextResponse.next();
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ],
};
