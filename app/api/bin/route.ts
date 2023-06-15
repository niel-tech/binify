import { NextResponse } from "next/server"
import { getBin } from "../../../lib/fauna"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const hashed_id = searchParams.get("hashed_id") as string

  try {
    const bin = await getBin(hashed_id)

    return NextResponse.json(bin)
  } catch (e: any) {
    return NextResponse.json({ errors: [e] }, { status: 500 })
  }
}
