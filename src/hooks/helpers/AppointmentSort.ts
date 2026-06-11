import { Appointment, AppointmentModel, AppointmentStatusModel } from "@models/AppointmentModel"

export function sortAppointments(
    modelMap: Map<string, AppointmentModel>, 
    statusMap: Map<string, AppointmentStatusModel>
) : Appointment[] {
    const appointments: Appointment[] = []

    statusMap.forEach((t, id) => {
        const data = modelMap.get(id)
        if (!data)
            return

        appointments.push({ data: data, metaData: t })
    })

    return appointments
}