import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.dodostatic.net',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'cdn.dodostatic.net',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'cdn.inappstory.ru',
        port: '',
      },
    ],
  },
  webpack: config => {
    config.resolve.fallback = {
      fs: false,
      path: false,
      os: false,
    }
    return config
  },
}

export default nextConfig
