import { NextResponse } from "next/server"
import { readBin } from "../../../../lib/fauna"

export async function GET(request: Request, { params }: { params: { hashedId: string } }) {
  const { searchParams } = new URL(request.url)
  const hashed_password = searchParams.get("p") || undefined
  const hashed_id = params.hashedId

  try {
    const bin = await readBin(hashed_id, hashed_password)

    return NextResponse.json(bin)
  } catch (e: any) {
    return NextResponse.json({ errors: [e] }, { status: 500 })
  }
}
