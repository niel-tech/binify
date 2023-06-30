import { Metadata } from "next"
import { ReactNode } from "react"
import Section from "../components/section"

export const metadata: Metadata = {
  themeColor: "white",
  title: "Signin - Binify",
  description: "Self destroying and crypted text message to share",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <Section>{children}</Section>
    </main>
  )
}
