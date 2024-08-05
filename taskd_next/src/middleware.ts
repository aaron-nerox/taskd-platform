import {NextRequest, NextResponse} from "next/server";



export async function middleware(request: NextRequest) {
    const userToken = request.cookies.get('user_token')?.value
    const path = request.nextUrl.pathname

    if(!userToken && path !== '/connect' && path !== '/register' && path !== '/') {
        return Response.redirect(new URL('/', request.url))
    }

    if(userToken && !path.startsWith("/dashboard")) {
        return Response.redirect(new URL('/dashboard', request.url))
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico).*)'],
}