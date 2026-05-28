import { createContext, useContext } from "react"

import useAuthentication from "@hooks/useAuthentification"
import LoadingPage from "@components/pages/LoadingPage"

const AuthContext = createContext({})

export function AuthProvider({ children } : { 
    children: React.ReactNode | React.ReactNode[] 
}) {
    const { user, isLoading } = useAuthentication()

    return (
        <AuthContext.Provider value={{ user, isLoading }}>
        { 
            isLoading 
                ? <LoadingPage />
                : children
        }
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)