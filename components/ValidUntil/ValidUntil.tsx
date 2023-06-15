import { cva, type VariantProps } from "class-variance-authority"
import { twMerge } from "tailwind-merge"
import { InputHTMLAttributes, useEffect, useState } from "react"
import { ClassProp } from "class-variance-authority/dist/types"

const paragraph = cva(["my-2"], {
  variants: {
    size: {
      sm: ["text-sm", "h-8"],
      lg: ["text-lg", "h-10"],
    },
  },
  defaultVariants: {
    size: "lg",
  },
} as any)

export interface ValidUntilProps extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof paragraph> {
  validUntil: string
}

export function ValidUntil({ className, validUntil, ...props }: ValidUntilProps) {
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000)

    return () => clearInterval(interval)
  }, [validUntil])

  const getTime = () => {
    const time = Date.parse(validUntil) - Date.now()

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)))
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24))
    setMinutes(Math.floor((time / 1000 / 60) % 60))
    setSeconds(Math.floor((time / 1000) % 60))
  }

  return (
    <div className={twMerge(paragraph({ className } as ClassProp), "flex flex-row")} {...props}>
      <p className="justify-start">Destroys in:</p>
      <p className="flex-1 text-end">
        {[
          days >= 1 && `${days} ${days > 1 ? "days" : "day"}`,
          hours >= 1 && `${hours} ${hours > 1 ? "hours" : "hour"}`,
          minutes >= 1 && `${minutes} ${minutes > 1 ? "minutes" : "minute"}`,
          seconds >= 1 && `${seconds} ${seconds > 1 ? "seconds" : "second"}`,
        ]
          .filter(Boolean)
          .join(" ")}
      </p>
    </div>
  )
}
