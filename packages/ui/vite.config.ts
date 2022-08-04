import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsConfigPaths from 'rollup-plugin-tsconfig-paths'
import ResolvePlugin from '@rollup/plugin-node-resolve'
import {  NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
// import { build } from 'esbuild'
import NodePolyfillsPlugin from 'rollup-plugin-polyfill-node'
// import NodePolyfillsPlugin from 'rollup-plugin-node-polyfills'
// import { viteCommonjs as ViteCommonJSPlugin } from '@originjs/vite-plugin-commonjs'
import CommonJSPlugin from '@rollup/plugin-commonjs'
import InjectPlugin from '@rollup/plugin-inject'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    ResolvePlugin({
      browser: true,
      preferBuiltins: true,
      mainFields: ['browser'],
    }),
    tsConfigPaths(),
    NodePolyfillsPlugin(),
    react(),
    ],
  build: {
    minify: false,
    sourcemap: true,
    polyfillModulePreload: false,
    commonjsOptions: {
      // exclude: [/tslib/],
      include: [/node_modules/],
      transformMixedEsModules: true,
      ignoreGlobal: false,
      requireReturnsDefault: false,
      // defaultIsModuleExports: true,
      esmExternals: []
    },
    rollupOptions: {
      // external: ["react", "react-dom"],
      // output: {
      //   globals: { // for UMD build
      //     react: 'React',
      //     'react-dom': 'ReactDOM',
      //   },
      // },
      plugins: [
        InjectPlugin({ Buffer: ['buffer', 'Buffer'] }),
        CommonJSPlugin({
          exclude: [/./],
          include: [/\breact\b/],
        }),
      ],
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      sourcemap: false,
      define: {
        global: 'globalThis',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true
        }),
      ],
    },
  },
  resolve: {
    alias: {
      http: 'http-browserify',
      https: 'https-browserify',
      stream: 'stream-browserify',
      util: 'util',
    },
  },
  define: {
    'process.env': {},
  },
})

