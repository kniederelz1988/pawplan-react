import { User } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, documentId, Firestore, FirestoreDataConverter, limit, onSnapshot, orderBy, Query, query, QueryDocumentSnapshot, setDoc, startAfter, Timestamp, updateDoc, where } from "firebase/firestore";

import { database } from "@fb/config"
import { VolunteerModel } from "@models/VolunteerModel";
import { VolunteerRole, VolunteerRoleEnum } from "@models/enums/UserRoleType";
import { RepositoryOperationCallback } from "./utils/RepositoryOperationCallback";
import { RepositoryOperationStatusEnum } from "./enums/RepositoryOperationStatus";
import { getRepositoryOperationErrorMessage, RepositoryOperationErrorEnum } from "./helpers/RepositoryOperationErrorMessages";
import { VolunteerRoleModel } from "@models/VolunteerRoleModel";

const volunteerConverter: FirestoreDataConverter<VolunteerModel, VolunteerModel> = {
    toFirestore: (data: VolunteerModel) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) => {
        const d = snap.data() as VolunteerModel
        d.id = snap.id
        return d
    }
}
const roleConverter: FirestoreDataConverter<VolunteerRoleModel, VolunteerRoleModel> = {
    toFirestore: (data: VolunteerRoleModel) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as VolunteerRoleModel 
}

type VolunteerRepositoryListener = (result: VolunteerModel[]) => void
type VolunteerRoleRepositoryListener = (result: VolunteerRoleModel) => void

function VolunteerRepository({ database } : { database: Firestore }) {
    const collectionName = "volunteers2";
    const roleCollectionName = "volunteerRoles"

    function subscribeForVolunteer(userId: string, listener: VolunteerRepositoryListener) {
        const q = query(
            collection(database, collectionName),
            where("userId", "==", userId),
            limit(1)
        ).withConverter(volunteerConverter)

        return onSnapshot(q, (snap) => {
            if (snap.empty)
                return

            listener([snap.docs[0].data()])
        })
    }
    function subscribeForVolunteerRole(volunteerId: string, listener: VolunteerRoleRepositoryListener) {
        const q = query(
            collection(database, roleCollectionName),
            where(documentId(), "==", volunteerId),
            limit(1)
        ).withConverter(roleConverter)

        return onSnapshot(q, (snap) => {
            if(snap.empty)
                return

            listener(snap.docs[0].data())
        })
    }
    
    function subscribeForAllVolunteers(queryCursor: VolunteerModel | null, queryLimit: number, listener: VolunteerRepositoryListener) {
        const q = createVolunteerQuery(queryCursor, queryLimit)
        return onSnapshot(q, (snap) => {
            if (snap.empty)
                listener([])

            listener(snap.docs.map(t => t.data()))
        })
    }
    
    function createVolunteerQuery(queryCursor: VolunteerModel | null, queryLimit: number)
        : Query<VolunteerModel, VolunteerModel>
    {
        if (!queryCursor?.id) {
            return query(
                collection(database, collectionName),
                orderBy("name", "desc"),
                limit(queryLimit)
            ).withConverter(volunteerConverter)
        }

        const queryCursorRef = doc(database, collectionName, queryCursor.id)
        return query(
            collection(database, collectionName),
            orderBy("name", "desc"),
            startAfter(queryCursorRef),
            limit(queryLimit)
        ).withConverter(volunteerConverter)
    }

    async function createVolunteer(volunteer: VolunteerModel, operationCallback: RepositoryOperationCallback) {
        if (volunteer.id) {
            const e = getRepositoryOperationErrorMessage(RepositoryOperationErrorEnum.UndefinedData)
            operationCallback(RepositoryOperationStatusEnum.Error, e)
            return
        }
            
        try {
            const role = { role: VolunteerRoleEnum.Observer }

            const t = await addDoc(collection(database, collectionName), volunteer)
            await setDoc(doc(collection(database, roleCollectionName), t.id), role)
        } catch (error) {
            const e = getRepositoryOperationErrorMessage(error)
            operationCallback(RepositoryOperationStatusEnum.Error, e)
            return;
        }

        operationCallback(RepositoryOperationStatusEnum.Success)
    }
    async function updateVolunteer(volunteer: VolunteerModel, operationCallback: RepositoryOperationCallback) {
        if (!volunteer?.id) {
            const e = getRepositoryOperationErrorMessage(RepositoryOperationErrorEnum.UndefinedData)
            operationCallback(RepositoryOperationStatusEnum.Error, e)
            return
        }

        try {
            await updateDoc(doc(collection(database, collectionName), volunteer.id), volunteer)
        } catch (error) {
            const e = getRepositoryOperationErrorMessage(error)
            operationCallback(RepositoryOperationStatusEnum.Error, e)
            return;
        }

        operationCallback(RepositoryOperationStatusEnum.Success)
    }
    async function updateVolunteerRole(volunteer: VolunteerModel, role: VolunteerRole, operationCallback: RepositoryOperationCallback) {
        if (!volunteer?.id) {
            const e = getRepositoryOperationErrorMessage(RepositoryOperationErrorEnum.UndefinedData)
            operationCallback(RepositoryOperationStatusEnum.Error, e)
            return
        }

        try {
            const t = { role: role }
            await updateDoc(doc(collection(database, roleCollectionName), volunteer.id), t)
        } catch (error) {
            const e = getRepositoryOperationErrorMessage(error)
            operationCallback(RepositoryOperationStatusEnum.Error, e)
            return;
        }

        operationCallback(RepositoryOperationStatusEnum.Success)
    }

    async function deleteVolunteer(volunteer: VolunteerModel, operationCallback: RepositoryOperationCallback) {
        if (!volunteer?.id) {
            const e = getRepositoryOperationErrorMessage(RepositoryOperationErrorEnum.UndefinedData)
            operationCallback(RepositoryOperationStatusEnum.Error, e)
            return
        }
        
        try {
            await deleteDoc(doc(collection(database, collectionName), volunteer.id))
            await deleteDoc(doc(collection(database, roleCollectionName), volunteer.id))
        } catch (error) {
            const e = getRepositoryOperationErrorMessage(error)
            operationCallback(RepositoryOperationStatusEnum.Error, e)
            return;
        }

        operationCallback(RepositoryOperationStatusEnum.Success)
    }
    
    async function createVolunteerIfNonExistant(user: User, name: string, operationCallback: RepositoryOperationCallback) {
        const unsubcribe = subscribeForVolunteer(user.uid, (result) => {
            if (!result?.length) {
                const volunteer = result[0]
                volunteer.name = name

                updateVolunteer(volunteer, operationCallback)
                unsubcribe()
                return
            }
            
            const volunteer = { 
                userId: user.uid,
                role: VolunteerRoleEnum.Observer,
                birthday: Timestamp.now(),
                volunteerSince: Timestamp.now(),
                name: name,
            }
            createVolunteer(volunteer, (state, result) => {
                operationCallback(state, result)
                unsubcribe()
            })
        })
    }

    return { subscribeForVolunteer, subscribeForAllVolunteers, subscribeForVolunteerRole, createVolunteer, updateVolunteer, updateVolunteerRole, deleteVolunteer, createVolunteerIfNonExistant }
}

const volunteerRepository = VolunteerRepository({ database })
export default volunteerRepository