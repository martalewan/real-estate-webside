import { useEffect, useState } from "react"
import {
    getUser,
    setUser,
    clearUser,
    type User
} from "../helpers/auth"

type UseAuthReturn = {
    user: User | null
    signIn: (user: User) => void
    signOut: () => void
}

export default function useAuth(): UseAuthReturn {
    const [user, setUserState] = useState<User | null>(null)

    useEffect(() => {
        setUserState(getUser())
    }, [])

    const signIn = (user: User): void => {
        setUser(user)
        setUserState(user)
    }

    const signOut = (): void => {
        clearUser()
        setUserState(null)
    }

    return {
        user,
        signIn,
        signOut
    }
}