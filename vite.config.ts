import react from '@vitejs/plugin-react-swc'
import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite'

export default defineConfig(({ mode }) => {
  // need to manually load environment variables inside config
  const { VITE_HOMEPAGE } = loadEnv(mode, process.cwd())

  // determine base path
  const base = VITE_HOMEPAGE ? new URL(VITE_HOMEPAGE).pathname : '/'

  return {
    base: mode === 'production' ? base : '/',
    build: { target: 'esnext' },
    plugins: [
      react({
        plugins: [
          ['@swc-jotai/debug-label', {}],
          ['@swc-jotai/react-refresh', {}]
        ]
      }),
      splitVendorChunkPlugin()
    ]
  }
})
