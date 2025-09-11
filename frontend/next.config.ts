import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    // @ts-expect-error: turbopack not recognized yet by TS types
    turbopack: false,
  },
}

export default nextConfig
