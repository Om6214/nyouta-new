import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.xlsx"],
  optimizeDeps: {
    exclude: ["fabric"], // Prevents Vite from optimizing Fabric.js
  },
  ssr: {
    noExternal: ["fabric"], // Ensures Fabric.js is not processed in SSR mode
  },
  // build: {
  //   rollupOptions: {
  //     external: ["@ffmpeg/ffmpeg"],
  //   },
  // },
  // server: {
  //   headers: {
  //     "Cross-Origin-Opener-Policy": "same-origin",
  //     "Cross-Origin-Embedder-Policy": "require-corp",
  //   },
  // },

})

