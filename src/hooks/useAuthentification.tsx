import { useEffect, useState } from "react"

import { auth } from "@fb/config" 
import { User, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"

type UseAuthenficationResult = {
    user: User | null;
    isLoading: boolean;
    error: string | null;
    signInUser: (email: string, password: string) => Promise<void>;
    createUser: (email: string, password: string) => Promise<void>;
    signOutUser: () => void;
}

export default function useAuthentification() : UseAuthenficationResult {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    function getErrorMessage(code: string) : string {
        switch(code) {
            case "auth/invalid-email":
                return "E-Mail not valid"
            case "auth/email-already-in-use":
                return "E-Mail is already in use"
            case "auth/invalid-credential":
                return "Login data not valid"
            case "auth/missing-password":
                return "Password not valid"
        }

        return "Unknown error"
    }

    async function signInUser(email: string, password: string) {
        setLoading(true)

        try {
            await signInWithEmailAndPassword(auth, email, password)
            setError(null)
        } catch(err: any) {
            console.error(err.code)
            setError(getErrorMessage(err.code))
        }

        setLoading(false)
    }
    async function createUser(email: string, password: string) {
        setLoading(true)

        try {
            await createUserWithEmailAndPassword(auth, email, password)
            setError(null)
        } catch(err: any) {
            console.error(err.code)
            setError(getErrorMessage(err.code))
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

    return { user, isLoading, error, signInUser, createUser, signOutUser }
}