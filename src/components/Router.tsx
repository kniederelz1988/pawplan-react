import { Route, Routes } from "react-router-dom"

import DogsOverview from "./pages/main/DogsOverview"
import DogAppointment from "./pages/main/DogAppointment"
import UserFavorites from "./pages/main/UserFavorites"
import UserAppointments from "./pages/main/UserAppointments"
import UserProfile from "./pages/main/UserProfile"

export default function Router() {
    return (
        <Routes>
            <Route path="*" element={<DogsOverview />} />
            <Route path="dogAppointment/:dogId" element={<DogAppointment />} />
            <Route path="userFavorites" element={<UserFavorites />} />
            <Route path="userAppointments" element={<UserAppointments />} />
            <Route path="userProfile" element={<UserProfile />} />
        </Routes>
    )
}