import { createContext, useContext } from "react"
import { User } from "firebase/auth"

import useAuthentication from "@hooks/useAuthentification"

import LoadingPage from "@components/pages/LoadingPage"

type AuthContextData = {
    user: User | null
    signIn?: (email: string, password: string) => Promise<void>
    signOut?: () => void
}

const AuthContext = createContext<AuthContextData>({ user: null })

export function AuthProvider({ children } : { children: React.ReactNode }) {
    const { user, isLoading, signInUser, signOutUser } = useAuthentication()
    
    return (
        <AuthContext.Provider value={{ user: user, signIn: signInUser, signOut: signOutUser }}>
        { 
            isLoading
                ? <LoadingPage />
                : children
        }
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)