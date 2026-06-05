import { createContext, useContext } from "react"
import { User } from "firebase/auth"

import useAuthentication from "@hooks/useAuthentification"
import LoadingPage from "@components/pages/LoadingPage"

const AuthContext = createContext<User | null>(null)

export function AuthProvider({ children } : { 
    children: React.ReactNode
}) {
    const { user, isLoading } = useAuthentication()

    return (
        <AuthContext.Provider value={user}>
        { 
            isLoading 
                ? <LoadingPage />
                : children
        }
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)