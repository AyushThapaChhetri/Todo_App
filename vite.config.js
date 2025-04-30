import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

/* eslint-env node */
export default defineConfig(({ mode }) => {
  // Load .env file based on the current mode (development, production, etc.)
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    server: {
      host: true,
      port: 5173,
      strictPort: true,
      cors: true,
      proxy: {
        "/api": {
          target: env.VITE_API_URL, // Access from loaded .env
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path,
        },
      },
    },
  };
});
