

import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from 'node:url';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  
  // 🟢 TAMBAHKAN BARIS MODULES INI:
  modules: [
    '@element-plus/nuxt'
  ],

  

  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8000'
    }
  },



  

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
});