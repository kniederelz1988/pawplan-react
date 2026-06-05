import { Route, Routes } from "react-router-dom"

import DogsOverview from "./pages/main/DogsOverview"
import UserAppointments from "./pages/main/UserAppointments"
import UserProfile from "./pages/main/UserProfile"
import Users from "./pages/admin/Users"

export default function Router() {
    return (
        <Routes>
            <Route path="*" element={<DogsOverview />} />
            <Route path="userAppointments" element={<UserAppointments />} />
            <Route path="userProfile" element={<UserProfile />} />
            <Route path="users" element={<Users />} />
        </Routes>
    )
}