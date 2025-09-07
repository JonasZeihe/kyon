import type { NextConfig } from 'next'

const isGH = process.env.GITHUB_ACTIONS === 'true'
const repo = 'kyon'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  compiler: {
    styledComponents: true,
  },
  assetPrefix: isGH ? `/${repo}/` : undefined,
  basePath: isGH ? `/${repo}` : undefined,
  trailingSlash: true,
}

export default nextConfig
