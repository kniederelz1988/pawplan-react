import { Route, Routes } from "react-router-dom";
import { Center } from "@chakra-ui/react";

import UserLoginPage from "./authentification/UserLoginPage";
import UserRegisterPage from "./authentification/UserRegisterPage";

function UserAuthRouter() {
    return (
        <Routes>
            <Route path="*" element={<UserLoginPage />} />
            <Route path="/register" element={<UserRegisterPage />} />
        </Routes>
    )
}

export default function UserAuthPage() {
    return (
        <Center>
            <UserAuthRouter />
        </Center>
    )
}