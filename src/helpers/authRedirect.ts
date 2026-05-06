const AUTH_FROM_KEY = "auth_from"

export function setAuthFrom(path: string): void {
    if (
        !path.includes("/login") &&
        !path.includes("/register")
    ) {
        localStorage.setItem(AUTH_FROM_KEY, path)
    }
}

export function getAuthFrom(): string {
    return localStorage.getItem(AUTH_FROM_KEY) || "/"
}

export function clearAuthFrom(): void {
    localStorage.removeItem(AUTH_FROM_KEY)
}