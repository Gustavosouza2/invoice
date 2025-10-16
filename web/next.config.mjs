/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    // Silence known noisy warning from @supabase/realtime-js in dev
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      /@supabase\/realtime-js\/.*Critical dependency: the request of a dependency is an expression/,
    ]
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
