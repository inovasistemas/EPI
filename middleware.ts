import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
	const authToken = request.cookies.get("authToken")?.value;

	if (request.nextUrl.pathname === "/entrar") {
		if (authToken) {
			return NextResponse.redirect(new URL("/painel", request.url));
		}

		return NextResponse.next();
	}

	if (!authToken) {
		return NextResponse.redirect(new URL("/entrar", request.url));
	}

	try {
		const decodedAuthToken = Buffer.from(authToken, "base64").toString("utf-8");
		const { user, permission_group } = JSON.parse(decodedAuthToken);

		if (user == null || permission_group == null) {
			return NextResponse.redirect(new URL("/entrar", request.url));
		}
	} catch {
		return NextResponse.redirect(new URL("/entrar", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/((?!_next/static|_next/image|lock.ico|unlock.ico|epi.ico|sair).*)",
	],
};
