import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import {
  NodeGlobalsPolyfillPlugin as ESBuildGlobalsPolyfillsPlugin
} from '@esbuild-plugins/node-globals-polyfill'
import TSConfigPathsPlugin  from 'rollup-plugin-tsconfig-paths'
import ResolvePlugin from '@rollup/plugin-node-resolve'
import NodePolyfillsPlugin from 'rollup-plugin-polyfill-node'
import CommonJSPlugin from '@rollup/plugin-commonjs'
// import NodePolyfillsPlugin from 'rollup-plugin-node-polyfills'
import InjectPlugin from '@rollup/plugin-inject'

export default defineConfig(
  ({ mode }) => {
    const env = loadEnv(mode, process.cwd())

    const define: Record<string, string> = (
      Object.fromEntries(
        Object.entries(env).map(([key, val]) => {
          if(key.startsWith('VITE_RAW_')) {
            return [key.replace(/^VITE_RAW_/, ''), val]
          } else if(key.startsWith('VITE_')) {
              return [key.replace(/^VITE_/, ''), JSON.stringify(val)]
          } else {
            return null
          }
        }).filter((v) => !!v)
      )
    )

    console.info({ define: Object.fromEntries(
      Object.entries(define).map(([key, val]) => (
        [key, val.replace(/\w/g, '•')]
      ))
    ) })

    return {
      plugins: [
        // ResolvePlugin({
        //   browser: true,
        //   preferBuiltins: true,
        //   mainFields: ['browser'],
        // }),
        TSConfigPathsPlugin(),
        NodePolyfillsPlugin({
          // include: null,
        }),
        react(),
      ],
      build: {
        target: ['ES2020'],
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
          // dynamicRequireTargets: ['**/react/**'],
          // esmExternals: ['react-helmet']
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
            CommonJSPlugin(),
          ],
        },
      },
      optimizeDeps: {
        esbuildOptions: {
          sourcemap: true,
          define: {
            global: 'globalThis',
          },
          plugins: [
            ESBuildGlobalsPolyfillsPlugin({
              process: true,
              buffer: true
            }),
          ],
        },
      },
      resolve: {
        alias: {
          http: 'stream-http',
          https: 'https-browserify',
          stream: 'stream-browserify',
          util: 'util',
        },
      },
      define,
    }
  }
)
