import { redirect } from "next/navigation"
import { getBin, readBin } from "../../../lib/fauna"
import ReadBin from "./readBin"

export default async function BinPage({ params, searchParams }: any) {
  try {
    let bin = await getBin(params["hashedId"][0])

    if (!bin.isProtected) {
      bin = await readBin(bin.hashed_id)
    }

    return (
      <div className="my-1 grid">
        <ReadBin bin={bin} />
      </div>
    )
  } catch (e: any) {}

  redirect(`/?e=not-found`)
}
