import { collection, Firestore, FirestoreDataConverter, onSnapshot, query, QueryDocumentSnapshot } from "firebase/firestore"
import { database } from "@fb/config"
import { DogModel } from "@models/DogModel";

const dogConverter: FirestoreDataConverter<DogModel, DogModel> = {
    toFirestore: (data: DogModel) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as DogModel
}

type DogRepositoryListener = (dogs: DogModel[]) => void

class DogRepository {
    database: Firestore;

    constructor(database: Firestore) {
        this.database = database
    }

    subscribeForAllDogs(listener: DogRepositoryListener) {
        const q = query(
            collection(database, "dogs").withConverter(dogConverter)
        )
        return onSnapshot(q, (snap) => {
            var t = snap.docs.map(t => t.data())
            console.log(t)
            listener(t)
        })
    }

    subscribeForDogs(dogIds: string[], listener: DogRepositoryListener) {

    }
}

const dogRepository = new DogRepository(database)
export default dogRepository