import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
  root: 'src',
  publicDir: 'public',
  build: {
    outDir: path.resolve('dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve('src', 'index.html'),
        blog: path.resolve('src', 'blog.html'),
        admin: path.resolve('src', 'admin.html'),
        notFound: path.resolve('src', '404.html')
      }
    }
  }
});
