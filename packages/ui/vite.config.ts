import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsConfigPaths from 'rollup-plugin-tsconfig-paths'
import nodeResolve from '@rollup/plugin-node-resolve'
// import globals from 'rollup-plugin-node-globals'
// import commonjs from "@rollup/plugin-commonjs"
import {  NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
// import { build } from 'esbuild'



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    nodeResolve(),
    tsConfigPaths(),
    react(),
  ],
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
    }
  },
  resolve: {
    alias: {
      http: 'http-browserify',
      https: 'https-browserify',
      stream: "stream-browserify",
      util: 'util',
    }
  },
  define: {
    'process.env': {},
  }
})

