import { useEffect, useState } from "react";

import dogRepository from "@repos/DogsRepository";
import { DogModel } from "@models/DogModel";

export default function useDogsCollection(dogIds: string[]) {
    const [dogs, setDogs] = useState([] as DogModel[])    
    const [filterByIds, filterDogsByIds] = useState(dogIds)

    useEffect(() => {
        if (!filterByIds || filterByIds.length == 0) {
            return dogRepository.subscribeForAllDogs(setDogs)
        }

        return dogRepository.subscribeForDogs(filterByIds, setDogs)
    }, [filterByIds])

    return { dogs, filterDogsByIds }
}