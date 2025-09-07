import type { NextConfig } from 'next'

const isGH = process.env.GITHUB_ACTIONS === 'true'
const repo = 'kyon'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  output: 'export',
  images: { unoptimized: true },
  assetPrefix: isGH ? `/${repo}/` : undefined,
  basePath: isGH ? `/${repo}` : undefined,
}

export default nextConfig
