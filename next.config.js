/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    // Disable ESLint during builds since Ultracite handles linting
    ignoreDuringBuilds: true,
  },
  transpilePackages: ['motion'],
  experimental: {
    optimizePackageImports: ['motion'],
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  i18n: {
    locales: ['en', 'ro'],
    defaultLocale: 'en',
  },
};

module.exports = nextConfig;
