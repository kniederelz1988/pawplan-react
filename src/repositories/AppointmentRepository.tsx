import { Firestore, collection, FirestoreDataConverter, onSnapshot, query, QueryDocumentSnapshot, where, documentId, addDoc, doc, updateDoc, setDoc, deleteDoc, limit, orderBy, startAfter, Query, Timestamp } from "firebase/firestore"

import { database } from "@fb/config"

import { AppointmentModel, AppointmentRatingModel, AppointmentStatusModel } from "@models/AppointmentModel";
import { RepositoryOperationStatusEnum } from "@repos/enums/RepositoryOperationStatus";
import { RepositoryOperationCallback } from "./utils/RepositoryOperationCallback";
import { getRepositoryOperationErrorMessage, RepositoryOperationErrorEnum } from "./helpers/RepositoryOperationErrorMessages";
import { getDateCompareOperator, getDateSortOperator, RepositoryDateCompare, RepositoryDateCompareEnum } from "./enums/RepositoryDate";
import { VolunteerModel } from "@models/VolunteerModel";
import { DogModel } from "@models/DogModel";
import { AppointmentStatusEnum } from "@models/enums/AppointmentStatus";

const appointmentConverter: FirestoreDataConverter<AppointmentModel, AppointmentModel> = {
    toFirestore: (data: AppointmentModel) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) => {
        const d = snap.data() as AppointmentModel
        d.id = snap.id
        return d
    }
}
const statusConverter: FirestoreDataConverter<AppointmentStatusModel, AppointmentStatusModel> = {
    toFirestore: (data: AppointmentStatusModel) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as AppointmentStatusModel
}
const ratingsConverter: FirestoreDataConverter<AppointmentRatingModel, AppointmentRatingModel> = {
    toFirestore: (data: AppointmentRatingModel) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as AppointmentRatingModel
}

type AppointmentsListener = (appointments: Map<string, AppointmentModel>) => void
type AppointmentStatesListener = (appointmentStates: Map<string, AppointmentStatusModel>) => void
type AppointmentRatingsListener = (appointmentRatings: Map<string, AppointmentRatingModel>) => void

