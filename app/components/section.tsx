"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

export default function Section({ children }: { children: ReactNode }) {
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
