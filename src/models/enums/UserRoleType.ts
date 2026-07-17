export type VolunteerRole = "observer" | "volunteer" | "admin"

export function getUserRoleTitle(role: VolunteerRole) {
    switch (role) {
        case "observer":
            return "Observer"
        case "volunteer":
            return "Volunteer"
        case "admin":
            return "Admin"
    }
}