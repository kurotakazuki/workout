import { resolve } from 'path'
import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json'

const root = resolve(__dirname, 'src')
const pagesDir = resolve(root, 'pages')
const assetsDir = resolve(root, 'assets')
const outDir = resolve(__dirname, 'dist')
const publicDir = resolve(__dirname, 'public')

export default defineConfig({
  plugins: [solidPlugin(), crx({ manifest })],
  resolve: {
    alias: {
      '@src': root,
      '@assets': assetsDir,
      '@pages': pagesDir,
    },
  },
  publicDir,
})
