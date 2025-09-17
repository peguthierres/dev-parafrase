/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Remove static export for now to allow API routes
  // output: 'export',
  trailingSlash: true,
  distDir: '.next',
}

export default nextConfig
