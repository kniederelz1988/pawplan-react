import { createContext, useContext, useEffect, useState } from "react"
import { User } from "firebase/auth"

import useAuthentication from "@hooks/useAuthentification"
import useVolunteerCollection from "@hooks/useVolunteerCollection"
import volunteerRepository from "@repos/VolunteerRepository"

import LoadingPage from "@components/pages/LoadingPage"
import { Timestamp } from "firebase/firestore"

type AuthContextData = {
    user: User | null
    signIn?: (email: string, password: string) => Promise<void>
    signOut?: () => void
}

const AuthContext = createContext<AuthContextData>({ user: null })

export function AuthProvider({ children } : { 
    children: React.ReactNode
}) {
    const { user, isLoading, signInUser, signOutUser } = useAuthentication()
    const [loadOverwrite, setLoadOverwrite] = useState(false)

    useEffect(() => {
        if (!user) return

        const createVolunteer = async () => {
            setLoadOverwrite(true)
            
            await volunteerRepository.createVolunteerIfNotExistant(user)
            
            setLoadOverwrite(false)
        }

        createVolunteer()
    }, [user])

    return (
        <AuthContext.Provider value={{ user: user, signIn: signInUser, signOut: signOutUser }}>
        { 
            isLoading || loadOverwrite
                ? <LoadingPage />
                : children
        }
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)