import { useEffect, useState } from "react"

const FAVORITES_KEY = "favorites"

export default function useFavorites() {
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        try {
            const stored = JSON.parse(localStorage.getItem(FAVORITES_KEY))
            if (Array.isArray(stored)) {
                setFavorites(stored)
            }
        } catch (e) {
            console.error("Failed to parse favorites", e)
        }
    }, [])

    const toggle = (id) => {
        let updated

        if (favorites.includes(id)) {
            updated = favorites.filter((f) => f !== id)
        } else {
            updated = [...favorites, id]
        }

        setFavorites(updated)
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated))
    }

    const isFavorite = (id) => favorites.includes(id)

    const clearFavorites = () => {
        setFavorites([])
        localStorage.removeItem(FAVORITES_KEY)
    }

    return {
        favorites,
        toggle,
        isFavorite,
        clearFavorites
    }
}