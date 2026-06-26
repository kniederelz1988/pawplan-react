import { useEffect, useState } from "react";

import { VolunteerModel } from "@models/VolunteerModel";
import { DogModel } from "@models/DogModel";

import { Appointment, AppointmentModel, AppointmentRatingModel, AppointmentStatusModel } from "@models/AppointmentModel";

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

export function useAppointmentsFilteredByVolunteer(elementLimit: number) {
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
export function useAppointmentRatingsFilteredByDog(elementLimit: number) 
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
    }, [dog, page])

    useEffect(() => {
        if (ratings.length >= elementLimit) {
            const t = ratings[ratings.length - 1]
            pageCursor.set(t)
        }
    }, [ratings])

    return { ratings, page, ...pageControls, for: setDog }
}

function useAppointments() {
    const [appointmentModels,   setAppointmentModels]       = useState(new Map<string, AppointmentModel>())
    const [statusModels,        setAppointmentStatusModels] = useState(new Map<string, AppointmentStatusModel>())
    const [ratingModels,        setAppointmentRatingModels] = useState(new Map<string, AppointmentRatingModel>())

    const [appointments,        setAppointments]            = useState<Appointment[]>([])

    useEffect(() => {
        const t = setupAppointments(appointmentModels, statusModels, ratingModels)
        setAppointments(t)
    }, [appointmentModels, statusModels, ratingModels])

    return { appointments, appointmentModels, setAppointmentModels, statusModels, setAppointmentStatusModels, ratingModels, setAppointmentRatingModels }
}

export function useAppointmentStatusCollection(states: AppointmentStatus[], elementLimit: number) {
    const [filterByStates, setFilterByStates]       = useState<AppointmentStatus[]>(states)
    const [filterByVolunteer, setFilterByVolunteer] = useState<VolunteerModel | null>(null)

    const collection                                = useAppointments()
    const { page, pageControls, pageCursor }        = usePages<AppointmentStatusModel>()

    useEffect(() => {
        if (!filterByStates.length) {
            collection.setAppointmentStatusModels(new Map<string, AppointmentStatusModel>())
            return
        }

        const cursor = pageCursor.get()
        return appointmentRepository.subscribeForAppointmentStatus(filterByStates, filterByVolunteer, cursor, elementLimit, collection.setAppointmentStatusModels)
    }, [filterByStates, filterByVolunteer, page])

    useEffect(() => {
        if (!collection.statusModels) {
            collection.setAppointmentModels(new Map<string, AppointmentModel>())
            return
        }

        const keys = Array.from(collection.statusModels.keys())
        return appointmentRepository.subscribeForAppointments(keys, collection.setAppointmentModels)
    }, [collection.statusModels])

    useEffect(() => {
        if (!collection.statusModels) {
            collection.setAppointmentRatingModels(new Map<string, AppointmentRatingModel>())
            return
        }

        const keys = Array.from(collection.statusModels.keys())
        return appointmentRepository.subscribeForAppointmentRatings(keys, collection.setAppointmentRatingModels)
    }, [collection.statusModels])

    useEffect(() => {
        if (collection.appointments.length >= elementLimit) {
            const t = collection.appointments[collection.appointments.length - 1]
            if (!t.statusData)
                return

            pageCursor.set(t.statusData)
        }
    }, [collection.appointments])

    return { appointments: collection.appointments, with: setFilterByStates, for: setFilterByVolunteer, page, ...pageControls }
}