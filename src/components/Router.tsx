import { Route, Routes } from "react-router-dom"

import DogsOverview from "./pages/main/DogsOverview"
import UserAppointments from "./pages/main/UserAppointments"
import UserProfile from "./pages/main/UserProfile"

export default function Router() {
    return (
        <Routes>
            <Route path="*" element={<DogsOverview />} />
            <Route path="userAppointments" element={<UserAppointments />} />
            <Route path="userProfile" element={<UserProfile />} />
        </Routes>
    )
}