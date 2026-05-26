import { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase/config.js"

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setUser(user)
            setIsLoading(false)
        })

        return unsubscribe
    }, [])

    return (
        <AuthContext.Provider value={{ user, isLoading }}>
            {!isLoading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)