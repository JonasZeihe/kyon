// next.config.ts
const repo = process.env.GITHUB_REPOSITORY
  ? process.env.GITHUB_REPOSITORY.split('/')[1]
  : ''
const isCI = process.env.GITHUB_ACTIONS === 'true'
const isStaticExport = process.env.STATIC_EXPORT === 'true'
const isGhTarget = process.env.DEPLOY_TARGET === 'gh' || isCI || isStaticExport

const inferredBase = repo ? `/${repo}` : ''
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ?? (isGhTarget ? inferredBase : '')
const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX ?? basePath

const nextConfig = {
  reactStrictMode: true,
  compiler: { styledComponents: true },
  basePath: basePath || undefined,
  assetPrefix: assetPrefix ? `${assetPrefix}/` : undefined,
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    unoptimized: !!isGhTarget,
  },
  output: isGhTarget ? 'export' : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_ASSET_PREFIX: assetPrefix,
    FEATURE_BASEPATH_REWRITE: process.env.FEATURE_BASEPATH_REWRITE ?? 'true',
  },
}

module.exports = nextConfig
