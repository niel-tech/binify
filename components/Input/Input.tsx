import { cva, type VariantProps } from "class-variance-authority"
import { twMerge } from "tailwind-merge"
import { InputHTMLAttributes } from "react"
import { ClassProp } from "class-variance-authority/dist/types"

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
        sm: ["text-sm", "h-8"],
        lg: ["text-lg", "h-10"],
      },
    },
    defaultVariants: {
      size: "lg",
    },
  } as any
)

export interface InputProps extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof input> {}

export function Input({ className, ...props }: InputProps) {
  return <input className={twMerge(input({ className } as ClassProp))} {...props} />
}
