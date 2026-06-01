import { Firestore, collection, FirestoreDataConverter, onSnapshot, query, QueryDocumentSnapshot, where, documentId, addDoc, doc } from "firebase/firestore"
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

class DogRepository {
    database: Firestore;

    constructor(database: Firestore) {
        this.database = database
    }

    subscribeForAllDogs(listener: DogRepositoryListener) {
        const q = query(
            collection(database, "dogs")
        ).withConverter(dogConverter)
        
        return onSnapshot(q, (snap) => {
            const data = snap.docs.map(t => t.data())
            listener(data)
        })
    }

    subscribeForDogs(dogIds: string[], listener: DogRepositoryListener) {
        const q = query(
            collection(database, "dogs"),
            where(documentId(), "in", dogIds)
        ).withConverter(dogConverter)

        return onSnapshot(q, (snap) => {
            const data = snap.docs.map(t => t.data())
            listener(data)
        })
    }

    createDog(dog: DogModel, operationResult: DogOperationCallback) {
        if (!dog || dog.id)
            operationResult(dog, "undefined-data")

        const c = collection(database, "dogs")
        addDoc(c, dog)
            .then(
                onSuccess => { 
                    dog.id = onSuccess.id
                    operationResult(dog, null)
                },
                onError => {
                    operationResult(dog, onError)
                }
            )
    }
}

const dogRepository = new DogRepository(database)
export default dogRepository