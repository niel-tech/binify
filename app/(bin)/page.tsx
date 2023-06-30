import { cookies } from "next/headers"
import CreateBin from "./createBin"
import { getNextAuthSessionCookie } from "../../lib/cookie"

export default async function BinPage() {
  const cookieStore = cookies()
  const session_token = getNextAuthSessionCookie(cookieStore)

  return (
    <div className="my-1 grid">
      <CreateBin isLoggedIn={!!session_token} />
    </div>
  )
}
