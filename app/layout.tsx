import type { Metadata } from "next"
import { getServerSession } from "next-auth/next"
import { ReactNode } from "react"
import { quicksand } from "@/fonts"
import { authOptions } from "@/lib/auth"

// These styles apply to every route in the application
import "styles/tailwind.css"
import Footer from "./footer"
import Nav from "./nav"

export const metadata: Metadata = {
  themeColor: "white",
  title: "Binify - Secure way to share delicate informations",
  description: "Self destroying and crypted text message to share",
  icons: {
    icon: "/favicon.ico",
  },
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions)

  return (
    <html className={quicksand.className} lang="en">
      <body className="grid h-screen grid-rows-[auto_1fr_auto] bg-[#E6E4DA] dark:bg-white">
        <Nav session={session} />
        {children}
        <Footer />
      </body>
    </html>
  )
}
