import { useContext } from "react";
import { AuthContext } from "../AuthContexts";


export const useAuthContext = () => useContext(AuthContext);
