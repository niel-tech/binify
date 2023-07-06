import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    ANALYZE: z
      .enum(["true", "false"])
      .optional()
      .transform((value) => value === "true"),
    NEXT_PUBLIC_SECURE_KEY: z.string(),
    NEXT_PUBLIC_FAUNA_USER_KEY: z.string()
  },
  client: {
    NEXT_PUBLIC_SECURE_KEY: z.string(),
  },
  runtimeEnv: {
    ANALYZE: process.env.ANALYZE,
    NEXT_PUBLIC_SECURE_KEY: process.env.NEXT_PUBLIC_SECURE_KEY,
    NEXT_PUBLIC_FAUNA_USER_KEY: process.env.NEXT_PUBLIC_FAUNA_USER_KEY
  },
})
