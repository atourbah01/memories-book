import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    //base: 'https://github.com/atourbah01/memories-book',
  server: {
    port: 5173,
    strictPort: true,
  },

  plugins: [
    react(),
  ],

  resolve: {
    alias: {
      '@': '/src', // optional but recommended
    },
  },

  build: {
    sourcemap: false,
  },

  optimizeDeps: {
    include: [
      '@mantine/core',
      '@mantine/hooks',
      '@tabler/icons-react',
      'framer-motion',
    ],
    esbuildOptions: {
      sourcemap: false,
    },
  },
});