function AppointmentRepository({ database } : { database: Firestore }) {
    const collectionName = "appointments2";
    const statusCollectionName = "appointmentsStatus"
    const ratingCollectionName = "appointmentsRating"

    function createAllAppointmentQuery(dateCompare: RepositoryDateCompare, queryCursor: AppointmentModel | null, queryLimit: number)
        : Query<AppointmentModel, AppointmentModel>
    {
        if (!queryCursor?.id) {
            return query(
                collection(database, collectionName),
                where("date", getDateCompareOperator(dateCompare), Timestamp.now()),
                orderBy("date", getDateSortOperator(dateCompare)),
                limit(queryLimit)
            ).withConverter(appointmentConverter)
        }

        return query(
            collection(database, collectionName),
            where("date", getDateCompareOperator(dateCompare), Timestamp.now()),
            orderBy("date", getDateSortOperator(dateCompare)),
            startAfter(queryCursor.date),
            limit(queryLimit)
        ).withConverter(appointmentConverter)
    }
    function subscribeForAllAppointments(date: RepositoryDateCompare, queryCursor: AppointmentModel | null, queryLimit: number, listener: AppointmentsListener) {
        const q = createAllAppointmentQuery(date, queryCursor, queryLimit)
        return onSnapshot(q, (snap) => {
            const data = new Map( snap.docs.map(t => [t.id, t.data()]) )
            listener(data)
        })
    }

    function createVolunteerAppointmentQuery(volunteer: VolunteerModel, queryCursor: AppointmentModel | null, queryLimit: number)
        : Query<AppointmentModel, AppointmentModel>
    {
        if (!queryCursor?.id) {
            return query(
                collection(database, collectionName),
                where("volunteerId", "==", volunteer?.id),
                orderBy("date", getDateSortOperator(RepositoryDateCompareEnum.Future)),
                limit(queryLimit)
            ).withConverter(appointmentConverter)
        }

        return query(
            collection(database, collectionName),
            where("volunteerId", "==", volunteer?.id),
            orderBy("date", getDateSortOperator(RepositoryDateCompareEnum.Future)),
            startAfter(queryCursor.date),
            limit(queryLimit)
        ).withConverter(appointmentConverter)
    }
    function subscribeForVolunteerAppointments(volunteer: VolunteerModel, queryCursor: AppointmentModel | null, queryLimit: number, listener: AppointmentsListener) {
        if (!volunteer?.id)
            return

        const q = createVolunteerAppointmentQuery(volunteer, queryCursor, queryLimit)
        return onSnapshot(q, (snap) => {
            const data = new Map(snap.docs.map(t => [t.id, t.data()]))
            listener(data)
        })
    }

    function subscribeForAppointmentStates(appoinmentIds: string[], listener: AppointmentStatesListener) {
        if (!appoinmentIds.length)
            return

        const q = query(
            collection(database, statusCollectionName),
            where(documentId(), "in", appoinmentIds)
        ).withConverter(statusConverter)

        return onSnapshot(q, (snap) => {
            const data = new Map(snap.docs.map(t => [t.id, t.data()]))
            listener(data)
        })
    }
    function subscribeForAppointmentRatings(appoinmentIds: string[], listener: AppointmentRatingsListener) {
        if (!appoinmentIds.length)
            return

        const q = query(
            collection(database, ratingCollectionName),
            where(documentId(), "in", appoinmentIds)
        ).withConverter(ratingsConverter)

        return onSnapshot(q, (snap) => {
            const data = new Map(snap.docs.map(t => [t.id, t.data()]))
            listener(data)
        })
    }

    function createDogRatingQuery(dog: DogModel, dateCompare: RepositoryDateCompare, queryCursor: AppointmentRatingModel | null, queryLimit: number)
        : Query<AppointmentRatingModel, AppointmentRatingModel>
    {
        if (!queryCursor?.updateAt) {
            return query(
                collection(database, ratingCollectionName),
                where("dogId", "==", dog?.id),
                orderBy("updateAt", getDateSortOperator(dateCompare)),
                limit(queryLimit)
            ).withConverter(ratingsConverter)
        }

        return query(
            collection(database, ratingCollectionName),
            where("dogId", "==", dog?.id),
            orderBy("updateAt", getDateSortOperator(dateCompare)),
            startAfter(queryCursor.updateAt),
            limit(queryLimit)
        ).withConverter(ratingsConverter)
    }
    function subscribeForDogAppointmentRatings(dog: DogModel, queryCursor: AppointmentRatingModel | null, queryLimit: number, listener: AppointmentRatingsListener) {
        if (!dog?.id)
            return

        const q = createDogRatingQuery(dog, RepositoryDateCompareEnum.Past, queryCursor, queryLimit)
        return onSnapshot(q, (snap) => {
            const data = new Map(snap.docs.map(t => [t.id, t.data()]))
            listener(data)
        })
    }
    
    async function createAppointment(appointment: AppointmentModel, operationCallback: RepositoryOperationCallback) {
        if (!appointment) {
            const e = getRepositoryOperationErrorMessage(RepositoryOperationErrorEnum.UndefinedData)
            operationCallback(RepositoryOperationStatusEnum.Error, e)
            return
        }
    
        try {
            const t = await addDoc(collection(database, collectionName), appointment)

            const state: AppointmentStatusModel = {
                appointmentId   : t.id,
                volunteerId     : appointment.volunteerId,
                dogId           : appointment.dogId,
                status          : AppointmentStatusEnum.Pending,
                updateAt        : Timestamp.now(),
                updatedBy       : appointment.volunteerId
            }
            await setDoc(doc(collection(database, statusCollectionName), t.id), state)
        } catch (error) {
            const e = getRepositoryOperationErrorMessage(error)
            operationCallback(RepositoryOperationStatusEnum.Error, e)
            return;
        }

        operationCallback(RepositoryOperationStatusEnum.Success)
    }

    async function updateAppointment(appointment: AppointmentModel, operationCallback: RepositoryOperationCallback) {
        if (!appointment?.id) {
            const e = getRepositoryOperationErrorMessage(RepositoryOperationErrorEnum.UndefinedData)
            operationCallback(RepositoryOperationStatusEnum.Error, e)
            return
        }

        try {
            const c = collection(database, collectionName)
            const d = doc(c, appointment.id)
            await updateDoc(d, appointment)
        } catch (error) {
            const e = getRepositoryOperationErrorMessage(error)
            operationCallback(RepositoryOperationStatusEnum.Error, e)
            return;
        }

        operationCallback(RepositoryOperationStatusEnum.Success)
    }
    async function updateAppointmentStatus(appointment: AppointmentModel, appointmentState: AppointmentStatusModel, operationCallback: RepositoryOperationCallback) {
        if (!appointment?.id || !appointmentState) {
            const e = getRepositoryOperationErrorMessage(RepositoryOperationErrorEnum.UndefinedData)
            operationCallback(RepositoryOperationStatusEnum.Error, e)
            return
        }

        try {
            const c = collection(database, statusCollectionName)
            const d = doc(c, appointment.id)
            await updateDoc(d, appointmentState)
        } catch (error) {
            const e = getRepositoryOperationErrorMessage(error)
            operationCallback(RepositoryOperationStatusEnum.Error, e)
            return;
        }

        operationCallback(RepositoryOperationStatusEnum.Success)
    }

    async function createAppointmentRating(appointment: AppointmentModel, rating: AppointmentRatingModel, operationCallback: RepositoryOperationCallback) {
        if (!appointment?.id || !rating) {
            const e = getRepositoryOperationErrorMessage(RepositoryOperationErrorEnum.UndefinedData)
            operationCallback(RepositoryOperationStatusEnum.Error, e)
            return
        }

        try {
            const c = collection(database, collectionName)
            const t = await doc(c, appointment.id)
            await setDoc(doc(collection(database, ratingCollectionName), t.id), rating)
        } catch (error) {
            const e = getRepositoryOperationErrorMessage(error)
            operationCallback(RepositoryOperationStatusEnum.Error, e)
            return;
        }

        operationCallback(RepositoryOperationStatusEnum.Success)
    }
    async function updateAppointmentRating(appointment: AppointmentModel, rating: AppointmentRatingModel, operationCallback: RepositoryOperationCallback) {
        if (!appointment?.id || !rating) {
            const e = getRepositoryOperationErrorMessage(RepositoryOperationErrorEnum.UndefinedData)
            operationCallback(RepositoryOperationStatusEnum.Error, e)
            return
        }

        try {
            const c = collection(database, collectionName)
            const t = await doc(c, appointment.id)
            await updateDoc(doc(collection(database, ratingCollectionName), t.id), rating)
        } catch (error) {
            const e = getRepositoryOperationErrorMessage(error)
            operationCallback(RepositoryOperationStatusEnum.Error, e)
            return;
        }

        operationCallback(RepositoryOperationStatusEnum.Success)
    }

    async function deleteAppointment(
        appointment: AppointmentModel, 
        operationCallback: RepositoryOperationCallback
    ) {
        if (!appointment?.id) {
            const e = getRepositoryOperationErrorMessage(RepositoryOperationErrorEnum.UndefinedData)
            operationCallback(RepositoryOperationStatusEnum.Error, e)
            return
        }

        try {
            await deleteDoc(doc(collection(database, collectionName), appointment.id))
            await deleteDoc(doc(collection(database, statusCollectionName), appointment.id))
        } catch (error) {
            const e = getRepositoryOperationErrorMessage(error)
            operationCallback(RepositoryOperationStatusEnum.Error, e)
            return;
        }

        operationCallback(RepositoryOperationStatusEnum.Success)
    }

    return { 
        subscribeForAllAppointments,
        subscribeForVolunteerAppointments,
        subscribeForAppointmentStates,
        subscribeForAppointmentRatings,
        subscribeForDogAppointmentRatings,
        createAppointment,
        updateAppointment,
        updateAppointmentStatus,
        createAppointmentRating,
        updateAppointmentRating,
        deleteAppointment
    }
}

const appointmentRepository = AppointmentRepository({ database })
export default appointmentRepository