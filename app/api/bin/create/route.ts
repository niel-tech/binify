import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { createNewBin, validateSession } from "../../../../lib/fauna"
import { getNextAuthSessionCookie } from "../../../../lib/cookie"
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies"

export async function POST(request: Request, res: any) {
  const req = await request.json()
  const {
    hashed_id,
    text,
    hashed_password,
    hashed_password_repeat,
    readOnce,
    offset,
    unit,
    title,
  }: {
    hashed_id: string
    text: string
    hashed_password?: string
    hashed_password_repeat?: string
    readOnce: boolean
    offset: number
    unit: any
    title?: string
  } = req as any

  let userId: string | undefined
  const cookieStore = cookies()
  const session_token = getNextAuthSessionCookie(cookieStore)

  if (session_token) {
    const res = await validateSession(session_token ?? "")
    userId = res.userId
  }

  if (hashed_password && hashed_password !== hashed_password_repeat) {
    return NextResponse.json(
      {
        errors: ["Password does not match"],
      },
      {
        status: 400,
      }
    )
  }

  if (!hashed_id) {
    return NextResponse.json(
      {
        errors: ["Can not be null hashed_id"],
      },
      {
        status: 400,
      }
    )
  }

  try {
    const bin = await createNewBin(hashed_id, text, hashed_password || null, readOnce, offset, unit, title, userId)

    return NextResponse.json(bin)
  } catch (e: any) {
    return NextResponse.json({ errors: [e] }, { status: 500 })
  }
}
