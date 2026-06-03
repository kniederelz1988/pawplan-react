import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.tsx'

import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { AuthProvider } from "@contexts/AuthContexts"
import { DialogueProvider } from "@contexts/DialogueContext"
import { BrowserRouter } from "react-router-dom"

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ChakraProvider value={defaultSystem}>
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
