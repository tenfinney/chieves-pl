import path from 'path'
import webpack from 'webpack'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'

const config: webpack.Configuration = {
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
      'process.env': JSON.stringify(process.env)
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
}

export default config