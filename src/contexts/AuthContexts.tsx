import { createContext } from "react"
import { User } from "firebase/auth"

type AuthContextData = {
    user: User | null
    signIn?: (email: string, password: string) => Promise<void>
    signOut?: () => void
}

export const AuthContext = createContext<AuthContextData>({ user: null })