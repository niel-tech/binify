import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function VerifyPage(req: any) {
  const nextCookies = cookies()

  if (!nextCookies.has("validationAttempt")) redirect("/signin")

  return (
    <div>
      <h1 className="text-3xl text-emerald-700">Email has been sent successful</h1>
      <p className="my-4">Click link in received mail in order to login</p>
    </div>
  )
}
