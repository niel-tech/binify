import { cva, type VariantProps } from "class-variance-authority"
import { ClassProp } from "class-variance-authority/dist/types"
import { InputHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

const input = cva(
  [
    "appearance-none",
    "bg-white",
    "border",
    "border-gray-300",
    "rounded",
    "py-2",
    "px-4",
    "text-gray-700",
    "leading-tight",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-blue-400",
    "focus:border-blue-400",
    "transition-colors",
    "duration-200",
  ],
  {
    variants: {
      size: {
        sm: ["text-sm"],
        lg: ["text-lg"],
      },
    },
    defaultVariants: {
      size: "sm",
    },
  } as any
)

export interface InputProps extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof input> {}

export function Input({ className, ...props }: InputProps) {
  return <input className={twMerge(input({ className } as ClassProp))} {...props} />
}
