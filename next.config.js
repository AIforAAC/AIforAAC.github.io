/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Configure for GitHub Pages
  basePath: '',
  assetPrefix: '',
  distDir: 'out',
}

module.exports = nextConfig
