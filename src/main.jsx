import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'

import { ColorModeProvider } from "@components/ui/color-mode.tsx"
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { AuthProvider } from "@contexts/AuthContexts"
import { DialogueProvider } from "@contexts/DialogueContext"
import { BrowserRouter } from "react-router-dom"
import theme from './theme/theme.ts'

createRoot(document.getElementById('root')).render(
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
