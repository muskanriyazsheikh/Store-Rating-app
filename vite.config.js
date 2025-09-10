// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path";

// export default defineConfig({
//   plugins: [react()],
//    proxy: {
//       '/api': 'http://localhost:5000',
//    }
// });


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'src': path.resolve(__dirname, './src')
    }
  },
    server: {
    port: 5173,       // make sure no other server is running on this port
    strictPort: true,  // fail if port is busy
    hmr: true,       
    proxy: {
      '/api': 'http://localhost:5000', // your backend
    },
  },
});
