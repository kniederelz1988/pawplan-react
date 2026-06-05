import { User } from "firebase/auth";

export function getUserInitials(user: User) : string {
    if (user) {
        if (user.displayName) {
            return user.displayName.charAt(0)
        }

        if (user.email) {
            return user.email.charAt(0)
        }
    }

    return "^"
}

export function getUserName(user: User) : string {
    if (user) {
        if (user.displayName) {
            return user.displayName
        }

        if (user.email) {
            return user.email
        }
    }

    return "^"
}