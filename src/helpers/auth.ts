const USER_KEY = "user"

export type User = {
    id: string
    name?: string
    email: string
}

export function getUser(): User | null {
    const raw = localStorage.getItem(USER_KEY)

    if (!raw) {
        return null
    }

    try {
        return JSON.parse(raw) as User
    } catch {
        return null
    }
}

export function setUser(user: User): void {
    localStorage.setItem(
        USER_KEY,
        JSON.stringify(user)
    )
}

export function clearUser(): void {
    localStorage.removeItem(USER_KEY)
}