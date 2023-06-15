import { ReactNode } from "react"
import type { Metadata } from "next"
import { quicksand } from "@/fonts"

// These styles apply to every route in the application
import "styles/tailwind.css"
import Nav from "./nav"
import Footer from "./footer";

export const metadata: Metadata = {
  themeColor: "white",
  title: "Binify - Secure way to share delicate informations",
  description: "Self destroying and crypted text message to share",
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className={quicksand.className} lang="en">
      <body className="bg-[#E6E4DA] dark:bg-white h-screen grid grid-rows-[auto_1fr_auto]">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
