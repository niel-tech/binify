import withBundleAnalyzer from "@next/bundle-analyzer"
import withPlugins from "next-compose-plugins"
import { env } from "./env.mjs"

/**
 * @type {import('next').NextConfig}
 */
const config = withPlugins([[withBundleAnalyzer({ enabled: env.ANALYZE })]], {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "**"
      },
      {
        protocol: "https",
        hostname: "www.gravatar.com",
        port: "",
        pathname: "/avatar/**"
      }
    ]
  },
  reactStrictMode: true,
  experimental: {
    instrumentationHook: true,
    serverActions: true
  },
  rewrites() {
    return [
      { source: "/healthz", destination: "/api/health" },
      { source: "/api/healthz", destination: "/api/health" },
      { source: "/health", destination: "/api/health" },
      { source: "/ping", destination: "/api/health" },
    ]
  },
  eslint: {
    ignoreDuringBuilds: [
      "node_modules",
      "./node_modules",
      "./node_modules/*",
      "./node_modules/@types/node/index.d.ts"
    ]
  },
  typescript: {
    ignoreBuildErrors: true,
  }
})

export default config
