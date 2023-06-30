import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies"
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"

export function getNextAuthSessionCookie(cookieStore: RequestCookies | ReadonlyRequestCookies) {
  const secureCookie = process.env.NEXTAUTH_URL?.startsWith("https://") ?? !!process.env.VERCEL
  const cookieName = secureCookie ? "__Secure-next-auth.session-token" : "next-auth.session-token"

  return cookieStore.get(cookieName)?.value
}
