import { Appointment, AppointmentModel, AppointmentRatingModel, AppointmentStatusModel } from "@models/AppointmentModel"

export function setupAppointments(
    modelMap: Map<string, AppointmentModel>, 
    statusMap: Map<string, AppointmentStatusModel>,
    ratingMap: Map<string, AppointmentRatingModel>
) : Appointment[] {
    const appointments: Appointment[] = []

    modelMap.forEach((data, id) => {
        const a = { 
            data:       data, 
            statusData: statusMap.get(id), 
            ratingData: ratingMap.get(id)
        }
        appointments.push(a)

        console.log(a)
    })

    return appointments
}