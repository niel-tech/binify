import { redirect } from "next/navigation"
import ReadBin from "./readBin"
import { getBin, readBin } from "../../../lib/fauna"

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
