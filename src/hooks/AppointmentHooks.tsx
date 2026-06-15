import { useEffect, useMemo, useState } from "react";

import { VolunteerModel } from "@models/VolunteerModel";

import { Appointment, AppointmentModel, AppointmentStatusModel, PagedAppointmentCollection } from "@models/AppointmentModel";

import appointmentRepository from "@repos/AppointmentRepository";
import { RepositoryOperationStatusEnum } from "@repos/enums/RepositoryOperationStatus";
import { RepositoryDateCompare } from "@repos/enums/RepositoryDate";
import { createAppointmentsMap } from "./helpers/AppointmentMap";
import { sortAppointments as createAppointments } from "./helpers/AppointmentSort";
import { toaster } from "@components/ui/toaster";

export function useAppointmentRepository() {
    function createAppointment(appointment: AppointmentModel, appointmentState: AppointmentStatusModel) {
        appointmentRepository.createAppointment(appointment, appointmentState, (state, result) => {
            switch (state) {
                case RepositoryOperationStatusEnum.Success:
                    toaster.success({ 
                        title: "Visit succesfully added",
                        description: "Please wait for the visit to be confirmed."
                    })
                    return;
                case RepositoryOperationStatusEnum.Error:
                    toaster.error({
                        title: "Visit could not be added",
                        description: `Error: ${result}`
                    })
                    return;
            }
        })
    }

    async function updateAppointment(appointment: Appointment) {
        await appointmentRepository.updateAppointment(appointment.data, (state, result) => {
            switch (state) {
                case RepositoryOperationStatusEnum.Success:
                    toaster.success({ 
                        title: "Visit succesfully updated"
                    })
                    return;
                case RepositoryOperationStatusEnum.Error:
                    toaster.error({
                        title: "Visit could not be updated",
                        description: `Error: ${result}`
                    })
                    return;
            }
        })
        await appointmentRepository.updateAppointmentStatus(appointment.data, appointment.metaData, (state, result) => {
            switch (state) {
                case RepositoryOperationStatusEnum.Success:
                    toaster.success({ 
                        title: "Visit status succesfully updated"
                    })
                    return;
                case RepositoryOperationStatusEnum.Error:
                    toaster.error({
                        title: "Visit status could not be updated",
                        description: `Error: ${result}`
                    })
                    return;
            }
        })
    }
    function deleteAppointment(appointment: Appointment) {
        appointmentRepository.deleteAppointment(appointment.data, (state, result) => {
            switch (state) {
                case RepositoryOperationStatusEnum.Success:
                    toaster.success({ 
                        title: "Visit succesfully removed"
                    })
                    return;
                case RepositoryOperationStatusEnum.Error:
                    toaster.error({
                        title: "Visit could not be removed",
                        description: `Error: ${result}`
                    })
                    return;
            }
        })
    }

    return { createAppointment, updateAppointment, deleteAppointment }
}

export function useVolunteerAppointments(volunteer: VolunteerModel | null) 
    : PagedAppointmentCollection 
{
    const [appointmentModels, setAllAppointments] = useState<AppointmentModel[]>([]) 
    const [appointments, setSortedAppointments] = useState<Appointment[]>([])

    useEffect(() => {
        if (!volunteer?.id) {
            setAllAppointments([])
            return
        }

        return appointmentRepository.subscribeForAppointments(volunteer?.id, setAllAppointments)
    }, [volunteer])

    useEffect(() => {
        const appointmentsMap: Map<string, AppointmentModel> = createAppointmentsMap(appointmentModels)
        return appointmentRepository.subscribeForAppointmentStates(Array.from(appointmentsMap.keys()), (result) => {
            const sortedAppointments = createAppointments(appointmentsMap, result)
            setSortedAppointments(sortedAppointments)
        })
    }, [appointmentModels])

    return { appointments, previousPage: () => {}, previousPageActive: false, nextPage: () => {}, nextPageActive: false }
}

export function useAppointmentCollection(dateCompare: RepositoryDateCompare, elementLimit: number) :
    PagedAppointmentCollection
{
    const [appointmentModels, setAppointmentModels] = useState<AppointmentModel[]>([]) 
    const [appointments, setAppointments] = useState<Appointment[]>([])

    const [page, setPage] = useState(0)
    const [pageCursors, setPageCursors] = useState<AppointmentModel[]>([])

    function setPageCursor(cursor: any) {
        const p = [...pageCursors.slice(0, page), cursor, ...pageCursors.slice(page)]
        setPageCursors(p)
    }
    function getPageCursor() {
        if (page <= 0)
            return null

        if (page >= pageCursors.length)
            return pageCursors[pageCursors.length - 1]

        return pageCursors[page - 1]
    }

    function previousPage() {
        if (page == 0)
            return

        setPage(page - 1)
    }
    const previousPageActive = useMemo(() => page >= 1, [page])
    
    function nextPage() {
        if (page >= pageCursors.length)
            return
        
        setPage(page + 1)
    }
    const nextPageActive = useMemo(() => appointmentModels.length == elementLimit, [appointmentModels] )

    useEffect(() => {
        const pageCursor = getPageCursor()
        return appointmentRepository.subscribeForAllAppointments(dateCompare, pageCursor, elementLimit, (result) => {
            if (result.length == 0) {
                setAppointmentModels([])
            }

            setAppointmentModels(result)
            setPageCursor(result[result.length - 1])
        })
    }, [page])

    useEffect(() => {
        const appointmentsMap: Map<string, AppointmentModel> = createAppointmentsMap(appointmentModels)
        return appointmentRepository.subscribeForAppointmentStates(Array.from(appointmentsMap.keys()), (result) => {
            const appointments = createAppointments(appointmentsMap, result)
            setAppointments(appointments)
        })
    }, [appointmentModels])

    return { 
        appointments, 
        previousPage, 
        previousPageActive, 
        nextPage, 
        nextPageActive
    }
}