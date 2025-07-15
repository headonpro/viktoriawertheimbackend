/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'strapi.viktoria-wertheim.de'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'strapi.viktoria-wertheim.de',
        pathname: '/uploads/**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
  transpilePackages: ['framer-motion'],
}

module.exports = nextConfig 