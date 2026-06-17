import { Route, Routes } from "react-router-dom"

import DogsOverview from "@components/pages/main/DogsOverview"
import UserAppointments from "@components/pages/main/UserAppointments"
import UserProfile from "@components/pages/main/UserProfile"

import AdminUserPage from "@components/pages/admin/AdminUserPage"
import AdminAppointmentPage from "@components/pages/admin/AdminAppointmentPage"
import { useVolunteer, useVolunteerRole } from "@repos/hooks/VolunteerHooks"
import { VolunteerRoleEnum } from "@models/enums/UserRoleType"
import DogsDetails from "@components/pages/main/DogsDetails"

export default function Router() {
    const { volunteer } = useVolunteer()
    const { role } = useVolunteerRole(volunteer)

    return (
        <Routes>
            <Route path="*" element={<DogsOverview />} />
            <Route path="dog/:id" element={<DogsDetails />} />
            <Route path="userAppointments" element={<UserAppointments />} />
            <Route path="userProfile" element={<UserProfile />} />

            { 
                role == VolunteerRoleEnum.Admin &&
                    <>
                        <Route path="admin/users" element={<AdminUserPage />} />
                        <Route path="admin/appointments" element={<AdminAppointmentPage />} />
                    </>
            }
        </Routes>
    )
}