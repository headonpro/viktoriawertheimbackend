/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
      {
        protocol: 'https',
        hostname: 'reliable-morning-f369ca7d6e.strapiapp.com',
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