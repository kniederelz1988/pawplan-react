import { Route, Routes } from "react-router-dom"

import DogsOverview from "./pages/DogsOverview"
import DogAppointment from "./pages/DogAppointment"
import UserFavorites from "./pages/UserFavorites"
import UserAppointments from "./pages/UserAppointments"
import UserProfile from "./pages/UserProfile"

export default function Router() {
    return (
        <Routes>
            <Route path="" element={<DogsOverview />} />
            <Route path="dogAppointment/:dogId" element={<DogAppointment />} />
            <Route path="userFavorites" element={<UserFavorites />} />
            <Route path="userAppointments" element={<UserAppointments />} />
            <Route path="userProfile" element={<UserProfile />} />
        </Routes>
    )
}