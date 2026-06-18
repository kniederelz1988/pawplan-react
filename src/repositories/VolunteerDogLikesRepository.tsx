import { addDoc, collection, deleteDoc, doc, Firestore, FirestoreDataConverter, getDocs, onSnapshot, query, QueryDocumentSnapshot, where } from "firebase/firestore";

import { database } from "@fb/config"
import { VolunteerDogLikeModel } from "@models/VolunteerLikeModel";
import { VolunteerModel } from "@models/VolunteerModel";
import { DogModel } from "@models/DogModel";
import { RepositoryOperationCallback } from "./utils/RepositoryOperationCallback";
import { getRepositoryOperationErrorMessage } from "../helpers/RepositoryOperationErrorMessages";
import { RepositoryOperationStatusEnum } from "./enums/RepositoryOperationStatus";

const modelConverter: FirestoreDataConverter<VolunteerDogLikeModel, VolunteerDogLikeModel> = {
    toFirestore: (data: VolunteerDogLikeModel) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) => {
        return snap.data() as VolunteerDogLikeModel
    }
}

type VolunteerDogLikesRepositoryListener = (result: VolunteerDogLikeModel[]) => void

function VolunteerDogLikesRepository({ database } : { database: Firestore }) {
    const collectionName = "volunteerDogLikes";

    function subscribeForVolunteerLikes(volunteerId: string, listener: VolunteerDogLikesRepositoryListener) {
        const q = query(
            collection(database, collectionName),
            where("volunteerId", "==", volunteerId),
        ).withConverter(modelConverter)

        return onSnapshot(q, (snap) => listener(snap.docs.map(t => t.data())))
    }
    function subscribeForDogLikes(dogId: string, listener: VolunteerDogLikesRepositoryListener) {
        const q = query(
            collection(database, collectionName),
            where("dogId", "==", dogId),
        ).withConverter(modelConverter)

        return onSnapshot(q, (snap) => listener(snap.docs.map(t => t.data())))
    }

    async function addLike(volunteer: VolunteerModel, dog: DogModel, operationCallback: RepositoryOperationCallback) {
        if (!volunteer?.id || !dog?.id)
            return

        try {
            await addDoc(collection(database, collectionName), {
                volunteerId: volunteer.id,
                dogId: dog.id
            })
        } catch (error) {
            const e = getRepositoryOperationErrorMessage(error)
            operationCallback(RepositoryOperationStatusEnum.Error, e)
            return;
        }

        operationCallback(RepositoryOperationStatusEnum.Success)
    }
    async function removeLike(volunteer: VolunteerModel, dog: DogModel, operationCallback: RepositoryOperationCallback) {
        if (!volunteer?.id || !dog?.id)
            return

        try {
            const q = query(
                collection(database, collectionName),
                where("volunteerId", "==", volunteer.id),
                where("dogId", "==", dog.id)
            )

            const snap = await getDocs(q)
            if (!snap.empty) {
                const deletePromises = snap.docs.map((t) => deleteDoc(doc(database, collectionName, t.id)))
                await Promise.all(deletePromises)
            }
        } catch (error) {
            const e = getRepositoryOperationErrorMessage(error)
            operationCallback(RepositoryOperationStatusEnum.Error, e)
            return
        }

        operationCallback(RepositoryOperationStatusEnum.Success)
    }

    return { subscribeForVolunteerLikes, subscribeForDogLikes, addLike, removeLike }
}

const volunteerDogLikesRepository = VolunteerDogLikesRepository({ database })
export default volunteerDogLikesRepository