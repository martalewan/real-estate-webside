const AUTH_FROM_KEY = "auth_from"

export function setAuthFrom(path) {
    if (!path.includes("/login") && !path.includes("/register")) {
        localStorage.setItem(AUTH_FROM_KEY, path)
    }
}

export function getAuthFrom() {
    return localStorage.getItem(AUTH_FROM_KEY) || "/"
}

export function clearAuthFrom() {
    localStorage.removeItem(AUTH_FROM_KEY)
}