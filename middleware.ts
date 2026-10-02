import {NextRequest, NextResponse} from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const {pathname} = request.nextUrl;

    /* ==========================================
        المستخدم غير مسجل دخول
    ========================================== */
    if (!token && pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (!token) {
        return NextResponse.next();
    }

    /* ==========================================
        المستخدم مسجل دخول وفتح صفحة تسجيل الدخول
    ========================================== */
    if (pathname === "/login") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/login"],
};
