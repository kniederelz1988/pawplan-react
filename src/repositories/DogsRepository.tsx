import { Firestore, collection, FirestoreDataConverter, onSnapshot, query, QueryDocumentSnapshot, where, documentId, addDoc, doc, updateDoc } from "firebase/firestore"
import { database } from "@fb/config"
import { DogModel } from "@models/DogModel";
import { RepositoryOperationCallback } from "./utils/RepositoryOperationCallback";
import { getRepositoryOperationErrorMessage, RepositoryOperationErrorEnum } from "./helpers/RepositoryOperationErrorMessages";
import { RepositoryOperationStatusEnum } from "./enums/RepositoryOperationStatus";

const dogConverter: FirestoreDataConverter<DogModel, DogModel> = {
    toFirestore: (data: DogModel) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) => {
        const d = snap.data() as DogModel
        d.id = snap.id
        return d
    }
}

type DogRepositoryListener = (dogs: DogModel[]) => void

function DogRepository({ database } : { database: Firestore }) {
    const collectionName = "dogs"

    function subscribeForAllDogs(listener: DogRepositoryListener) {
        const q = query(
            collection(database, "dogs")
        ).withConverter(dogConverter)
        
        return onSnapshot(q, (snap) => {
            const data = snap.docs.map(t => t.data())
            listener(data)
        })
    }

    function subscribeForDogs(dogIds: string[], listener: DogRepositoryListener) {
        if (dogIds.length == 0)
            return

        const q = query(
            collection(database, "dogs"),
            where(documentId(), "in", dogIds)
        ).withConverter(dogConverter)

        return onSnapshot(q, (snap) => {
            const data = snap.docs.map(t => t.data())
            listener(data)
        })
    }

    async function createDog(dog: DogModel, operationCallback: RepositoryOperationCallback) {
        if (dog.id) {
            const e = getRepositoryOperationErrorMessage(RepositoryOperationErrorEnum.UndefinedData)
            operationCallback(RepositoryOperationStatusEnum.Error, e)
            return
        }
            
        try {
            await addDoc(collection(database, collectionName), dog)
        } catch (error) {
            const e = getRepositoryOperationErrorMessage(error)
            operationCallback(RepositoryOperationStatusEnum.Error, e)
            return;
        }

        operationCallback(RepositoryOperationStatusEnum.Success)
    }
    async function updateDog(dog: DogModel, operationCallback: RepositoryOperationCallback) {
        if (!dog?.id) {
            const e = getRepositoryOperationErrorMessage(RepositoryOperationErrorEnum.UndefinedData)
            operationCallback(RepositoryOperationStatusEnum.Error, e)
            return
        }

        try {
            const d = doc(collection(database, "dogs"), dog.id)
            await updateDoc(d, dog)
        } catch (error) {
            const e = getRepositoryOperationErrorMessage(error)
            operationCallback(RepositoryOperationStatusEnum.Error, e)
            return;
        }

        operationCallback(RepositoryOperationStatusEnum.Success)
    }

    return { 
        subscribeForAllDogs, 
        subscribeForDogs, 
        createDog,
        updateDog
    }
}

const dogRepository = DogRepository({ database })
export default dogRepository