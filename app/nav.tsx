"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function Nav() {
  return (
    <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ delay: 0.1 }}>
      <nav className="m-auto grid max-w-lg grid-cols-2 items-center px-4 transition-all ">
        <div className="justify-start">
          <Link href="/">
            <h1 className="my-6 text-[1.5rem] font-bold tracking-tight text-gray-900">Binify</h1>
          </Link>
        </div>
        <div className="grid justify-end">Welcome</div>
      </nav>
    </motion.nav>
  )
}
