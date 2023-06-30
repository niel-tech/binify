import { cva, type VariantProps } from "class-variance-authority"
import { ClassProp } from "class-variance-authority/dist/types"
import { InputHTMLAttributes, ReactElement, SelectHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

const select = cva(
  [
    "bg-white",
    "border",
    "border-gray-300",
    "rounded",
    "py-2",
    "px-2",
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

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>, VariantProps<typeof select> {
  children: ReactElement | ReactElement[]
}

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <select className={twMerge(select({ className } as ClassProp))} {...props}>
      {children}
    </select>
  )
}
