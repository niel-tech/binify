"use client"

import { ReactNode } from "react"
import { Metadata } from "next"
import { motion } from "framer-motion"

export const metadata: Metadata = {
  themeColor: "white",
  title: "Binify - Read the secret",
  description: "Self destroying and crypted text message to share",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function BinLayout({ children }: { children: ReactNode }) {
  return (
    <motion.main
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="mx-auto grid w-full max-w-lg px-4 text-center"
    >
      <section>{children}</section>
    </motion.main>
  )
}
