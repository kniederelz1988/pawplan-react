import { useEffect, useState } from "react";

import dogRepository from "@repos/DogsRepository";
import { DogModel } from "@models/DogModel";
import { RepositoryOperationStatusEnum } from "@repos/enums/RepositoryOperationStatus";
import { toaster } from "@components/ui/toaster";
import volunteerDogLikesRepository from "@repos/VolunteerDogLikesRepository";
import appointmentRepository from "@repos/AppointmentRepository";

export function useDogRepository() {
    function createDog(dog: DogModel) {
        dogRepository.createDog(dog, (state, result) => {
            switch (state) {
                case RepositoryOperationStatusEnum.Success:
                    toaster.success({ 
                        title: "Dog succesfully added"
                    })
                    return;
                case RepositoryOperationStatusEnum.Error:
                    toaster.error({
                        title: "Dog could not be added",
                        description: `Error: ${result}`
                    })
                    return;
            }
        })
    }

    function updateDog(dog: DogModel) {
        dogRepository.updateDog(dog, (state, result) => {
            switch (state) {
                case RepositoryOperationStatusEnum.Success:
                    toaster.success({ 
                        title: "Dog succesfully updated"
                    })
                    return;
                case RepositoryOperationStatusEnum.Error:
                    toaster.error({
                        title: "Dog could not be updated",
                        description: `Error: ${result}`
                    })
                    return;
            }
        })
    }

    return { createDog, updateDog }
}

export default function useDogsCollection(dogIds: string[]) {
    const { subscribeForAllDogs, subscribeForDogs } = dogRepository

    const [dogs, setDogs] = useState([] as DogModel[])    
    const [filterByIds, filterDogsByIds] = useState(dogIds)

    useEffect(() => {
        if (!filterByIds || filterByIds.length == 0) {
            return subscribeForAllDogs(setDogs)
        }

        return subscribeForDogs(filterByIds, setDogs)
    }, [filterByIds])

    return { dogs, filterDogsByIds }
}
export function useDogLikeCount() {
    const [dog, setDog] = useState<DogModel | null>(null)
    const [likeCount, setLikeCount] = useState(0)

    useEffect(() => {
        if (!dog?.id)
            return

        return volunteerDogLikesRepository.subscribeForDogLikes(dog.id, (r) => {
            setLikeCount(r.length)
        })
    }, [dog])

    return { count: likeCount, for: setDog }
}
export function useDogAppointmentCount() {
    const [dog, setDog] = useState<DogModel | null>(null)
    const [appointmentCount, setAppointmentCount] = useState(0)

    useEffect(() => {
        if (!dog?.id)
            return

        return appointmentRepository.subscribeForAllDogAppointments(dog.id, (r) => {
            setAppointmentCount(r.size)
        })
    }, [dog])

    return { count: appointmentCount, for: setDog }
}