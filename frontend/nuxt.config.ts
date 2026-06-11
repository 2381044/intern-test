import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from 'node:url';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  
  // 1. Beritahu Nuxt bahwa semua file aplikasi ada di folder 'app'
  srcDir: 'app/', 

  css: ['assets/css/main.css'], // Jalur ini akan otomatis mencari di app/assets/css/main.css karena srcDir

  modules: [
    '@element-plus/nuxt',
    '@pinia/nuxt'
  ],

  // 2. Tambahkan konfigurasi Pinia agar otomatis mendeteksi folder stores Anda
  pinia: {
    storesDirs: ['./stores/**'],
  },

  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8000'
    }
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
    // Tambahkan ini agar alias ~ dan @ mengarah ke folder app/ dengan benar
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./app', import.meta.url)),
        '@': fileURLToPath(new URL('./app', import.meta.url)),
      }
    }
  },
});