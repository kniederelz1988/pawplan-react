import { useCallback, useEffect, useMemo, useState } from "react";

import { VolunteerModel } from "@models/VolunteerModel";
import { DogModel } from "@models/DogModel";

import { AppointmentModel, AppointmentRatingModel, AppointmentStatusModel } from "@models/AppointmentModel";

import { setupAppointments } from "../../helpers/AppointmentSort";

import appointmentRepository from "@repos/AppointmentRepository";
import { RepositoryOperationStatusEnum } from "@repos/enums/RepositoryOperationStatus";

import { toaster } from "@components/ui/toaster";
import { AppointmentStatus } from "@models/enums/AppointmentStatus";
import { usePages } from "./GenericHooks";

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
    function deleteAppointment(appointment: AppointmentModel) {
        appointmentRepository.deleteAppointment(appointment, (state, result) => {
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

export function useAppointmentsFilteredByVolunteer(elementLimit: number) {
    const [volunteer, setVolunteer] = useState<VolunteerModel | null>(null)

    const { appointments, setAppointmentModels } = useAppointments()

    useEffect(() => {
        if (!volunteer?.id) {
            return
        }

        return appointmentRepository.subscribeForVolunteerAppointments(volunteer, null, elementLimit, setAppointmentModels)
    }, [volunteer, elementLimit, setAppointmentModels])

    return { appointments, for: setVolunteer }
}
export function useAppointmentRatingsFilteredByDog(elementLimit: number) {
    const [dog, setDog] = useState<DogModel | null>(null)
    const [ratings, setRatings]                 = useState<AppointmentRatingModel[]>([])

    const { page, pageControls, activePageCursor, setPageCursor }    = usePages<AppointmentRatingModel>()

    const ratingListener = useCallback((ratings: Map<string, AppointmentRatingModel>) => {
        const entries = Array.from(ratings.values())
        if (entries.length >= elementLimit) {
            setPageCursor(page + 1, entries[entries.length - 1])
        }
            
        setRatings(entries)
    }, [elementLimit, page, setPageCursor, setRatings])
    useEffect(() => {
        if (!dog?.id)
            return

        return appointmentRepository.subscribeForDogAppointmentRatings(dog, activePageCursor, elementLimit, ratingListener)
    }, [dog, activePageCursor, elementLimit, ratingListener])

    useEffect(() => {
        if (ratings.length < elementLimit) 
            return
    
        const t = ratings[ratings.length - 1]
        setPageCursor(page, t)
    }, [ratings, elementLimit, page, setPageCursor])

    return { ratings, page, ...pageControls, for: setDog }
}

function useAppointments() {
    const [appointmentModels,   setAppointmentModels]       = useState(new Map<string, AppointmentModel>())
    const [statusModels,        setAppointmentStatusModels] = useState(new Map<string, AppointmentStatusModel>())
    const [ratingModels,        setAppointmentRatingModels] = useState(new Map<string, AppointmentRatingModel>())

    const appointments = useMemo(() => { 
        return setupAppointments(appointmentModels, statusModels, ratingModels)
    }, [appointmentModels, statusModels, ratingModels])

    return { appointments, appointmentModels, setAppointmentModels, statusModels, setAppointmentStatusModels, ratingModels, setAppointmentRatingModels }
}

export function useAppointmentStatusCollection(states: AppointmentStatus[], elementLimit: number) {
    const [filterByStates, setFilterByStates]       = useState<AppointmentStatus[]>(states)
    const [filterByVolunteer, setFilterByVolunteer] = useState<VolunteerModel | null>(null)

    const { appointments, setAppointmentModels, statusModels, setAppointmentStatusModels, setAppointmentRatingModels } = useAppointments()
    const { page, pageControls, activePageCursor, setPageCursor }        = usePages<AppointmentStatusModel>()

    const statusListener = useCallback((value: Map<string, AppointmentStatusModel>) => {
        const entries = Array.from(value.values())
        if (entries.length >= elementLimit) {
            setPageCursor(page + 1, entries[entries.length - 1])
        }

        setAppointmentStatusModels(value)
    }, [elementLimit, page, setPageCursor, setAppointmentStatusModels])

    useEffect(() => {
        if (!filterByStates.length)
            return

        return appointmentRepository.subscribeForAppointmentStatus(filterByStates, filterByVolunteer, activePageCursor, elementLimit, statusListener)
    }, [filterByStates, filterByVolunteer, activePageCursor, elementLimit, statusListener])

    useEffect(() => {
        if (!statusModels.size)
            return

        const keys = Array.from(statusModels.keys())
        return appointmentRepository.subscribeForAppointments(keys, setAppointmentModels)
    }, [statusModels, setAppointmentModels])

    useEffect(() => {
        if (!statusModels.size)
            return

        const keys = Array.from(statusModels.keys())
        return appointmentRepository.subscribeForAppointmentRatings(keys, setAppointmentRatingModels)
    }, [statusModels, setAppointmentRatingModels])

    return { appointments: appointments, with: setFilterByStates, for: setFilterByVolunteer, page, ...pageControls }
}