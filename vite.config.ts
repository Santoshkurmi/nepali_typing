import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa';
import Checker from 'vite-plugin-checker';

Checker({ typescript: true, enableBuild: false })
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),

    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ["bg.jpg"], // cache your txt files
      manifest: {
        name: 'Nepali Typing',
        short_name: 'NepaliTyping',
        description: 'This is to test typing in nepali',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })

  ],
  // base: '/psc_nepali_typing/', 

})
