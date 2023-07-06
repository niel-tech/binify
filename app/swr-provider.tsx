"use client"
import { ReactElement, ReactNode } from "react"
import { SWRConfig } from "swr"
import { userClient } from "../lib/fauna"

export const SWRProvider = ({ children }: { children: ReactNode | ReactElement | ReactElement[] }) => {
  const fetcher = (query: string, variables: any) => userClient.request(query, variables)

  return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>
}
