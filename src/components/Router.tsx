import { Route, Routes } from "react-router-dom"

import DogsOverview from "@components/pages/main/DogsOverview"
import UserAppointments from "@components/pages/main/UserAppointments"
import UserProfile from "@components/pages/main/UserProfile"

import AdminUserPage from "@components/pages/admin/AdminUserPage"
import AdminAppointmentPage from "@components/pages/admin/AdminAppointmentPage"
import { useVolunteerRole } from "@repos/hooks/VolunteerHooks"
import DogsDetails from "@components/pages/main/DogsDetails"

export default function Router() {
    const role = useVolunteerRole()

    return (
        <Routes>
            <Route path="*" element={<DogsOverview />} />
            <Route path="dog/:id" element={<DogsDetails />} />
            <Route path="userAppointments" element={<UserAppointments />} />
            <Route path="userProfile" element={<UserProfile />} />

            { 
                role == "admin" &&
                    <>
                        <Route path="admin/users" element={<AdminUserPage />} />
                        <Route path="admin/appointments" element={<AdminAppointmentPage />} />
                    </>
            }
        </Routes>
    )
}