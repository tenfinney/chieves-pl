import path from 'path'
import webpack from 'webpack'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import dotenv from 'dotenv'

// dotenv.config({ path: '.env' })
dotenv.config({ path: '.env.local' })
console.log ({ process, e: process.env.VITE_TEST_VAR })

const config = (env: any) => {
  return ({
    mode: 'production',
    entry: './src/main.tsx',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env),
        // 'process.env.VITE_INFURA_ID': JSON.stringify(process.env.VITE_INFURA_ID),
        'process.env.VITE_IPFS_AUTH_USERNAME': JSON.stringify(process.env.VITE_IPFS_AUTH_USERNAME),
        // 'process.env.VITE_IPFS_AUTH_PASSWORD': JSON.stringify(process.env.VITE_IPFS_AUTH_PASSWORD),

      }),
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
      new CopyPlugin({
        patterns: [
          { from: 'public', to: '.' },
        ],
      }),
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      plugins: [
        new TsconfigPathsPlugin(),
      ],
      fallback: {
        os: require.resolve('os-browserify/browser'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        assert: require.resolve('assert'),
        stream: require.resolve('stream-browserify'),
      }
    },
    optimization: {
      usedExports: true,
    },
    output: {
      clean: true,
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
    },
  })
}

export default config