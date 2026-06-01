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
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@components': path.resolve(__dirname, './src/components'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@fb': path.resolve(__dirname, './src/firebase'),
      '@models': path.resolve(__dirname, './src/models'),
      '@repos': path.resolve(__dirname, './src/repositories'),
      '@helpers': path.resolve(__dirname, './src/helpers')
    }
  }
})
