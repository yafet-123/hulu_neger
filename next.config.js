/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com'],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    }
    return config
  }
}

module.exports = nextConfig
