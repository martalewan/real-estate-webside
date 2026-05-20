import { useEffect, useState } from "react"

const FAVORITES_KEY = "favorites"
const FAVORITES_EVENT = "favorites-change"

function readFavorites(): string[] {
    try {
        const stored = JSON.parse(
            localStorage.getItem(FAVORITES_KEY) || "[]"
        ) as unknown

        return Array.isArray(stored) &&
            stored.every((item) => typeof item === "string")
            ? stored
            : []
    } catch {
        return []
    }
}

export default function useFavorites() {
    const [favorites, setFavorites] = useState<string[]>(readFavorites)

    useEffect(() => {
        const syncFavorites = () => {
            setFavorites(readFavorites())
        }

        window.addEventListener(FAVORITES_EVENT, syncFavorites)
        window.addEventListener("storage", syncFavorites)

        return () => {
            window.removeEventListener(FAVORITES_EVENT, syncFavorites)
            window.removeEventListener("storage", syncFavorites)
        }
    }, [])

    const updateFavorites = (nextFavorites: string[]) => {
        setFavorites(nextFavorites)

        localStorage.setItem(
            FAVORITES_KEY,
            JSON.stringify(nextFavorites)
        )

        window.dispatchEvent(new Event(FAVORITES_EVENT))
    }

    const toggle = (id: string) => {
        const nextFavorites = favorites.includes(id)
            ? favorites.filter((favoriteId) => favoriteId !== id)
            : [...favorites, id]

        updateFavorites(nextFavorites)
    }

    const isFavorite = (id: string) => {
        return favorites.includes(id)
    }

    const clearFavorites = () => {
        updateFavorites([])
    }

    return {
        favorites,
        toggle,
        isFavorite,
        clearFavorites
    }
}