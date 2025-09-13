/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'kasthuribaicompany.com',
      'www.shoplibas.com',
      'kajols.com',
      'assets0.mirraw.com',
      'images.jdmagicbox.com',
      'sutionline.in',
      'kanooda.com',
      'nayoclothing.com',
      'images.unsplash.com',
      'plus.unsplash.com',
      // Add any other domains your images come from
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        and: [/\.(js|ts|jsx|tsx)$/],
      },
      use: ['@svgr/webpack'],
    })
    return config
  },
}

module.exports = nextConfig
