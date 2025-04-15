import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist'
  },
  define: {
    'import.meta.env.VITE_OPENROUTER_KEY': JSON.stringify(process.env.VITE_OPENROUTER_KEY)
  }
});