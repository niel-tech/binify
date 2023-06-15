import { Inter, Lora, Quicksand } from "next/font/google"

const inter = Inter({ subsets: ["latin"], display: "swap" })
const lora = Lora({ subsets: ["latin"], display: "swap" })
const quicksand = Quicksand({ subsets: ["latin"], display: "swap", preload: true })

// const localFont = localFont({ src: './GreatVibes-Regular.ttf' })

export { inter, lora, quicksand }
