import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // ++++++++++ 添加服务器代理配置 ++++++++++
  server: {
    proxy: {
      // 将所有以 /api 开头的请求代理到后端 Spring Boot 服务器
      '/api': {
        target: 'http://localhost:8686', // 确保这是您后端运行的正确端口！
        changeOrigin: true,
        // 通常不需要 rewrite，因为后端路径也是 /api/...
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
  // +++++++++++++++++++++++++++++++++++++++
})