import { useEffect, useState } from "react";

import dogRepository from "@repos/DogsRepository";
import { DogModel } from "@models/DogModel";
import { RepositoryOperationStatusEnum } from "@repos/enums/RepositoryOperationStatus";

export function useDogRepository() {
    function createDog(dog: DogModel) {
        dogRepository.createDog(dog, (state, result) => {
            switch (state) {
                case RepositoryOperationStatusEnum.Success:
                    console.log(state, result)
                    return;
                case RepositoryOperationStatusEnum.Error:
                    console.error(state, result)
                    return;
            }
        })
    }

    function updateDog(dog: DogModel) {
        dogRepository.updateDog(dog, (state, result) => {
            switch (state) {
                case RepositoryOperationStatusEnum.Success:
                    console.log(state, result)
                    return;
                case RepositoryOperationStatusEnum.Error:
                    console.error(state, result)
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