import { useCallback, useEffect, useMemo, useState } from "react"

import { User } from "firebase/auth"
import { useAuthContext } from "@contexts/AuthContexts"

import volunteerDogLikesRepository from "@repos/VolunteerDogLikesRepository"
import { VolunteerModel } from "@models/VolunteerModel"
import volunteerRepository from "@repos/VolunteerRepository"

import { DogModel } from "@models/DogModel"
import { VolunteerRole, VolunteerRoleEnum } from "@models/enums/UserRoleType"
import { RepositoryOperationStatusEnum } from "@repos/enums/RepositoryOperationStatus"
import { toaster } from "@components/ui/toaster"
import { usePages } from "@repos/hooks/GenericHooks"

export function useVolunteerRepository() {
    function createVolunteer(user: User, name: string) {
        volunteerRepository.createVolunteerIfNonExistant(user, name, (state, result)  => {
            switch (state) {
                case RepositoryOperationStatusEnum.Success:
                    toaster.success({ 
                        title: "Volunteer succesfully created"
                    })
                    return;
                case RepositoryOperationStatusEnum.Error:
                    toaster.error({
                        title: "Volunteer could not be created",
                        description: `Error: ${result}`
                    })
                    return;
            }
        })
    }

    function updateVolunteer(volunteer: VolunteerModel) {
        volunteerRepository.updateVolunteer(volunteer, (state, result)  => {
            switch (state) {
                case RepositoryOperationStatusEnum.Success:
                    toaster.success({ 
                        title: "Volunteer succesfully updated"
                    })
                    return;
                case RepositoryOperationStatusEnum.Error:
                    toaster.error({
                        title: "Volunteer could not be updated",
                        description: `Error: ${result}`
                    })
                    return;
            }
        })
    }
    function updateVolunteerRole(volunteer: VolunteerModel, role: VolunteerRole) {
        volunteerRepository.updateVolunteerRole(volunteer, role, (state, result) => {
            switch (state) {
                case RepositoryOperationStatusEnum.Success:
                    toaster.success({ 
                        title: "Volunteer role succesfully updated"
                    })
                    return;
                case RepositoryOperationStatusEnum.Error:
                    toaster.error({
                        title: "Volunteer role could not be updated",
                        description: `Error: ${result}`
                    })
                    return;
            }
        })
    }
    function deleteVolunteer(volunteer: VolunteerModel) {
        volunteerRepository.deleteVolunteer(volunteer, (state, result) => {
             switch (state) {
                case RepositoryOperationStatusEnum.Success:
                    toaster.success({ 
                        title: "Volunteer succesfully deleted"
                    })
                    return;
                case RepositoryOperationStatusEnum.Error:
                    toaster.error({
                        title: "Volunteer could not be deleted",
                        description: `Error: ${result}`
                    })
                    return;
            }
        })
    }

    return { createVolunteer, updateVolunteer, updateVolunteerRole, deleteVolunteer }
}

export function useVolunteer() {
    const { user } = useAuthContext()

    const [volunteer, setVolunteer] = useState<VolunteerModel | null>(null)
    const [likedDogs, setLikedDogs] = useState<string[]>([])

    const isFavourite = useCallback((dog: DogModel) => {
        if (!dog?.id)
            return false

        return likedDogs.some(t => t == dog.id)
    }, [volunteer, likedDogs])

    const toggleFavourite = useCallback((dog: DogModel) => {
        if (!volunteer || !dog?.id)
            return

        if (!isFavourite(dog)) {
            volunteerDogLikesRepository.addLike(volunteer, dog, (state, result) => {
                switch (state) {
                    case RepositoryOperationStatusEnum.Error:
                        toaster.error({
                            title: "Like could not be added",
                            description: `Error: ${result}`
                        })
                        return;
                }
            })
        } else {
            volunteerDogLikesRepository.removeLike(volunteer, dog, (state, result) => {
                switch (state) {
                    case RepositoryOperationStatusEnum.Error:
                        toaster.error({
                            title: "Like could not be revoked",
                            description: `Error: ${result}`
                        })
                        return;
                }
            })
        }
    }, [volunteer, likedDogs])

    useEffect(() => {
        if (!user) {
            setVolunteer(null)
            return
        }

        return volunteerRepository.subscribeForVolunteerByUserId(user.uid, (t) => {
            if (!t.length)
                return

            setVolunteer(t[0])
        })
    }, [user])

    useEffect(() => {
        if (!volunteer?.id) {
            setLikedDogs([])
            return
        }

        return volunteerDogLikesRepository.subscribeForVolunteerLikes(volunteer.id, (m) => setLikedDogs(m.map(m => m.dogId)))
    }, [volunteer])

    const likeCounter = useMemo(() => likedDogs.length, [likedDogs])

    return { volunteer, isFavourite, toggleFavourite, likeCounter }
}
export function useVolunteerRole(volunteer: VolunteerModel | null) {
    const [role, setRole] = useState<VolunteerRole>(VolunteerRoleEnum.Observer)
        
    useEffect(() => {
        if (!volunteer?.id) {
            setRole(VolunteerRoleEnum.Observer)
            return
        }

        return volunteerRepository.subscribeForVolunteerRole(volunteer.id, (r) => {
            setRole(r.role)
        })
    }, [volunteer])

    return { role }
}

export function useVolunteerById(id: string | null) {
    const [volunteerId, setVolunteerId] = useState(id)
    const [volunteer, setVolunteer] = useState<VolunteerModel | null>(null)

    useEffect(() => {
        if (!volunteerId) {
            setVolunteer(null)
            return
        }

        return volunteerRepository.subscribeForVolunteer(volunteerId, (t) => {
            if (!t.length) {
                setVolunteer(null)
                return
            }

            setVolunteer(t[0])
        })
    }, [volunteerId])
    
    return { volunteer, forId: setVolunteerId }
}

export function useVolunteerCollection(elementLimit: number) {
    const [volunteers, setVolunteers]       = useState<VolunteerModel[]>([])
    const { page, pageControls, pageCursor }= usePages<VolunteerModel>()

    useEffect(() => {
        const cursor = pageCursor.get()
        return volunteerRepository.subscribeForAllVolunteers(cursor, elementLimit, (result) => {
            if (!result?.length) {
                setVolunteers([])
                return
            }

            setVolunteers(result)

            if (result.length >= elementLimit) {
                pageCursor.set(result[result.length - 1])
            }
        })
    }, [page])
    
    return { volunteers, page, ...pageControls }
}