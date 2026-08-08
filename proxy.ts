import {NextRequest, NextResponse} from "next/server";
import {jwtVerify} from "jose";

export async function proxy(request: NextRequest) {
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

    try {
        const secret = new TextEncoder().encode(process.env.SECRET_KEY_JWT);

        const {payload} = await jwtVerify(token, secret);

        /* ==========================================
            منع غير الأدمن من لوحة التحكم
        ========================================== */
        if (pathname.startsWith("/dashboard") && payload.role !== "admin") {
            const response = NextResponse.redirect(
                new URL("/login", request.url),
            );
            response.cookies.delete("token");
            return response;
        }

        /* ==========================================
            منع الأدمن من الرجوع لصفحة تسجيل الدخول
        ========================================== */
        if (pathname === "/login") {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    } catch {
        if (pathname === "/login") {
            return NextResponse.next();
        }

        return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/login"],
};
