"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Session } from "next-auth"
import { useEffect, useRef, useState } from "react"
import { SignIn, SignOut } from "./actions"
import { generateMd5Hash } from "../lib/crypto"

export default function Nav({ session }: { session: Session | null }) {
  const [toggledMenu, setToggledMenu] = useState<boolean>(false)

  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (toggledMenu && ref && ref.current && !ref.current.contains(e.target)) {
        setToggledMenu(false)
      }
    }

    document.addEventListener("mousedown", checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [toggledMenu])

  return (
    <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ delay: 0.1 }}>
      <nav className="m-auto grid max-w-lg grid-cols-2 items-center px-4 transition-all ">
        <div className="justify-start">
          <Link href="/">
            <h1 className="my-6 text-[1.5rem] font-bold tracking-tight text-gray-900">Binify</h1>
          </Link>
        </div>
        <div className="grid justify-end">
          {session?.user ? (
            <div className="relative ml-3">
              <div>
                <button
                  type="button"
                  className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <Image
                    width={35}
                    height={35}
                    className="inline-block rounded-full"
                    src={
                      session.user.image ??
                      `https://www.gravatar.com/avatar/${generateMd5Hash(session.user.email ?? "null")}?s=35&d=${
                        session.user.email ? "retro" : "404"
                      }`
                    }
                    alt={session.user.name ?? ""}
                    onClick={() => setToggledMenu(!toggledMenu)}
                  />
                </button>
              </div>
              {toggledMenu && (
                <div
                  className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white px-2 py-1 text-center shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  ref={ref}
                  onClick={() => setToggledMenu(false)}
                >
                  {session?.user && (
                    <p className="-mx-2 block bg-gray-200 px-2 font-bold">{session.user.email || session.user.name}</p>
                  )}
                  <div className="divide-y-2 divide-gray-400 -mx-2 border-y border-gray-200">
                    <Link
                      href="/profile"
                      className="block p-2 text-sm text-gray-700 hover:bg-gray-100 hover:font-bold"
                      role="menuitem"
                      id="user-menu-item-0"
                    >
                      Profile
                    </Link>
                  </div>
                  <SignOut className="hover:enabled:font-bold my-2" role="menuitem" id="user-menu-item-2">
                    Sign out
                  </SignOut>
                </div>
              )}
            </div>
          ) : (
            <div>
              <SignIn>Sign in</SignIn>
            </div>
          )}
        </div>
      </nav>
    </motion.nav>
  )
}
