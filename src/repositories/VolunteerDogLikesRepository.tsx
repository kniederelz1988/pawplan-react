import { addDoc, collection, deleteDoc, doc, Firestore, FirestoreDataConverter, getDocs, onSnapshot, query, QueryDocumentSnapshot, where } from "firebase/firestore";

import { database } from "@fb/config"
import { VolunteerDogLikeModel } from "@models/VolunteerLikeModel";
import { VolunteerModel } from "@models/VolunteerModel";
import { DogModel } from "@models/DogModel";

const modelConverter: FirestoreDataConverter<VolunteerDogLikeModel, VolunteerDogLikeModel> = {
    toFirestore: (data: VolunteerDogLikeModel) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) => {
        return snap.data() as VolunteerDogLikeModel
    }
}

type VolunteerDogLikedRepositoryListener = (result: VolunteerDogLikeModel[]) => void

function VolunteerDogLikesRepository({ database } : { database: Firestore }) {
    const collectionName = "volunteerDogLikes";

    function subscribeForVolunteerLikes(volunteerId: string, listener: VolunteerDogLikedRepositoryListener) {
        const q = query(
            collection(database, collectionName),
            where("volunteerId", "==", volunteerId),
        ).withConverter(modelConverter)

        return onSnapshot(q, (snap) => listener(snap.docs.map(t => t.data())))
    }

    async function addLike(volunteer: VolunteerModel, dog: DogModel) {
        if (!volunteer?.id || !dog?.id)
            return

        const likesCollection = collection(database, collectionName)
        await addDoc(likesCollection, {
            volunteerId: volunteer.id,
            dogId: dog.id
        })
    }
    async function removeLike(volunteer: VolunteerModel, dog: DogModel) {
        if (!volunteer?.id || !dog?.id)
            return

        const q = query(
            collection(database, collectionName),
            where("volunteerId", "==", volunteer.id),
            where("dogId", "==", dog.id)
        )

        const snap = await getDocs(q)

        const deletePromises = snap.docs.map((t) => deleteDoc(doc(database, collectionName, t.id)))
        await Promise.all(deletePromises)
    }

    return { subscribeForVolunteerLikes, addLike, removeLike }
}

const volunteerDogLikesRepository = VolunteerDogLikesRepository({ database })
export default volunteerDogLikesRepository