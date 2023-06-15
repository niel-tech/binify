import { FC, ReactElement } from "react"
import { classNames } from "../../utils/classNames"

type InputLabelProps = {
  children: ReactElement
  label: string
  className?: string
}

const InputLabel: FC<InputLabelProps> = ({ children, label, className, ...props }) => {
  return (
    <div
      data-label={label}
      className={classNames(
        "relative whitespace-nowrap before:pointer-events-none before:absolute before:left-0 before:top-[10px] before:z-10 before:block before:rounded-2xl before:bg-gray-400 before:px-2 before:py-0.5 before:text-xs before:text-white before:opacity-0 before:transition-all before:content-[attr(data-label)] focus-within:before:left-[10px] focus-within:before:top-[-10px] focus-within:before:opacity-100",
        className || ""
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default InputLabel
