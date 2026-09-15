import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'

import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from "@contexts/providers/AuthProvider"
import { DialogueProvider } from "@contexts/providers/DialogueProvider"
import { BrowserRouter } from "react-router-dom"
import theme from './theme/theme.ts'

const root = createRoot(document.getElementById('root'))
root.render(
    <StrictMode>
        <ChakraProvider value={theme}>
            <AuthProvider>
                <DialogueProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </DialogueProvider>
            </AuthProvider>
        </ChakraProvider>
    </StrictMode>
)

if (import.meta.env.DEV) {
  const axe = await import('@axe-core/react')

  axe.default(
    await import('react'),
    await import('react-dom'),
    10000,
  )
}
