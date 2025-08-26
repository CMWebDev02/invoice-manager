import { resolve } from 'path';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fontawesome from "@fortawesome/react-fontawesome";

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        // Required to define the @ symbol used with shadcn components.
        //https://dev.to/nedwize/how-to-add-shadcn-to-an-electron-vite-project-dn
        '@': resolve('src/renderer/src')
      }
    },
    plugins: [react(), tailwindcss(), ]
  }
});
