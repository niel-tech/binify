import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Profile from "./profile"
import { getNextAuthSessionCookie } from "../../../lib/cookie"
import { SWRProvider } from "../../swr-provider"

export default async function ProfilePage() {
  const cookieStore = cookies()
  const session_token = getNextAuthSessionCookie(cookieStore)

  if (session_token)
    return (
      <SWRProvider>
        <h1 className="mb-6 block text-left text-2xl">My Bin&apos;s</h1>
        <Profile session_token={session_token} />
      </SWRProvider>
    )

  redirect("/signin")
}
