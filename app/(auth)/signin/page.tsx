import { getCsrfToken } from "next-auth/react"
import Signin from "./signin"

export default async function SignInPage() {
  const csrfToken = await getCsrfToken()

  return (
    <div className="my-1 grid">
      <Signin csrfToken={csrfToken} />
    </div>
  )
}
