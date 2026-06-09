import { useEffect, useState } from "react"

import { VolunteerModel } from "@models/VolunteerModel"
import volunteerRepository from "@repos/VolunteerRepository"
import { useAuthContext } from "@contexts/AuthContexts"

export default function useLocalVolunteer() {
    const { user } = useAuthContext()
    const [volunteer, setVolunteer] = useState<VolunteerModel | null>(null)    

    useEffect(() => {
        if (!user) {
            setVolunteer(null)
            return
        }

        return volunteerRepository.subscribeForVolunteers([user.uid], (t) => {
                if (!t || t.length == 0) {
                    setVolunteer(null)
                    return
                }

                setVolunteer(t[0])
            }
        )
    }, [user])
    
    return volunteer
}