import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsConfigPaths from "rollup-plugin-tsconfig-paths"
import nodeResolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsConfigPaths(),
    react(),
  ]
})
