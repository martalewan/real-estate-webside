const USER_KEY = "user"

export function getUser() {
    return JSON.parse(localStorage.getItem(USER_KEY))
}

export function setUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function clearUser() {
    localStorage.removeItem(USER_KEY)
}