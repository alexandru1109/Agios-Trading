// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: 'build',
    },
    publicDir: 'public', // Asigură-te că Vite folosește directorul corect pentru fișiere publice
});
