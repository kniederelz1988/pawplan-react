import { useEffect, useMemo, useState } from "react";

import { VolunteerModel } from "@models/VolunteerModel";
import { DogModel } from "@models/DogModel";

import { Appointment, AppointmentModel, AppointmentRatingModel, AppointmentStatusModel } from "@models/AppointmentModel";

import { setupAppointments } from "./helpers/AppointmentSort";

import appointmentRepository from "@repos/AppointmentRepository";
import { RepositoryOperationStatusEnum } from "@repos/enums/RepositoryOperationStatus";
import { RepositoryDateCompare } from "@repos/enums/RepositoryDate";

import { toaster } from "@components/ui/toaster";

export function useAppointmentRepository() {
    function createAppointment(appointment: AppointmentModel) {
        appointmentRepository.createAppointment(appointment, (state, result) => {
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

    async function updateAppointment(appointment: AppointmentModel) {
        await appointmentRepository.updateAppointment(appointment, (state, result) => {
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

    async function updateStatus(appointment: AppointmentModel, status: AppointmentStatusModel) {
        await appointmentRepository.updateAppointmentStatus(appointment, status, (state, result) => {
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

    function createRating(appointment: AppointmentModel, rating: AppointmentRatingModel) {
        appointmentRepository.createAppointmentRating(appointment, rating, (state, result) => {
            switch (state) {
                case RepositoryOperationStatusEnum.Success:
                    toaster.success({ 
                        title: "Visit succesfully rated",
                    })
                    return;
                case RepositoryOperationStatusEnum.Error:
                    toaster.error({
                        title: "Visit could not be rated",
                        description: `Error: ${result}`
                    })
                    return;
            }
        })
    }
    async function updateRating(appointment: AppointmentModel, rating: AppointmentRatingModel) {
        appointmentRepository.updateAppointmentRating(appointment, rating, (state, result) => {
            switch (state) {
                case RepositoryOperationStatusEnum.Success:
                    toaster.success({ 
                        title: "Visit succesfully updated",
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
    }

    return { createAppointment, updateAppointment, deleteAppointment, updateStatus, createRating, updateRating }
}

function useAppointments() {
    const [appointmentModels,   setAppointmentModels]   = useState(new Map<string, AppointmentModel>())
    const [statusModels,        setStatusModels]        = useState(new Map<string, AppointmentStatusModel>())
    const [ratingModels,        setRatingModels]        = useState(new Map<string, AppointmentRatingModel>())

    const [appointments,        setAppointments]  = useState<Appointment[]>([])

    useEffect(() => {
        if (!appointmentModels) {
            setStatusModels(new Map<string, AppointmentStatusModel>())
            return
        }

        const keys = Array.from(appointmentModels.keys())
        return appointmentRepository.subscribeForAppointmentStates(keys, setStatusModels)
    }, [appointmentModels])

    useEffect(() => {
        if (!appointmentModels) {
            setRatingModels(new Map<string, AppointmentRatingModel>())
            return
        }

        const keys = Array.from(appointmentModels.keys())
        return appointmentRepository.subscribeForAppointmentRatings(keys, setRatingModels)
    }, [appointmentModels])

    useEffect(() => {
        const t = setupAppointments(appointmentModels, statusModels, ratingModels)
        setAppointments(t)
    }, [appointmentModels, statusModels, ratingModels])

    return { appointments, setAppointmentModels }
}

function usePages<T>() {
    const [page, setPage] = useState(0)
    const [pageCursors, setPageCursors] = useState<T[]>([])

    function setPageCursor(pageCursor: T) {
        const p = [...pageCursors.slice(0, page), pageCursor, ...pageCursors.slice(page + 1)]
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
    const nextPageActive = useMemo(() => page < pageCursors.length, [page, pageCursors])

    return { 
        page:           page,
        pageControls:   { previousPage, previousPageActive, nextPage, nextPageActive },
        pageCursor:     { set: setPageCursor, get: getPageCursor }
    }
}

export function useVolunteerAppointments(elementLimit: number) 
{
    const [volunteer, setVolunteer] = useState<VolunteerModel | null>(null)

    const { appointments, setAppointmentModels } = useAppointments()
    const { page, pageControls, pageCursor }     = usePages<AppointmentModel>()

    useEffect(() => {
        if (!volunteer?.id) {
            setAppointmentModels(new Map<string, AppointmentModel>())
            return
        }

        const c = pageCursor.get()
        return appointmentRepository.subscribeForVolunteerAppointments(volunteer, c, elementLimit, setAppointmentModels)
    }, [volunteer])

    useEffect(() => {
        if (appointments.length >= elementLimit) {
            const t = appointments[appointments.length - 1]
            pageCursor.set(t.data)
        }
    }, [appointments])


    return { appointments, page, ...pageControls, for: setVolunteer }
}
export function useDogAppointmentRatings(elementLimit: number) 
{
    const [dog, setDog] = useState<DogModel | null>(null)

    const [ratings, setRatings]                 = useState<AppointmentRatingModel[]>([])
    const { page, pageControls, pageCursor }    = usePages<AppointmentRatingModel>()

    useEffect(() => {
        if (!dog?.id) {
            setRatings([])
            return
        }

        const c = pageCursor.get()
        return appointmentRepository.subscribeForDogAppointmentRatings(dog, c, elementLimit, (r) => {
            const ratings = Array.from(r.values()) 
            setRatings(ratings) 
        })
    }, [dog])

    useEffect(() => {
        if (ratings.length >= elementLimit) {
            const t = ratings[ratings.length - 1]
            pageCursor.set(t)
        }
    }, [ratings])

    return { ratings, page, ...pageControls, for: setDog }
}

export function useAppointmentCollection(dateCompare: RepositoryDateCompare, elementLimit: number)
{
    const { appointments, setAppointmentModels }    = useAppointments()
    const { page, pageControls, pageCursor }        = usePages<AppointmentModel>()

    useEffect(() => {
        const c = pageCursor.get()
        return appointmentRepository.subscribeForAllAppointments(dateCompare, c, elementLimit, setAppointmentModels)
    }, [page])

    useEffect(() => {
        if (appointments.length >= elementLimit) {
            const t = appointments[appointments.length - 1]
            pageCursor.set(t.data)
        }
    }, [appointments])

    return { appointments, page, ...pageControls }
}