import { AppointmentModel } from "@models/AppointmentModel"

export function createAppointmentsMap(appointments: AppointmentModel[]) {
    const appointmentsMap: Map<string, AppointmentModel> = new Map()
    
    appointments.forEach(t => {
        if(!t?.id)
            return

        appointmentsMap.set(t.id, t)
    })
    
    return appointmentsMap
}