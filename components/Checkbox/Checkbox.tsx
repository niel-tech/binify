import { cva, type VariantProps } from "class-variance-authority"
import { twMerge } from "tailwind-merge"
import { InputHTMLAttributes } from "react"
import { ClassProp } from "class-variance-authority/dist/types"

const checkbox = cva(
  [
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
    variants: {},
    defaultVariants: {},
  } as any
)

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof checkbox> {}

export function Checkbox({ className, type, ...props }: CheckboxProps) {
  return <input type="checkbox" className={twMerge(checkbox({ className } as ClassProp))} {...props} />
}
