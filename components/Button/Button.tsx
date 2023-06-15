import { cva, type VariantProps } from "class-variance-authority"

import { twMerge } from "tailwind-merge"

const classNames = (...classes: string[]) => {
  return classes
    .filter(Boolean)
    .map((i) => (Array.isArray(i) ? i.join(" ") : i))
    .join(" ")
}

const button = cva(
  [
    "justify-center",
    "inline-flex",
    "items-center",
    "rounded-xl",
    "text-center",
    "border",
    "border-blue-400",
    "transition-colors",
    "delay-50",
    "cursor-pointer",
  ],
  {
    variants: {
      intent: {
        primary: classNames("bg-blue-400", "text-white", "hover:enabled:bg-blue-700"),
        secondary: ["bg-transparent", "text-blue-400", "hover:enabled:bg-blue-400", "hover:enabled:text-white"],
      },
      disabled: {
        true: ["border-gray-400", "text-gray-400", "cursor-not-allowed"],
      },
      size: {
        sm: ["min-w-20", "h-full", "min-h-10", "text-sm", "py-1.5", "px-4"],
        lg: ["min-w-32", "h-full", "min-h-12", "text-lg", "py-2.5", "px-6"],
      },
      underline: { true: ["underline"], false: [] },
    },
    defaultVariants: {
      intent: "primary",
      size: "lg",
    },
  }
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof button> {
  underline?: boolean
  disabled?: boolean
  href?: string
}

export function Button({ className, intent, size, underline, disabled, ...props }: ButtonProps | any) {
  return (
    <button
      className={twMerge(button({ intent, size, className, underline, disabled }))}
      disabled={disabled}
      {...props}
    >
      {props.children}
    </button>
  )
}
