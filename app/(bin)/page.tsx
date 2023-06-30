import { cookies } from "next/headers"
import CreateBin from "./createBin"

export default async function BinPage() {
  const cookieStore = cookies()
  const session_token = cookieStore.get("next-auth.session-token")?.value

  return (
    <div className="my-1 grid">
      <CreateBin isLoggedIn={!!session_token} />
    </div>
  )
}
