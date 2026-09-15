import { Appointment, AppointmentModel, AppointmentRatingModel, AppointmentStatusModel } from "@models/AppointmentModel"

export function setupAppointments(
    modelMap: Map<string, AppointmentModel>, 
    statusMap: Map<string, AppointmentStatusModel>,
    ratingMap: Map<string, AppointmentRatingModel>
) : Appointment[] {
    const appointments: Appointment[] = []

    modelMap.forEach((data, id) => {
        const a = { 
            id:         id,
            data:       data, 
            status:     statusMap.get(id), 
            rating:     ratingMap.get(id)
        }
        appointments.push(a)
    })

    return appointments
}