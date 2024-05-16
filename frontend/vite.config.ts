import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    root: '.', // Directorul rădăcină al proiectului
    publicDir: 'public', // Specifică directorul public
    plugins: [react()],
    build: {
        outDir: 'build',
        rollupOptions: {
            input: './public/index.html', // Specifică calea absolută către fișierul index.html
        },
    },
    server: {
        host: '192.168.0.180', // Specifică IP-ul pe care serverul va asculta
        port: 5173, // Specifică portul pe care serverul va rula
    },
});
