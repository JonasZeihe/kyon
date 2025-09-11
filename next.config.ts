// next.config.ts
import type { NextConfig } from 'next'
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? ''
const isCI = process.env.GITHUB_ACTIONS === 'true'
const ghBase = repo ? `/${repo}` : ''
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? (isCI ? ghBase : '')
const asset = process.env.NEXT_PUBLIC_ASSET_PREFIX ?? base
const cfg: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: { unoptimized: true },
  compiler: { styledComponents: true },
  assetPrefix: asset ? `${asset}/` : undefined,
  basePath: base || undefined,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: base,
    NEXT_PUBLIC_ASSET_PREFIX: asset,
    FEATURE_BASEPATH_REWRITE: process.env.FEATURE_BASEPATH_REWRITE ?? 'true',
  },
}
export default cfg
