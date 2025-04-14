import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import Markdown from 'vite-plugin-md'

export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    Markdown()
  ],
  test: {
    global: true,
    environment: 'happy-dom'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    proxy: {
      // Proxy pour le flux vidéo
      '/video_feed': {
        target: 'http://172.20.10.8:8081',
        changeOrigin: true,
        ws: true,
        configure: (proxy) => {
          proxy.on('error', (err) => {
            console.log('Proxy video error:', err)
          })
        }
      },
      // Proxy pour les endpoints de contrôle
      '/set-color': {
        target: 'http://172.20.10.8:8081',
        changeOrigin: true
      },
      '/control': {
        target: 'http://172.20.10.8:8081',
        changeOrigin: true
      },
      '/stop-tracking': {
        target: 'http://172.20.10.8:8081',
        changeOrigin: true
      },
      '/toggle-motion-detection': {
        target: 'http://172.20.10.8:8081',
        changeOrigin: true
      },
      // Proxy générique pour toutes les autres API
      '/api': {
        target: 'http://172.20.10.8:8081',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    host: '0.0.0.0', // Accessible sur le réseau local
    port: 3000,
    strictPort: true
  },
  optimizeDeps: {
    include: [
      'vue',
      'chart.js',
      'vue-chartjs',
      'firebase/auth'
    ]
  }
})