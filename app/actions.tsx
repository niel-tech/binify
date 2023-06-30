"use client"

import Link, { LinkProps } from "next/link"
import { signIn, signOut } from "next-auth/react"
import { ButtonHTMLAttributes, LinkHTMLAttributes, ReactNode } from "react"
import { Button } from "../components/Button/Button"
import { classNames } from "../utils/classNames"

export function SignOut({
  className,
  children,
  ...props
}: { className?: string; children: ReactNode } & ButtonHTMLAttributes<any>) {
  return (
    <Button
      className={classNames("block w-full border-0 bg-transparent text-black hover:enabled:text-white", className)}
      size="sm"
      onClick={() => signOut({ callbackUrl: "/profile" })}
      {...props}
    >
      {children}
    </Button>
  )
}

export function SignIn({
  className,
  children,
  ...props
}: { className?: string; children: ReactNode } & LinkHTMLAttributes<any>) {
  return (
    <Link className={classNames("font-bold", className)} href="/signin" {...props}>
      {children}
    </Link>
  )
}
