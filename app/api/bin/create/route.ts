import { NextResponse } from "next/server"
import { createNewBin } from "../../../../lib/fauna"

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
  }: {
    hashed_id: string
    text: string
    hashed_password?: string
    hashed_password_repeat?: string
    readOnce: boolean
    offset: number
    unit: any
  } = req as any

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
    const bin = await createNewBin(hashed_id, text, hashed_password || null, readOnce, offset, unit)

    return NextResponse.json(bin)
  } catch (e: any) {
    return NextResponse.json({ errors: [e] }, { status: 500 })
  }
}
