import { useEffect, useState } from "react"
import { getUser, setUser, clearUser } from "../helpers/auth"

export default function useAuth() {
    const [user, setUserState] = useState(null)

    useEffect(() => {
        setUserState(getUser())
    }, [])

    const signIn = (data) => {
        setUser(data)
        setUserState(data)
    }

    const signOut = () => {
        clearUser()
        setUserState(null)
    }

    return { user, signIn, signOut }
}