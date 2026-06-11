import { useState } from "react"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"

import { auth } from "@fb/config"
import { getAuthErrorMessage } from "@fb/FirebaseErrorHelpers"

import { useVolunteerRepository } from "@hooks/VolunteerHooks"

export default function useCreateUser() {
    const { createVolunteer } = useVolunteerRepository()

    const [isLoading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    async function createUser(email: string, password: string, name: string) {
        setLoading(true)

        try {
            const cred = await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(cred.user, { displayName: name })

            createVolunteer(cred.user, name)
            setError(null)
        } catch(err: any) {
            setError(getAuthErrorMessage(err.code))
        }

        setLoading(false)
    }

    return { isLoading, error, createUser }
}