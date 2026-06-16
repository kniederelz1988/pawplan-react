import { Firestore, collection, FirestoreDataConverter, onSnapshot, query, QueryDocumentSnapshot, where, documentId, addDoc, doc, updateDoc, setDoc, FirestoreError, deleteDoc, limit, orderBy, startAfter, Query, Timestamp } from "firebase/firestore"

import { database } from "@fb/config"

import { AppointmentModel, AppointmentStatusModel } from "@models/AppointmentModel";
import { RepositoryOperationStatusEnum } from "@repos/enums/RepositoryOperationStatus";
import { RepositoryOperationCallback } from "./utils/RepositoryOperationCallback";
import { getRepositoryOperationErrorMessage, RepositoryOperationErrorEnum } from "./helpers/RepositoryOperationErrorMessages";
import { getDateCompareOperator, getDateSortOperator, RepositoryDateCompare } from "./enums/RepositoryDate";

const appointmentConverter: FirestoreDataConverter<AppointmentModel, AppointmentModel> = {
    toFirestore: (data: AppointmentModel) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) => {
        const d = snap.data() as AppointmentModel
        d.id = snap.id
        return d
    }
}
const appointmentStatusConverter: FirestoreDataConverter<AppointmentStatusModel, AppointmentStatusModel> = {
    toFirestore: (data: AppointmentStatusModel) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as AppointmentStatusModel
}

type AppointmentsListener = (appointments: AppointmentModel[]) => void
type AppointmentStatesListener = (appointmentStates: Map<string, AppointmentStatusModel>) => void

function AppointmentRepository({ database } : { database: Firestore }) {
    const collectionName = "appointments2";
    const statusCollectionName = "appointmentsStatus"

    function createAppointmentQuery(dateCompare: RepositoryDateCompare, queryCursor: AppointmentModel | null, queryLimit: number)
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
        const q = createAppointmentQuery(date, queryCursor, queryLimit)
        return onSnapshot(q, (snap) => {
            const data = snap.docs.map(t => t.data())
            listener(data)
        })
    }

    function subscribeForAppointments(volunteerId: string, listener: AppointmentsListener) {
        if (!volunteerId)
            return

        const q = query(
            collection(database, collectionName),
            orderBy("createdAt", "desc"),
            where("volunteerId", "==", volunteerId),
            limit(20),
        ).withConverter(appointmentConverter)

        return onSnapshot(q, (snap) => {
            const data = snap.docs.map(t => t.data())
            listener(data)
        })
    }
    function subscribeForAppointmentStates(appoinmentIds: string[], listener: AppointmentStatesListener) {
        if (!appoinmentIds.length)
            return

        const q = query(
            collection(database, statusCollectionName),
            where(documentId(), "in", appoinmentIds)
        ).withConverter(appointmentStatusConverter)

        return onSnapshot(q, (snap) => {
            const data = new Map(snap.docs.map(t => [t.id, t.data()]))
            listener(data)
        })
    }

    async function createAppointment(
        appointment: AppointmentModel, 
        appointmentState: AppointmentStatusModel, 
        operationCallback: RepositoryOperationCallback
    ) {
        if (!appointment || !appointmentState) {
            const e = getRepositoryOperationErrorMessage(RepositoryOperationErrorEnum.UndefinedData)
            operationCallback(RepositoryOperationStatusEnum.Error, e)
            return
        }
    
        try {
            const t = await addDoc(collection(database, collectionName), appointment)
            await setDoc(doc(collection(database, statusCollectionName), t.id), appointmentState)
        } catch (error) {
            const e = getRepositoryOperationErrorMessage(error)
            operationCallback(RepositoryOperationStatusEnum.Error, e)
            return;
        }

        operationCallback(RepositoryOperationStatusEnum.Success)
    }

    async function updateAppointment(
        appointment: AppointmentModel, 
        operationCallback: RepositoryOperationCallback
    ) {
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
    async function updateAppointmentStatus(
        appointment: AppointmentModel,
        appointmentState: AppointmentStatusModel,
        operationCallback: RepositoryOperationCallback
    ) {
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
        subscribeForAppointments,
        subscribeForAppointmentStates,
        subscribeForAllAppointments,
        createAppointment,
        updateAppointment,
        updateAppointmentStatus,
        deleteAppointment
    }
}

const appointmentRepository = AppointmentRepository({ database })
export default appointmentRepository