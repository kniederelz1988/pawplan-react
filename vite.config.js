import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import path from 'path'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  resolve: {
    alias: {
      // Alias ^ to the src directory
      '@hooks': path.resolve(import.meta.dirname, './src/hooks'),
      '@components': path.resolve(import.meta.dirname, './src/components'),
      '@contexts': path.resolve(import.meta.dirname, './src/contexts'),
      '@fb': path.resolve(import.meta.dirname, './src/firebase'),
      '@models': path.resolve(import.meta.dirname, './src/models'),
      '@repos': path.resolve(import.meta.dirname, './src/repositories'),
      '@helpers': path.resolve(import.meta.dirname, './src/helpers'),
      '@schemas': path.resolve(import.meta.dirname, './src/schemas')
    }
  }
})
