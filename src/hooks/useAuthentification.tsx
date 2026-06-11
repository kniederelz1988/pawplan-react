import { useEffect, useState } from "react"

import { auth } from "@fb/config" 
import { User, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { getAuthErrorMessage } from "@fb/FirebaseErrorHelpers"

export default function useAuthentification() {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    async function signInUser(email: string, password: string) {
        setLoading(true)

        try {
            await signInWithEmailAndPassword(auth, email, password)
            setError(null)
        } catch(err: any) {
            setError(getAuthErrorMessage(err.code))
        }

        setLoading(false)
    }
    function signOutUser() {
        signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setUser(user)
            setLoading(false)
        })
        
        return unsubscribe
    }, [])

    return { user, isLoading, error, signInUser, signOutUser }
}