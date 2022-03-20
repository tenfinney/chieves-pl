
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
}

module.exports = nextConfig
