const prod = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: prod ? '/chievemints/' : '',
  webpack: (config) => {
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
        source: '/disburse',
        destination: '/',
        permanent: true,
      },
      {
        source: '/edit',
        destination: '/',
        permanent: true,
      },
      {
        source: '/view',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig