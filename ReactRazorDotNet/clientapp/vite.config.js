import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/app',
    build: {
        outDir: '../wwwroot/dist', // Adjusted output directory
        emptyOutDir: true,
        rollupOptions: {
            output: {
                entryFileNames: 'assets/[name].js',  // No hashing in JS files
                chunkFileNames: 'assets/[name].js',  // No hashing in chunk files
                assetFileNames: 'assets/[name][extname]' // No hashing in assets (CSS, images)
            }
        }
    },
    server: {
        https: true,
        port: 6363,
        strictPort: true,
        proxy: {
            '/api': {
                target: 'http://localhost:5299',
                changeOrigin: true,
                secure: false,
            }
        }
    },
    plugins: [react()],
})