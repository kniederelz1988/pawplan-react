import LoadingPage from "@components/pages/LoadingPage";
import useAuthentication from "@hooks/useAuthentification";

import { AuthContext } from "../AuthContexts";

export function AuthProvider({ children }: { children: React.ReactNode; }) {
    const { user, isLoading, signInUser, signOutUser } = useAuthentication();

    return (
        <AuthContext.Provider value={{ user: user, signIn: signInUser, signOut: signOutUser }}>
            {isLoading
                ? <LoadingPage />
                : children}
        </AuthContext.Provider>
    );
}
