
const prod = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: prod ? '/chievemints/' : '',
  webpack: (config, { dev }) => {
    config.module.rules = config.module.rules.map((rule) => {
      if(rule.loader === 'babel-loader') {
        rule.options.cacheDirectory = false
      }
      return rule
    })
    return config
  },
  async redirects() {
    return [
      {
        source: '/disberse',
        destination: '/',
        permanent: true,
      },
      {
        source: '/edit',
        destination: '/',
        permanent: true,
      },
      {
        source: '/disberse',
        destination: '/',
        permanent: true,
      },

    ]
  },
}

module.exports = nextConfig
