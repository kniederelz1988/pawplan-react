import { Firestore, collection, FirestoreDataConverter, onSnapshot, query, QueryDocumentSnapshot, where, documentId, addDoc, doc, updateDoc } from "firebase/firestore"
import { database } from "@fb/config"
import { DogModel } from "@models/DogModel";

const dogConverter: FirestoreDataConverter<DogModel, DogModel> = {
    toFirestore: (data: DogModel) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) => {
        const d = snap.data() as DogModel
        d.id = snap.id
        return d
    }
}

type DogRepositoryListener = (dogs: DogModel[]) => void
type DogOperationCallback = (dog: DogModel, error: string | null) => void

function DogRepository({ database } : { database: Firestore }) {

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

    async function createDog(dog: DogModel, operationResult: DogOperationCallback) {
        if (!dog?.id) {
            operationResult(dog, "undefined-data")
            return
        }
            
        const c = collection(database, "dogs")
        await addDoc(c, dog)
            .then(
                _onSuccess => operationResult(dog, null),
                onError => operationResult(dog, onError)
            )
    }
    async function updateDog(dog: DogModel, operationResult: DogOperationCallback) {
        if (!dog?.id) {
            operationResult(dog, "undefined-data")
            return
        }

        const c = collection(database, "dogs")
        const d = doc(c, dog.id)
        await updateDoc(d, dog)
            .then(
                _onSuccess => operationResult(dog, null),
                onError => operationResult(dog, onError)
            )
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