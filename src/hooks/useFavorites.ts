import { useEffect, useState } from "react"

const FAVORITES_KEY = "favorites"
const FAVORITES_EVENT = "favorites-change"

function readFavorites(): number[] {
    try {
        const stored = JSON.parse(
            localStorage.getItem(FAVORITES_KEY) || "[]"
        ) as unknown

        return Array.isArray(stored) &&
            stored.every((item) => typeof item === "number")
            ? stored
            : []
    } catch {
        return []
    }
}

export default function useFavorites() {
    const [favorites, setFavorites] = useState<number[]>(readFavorites)

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

    const updateFavorites = (nextFavorites: number[]) => {
        setFavorites(nextFavorites)

        localStorage.setItem(
            FAVORITES_KEY,
            JSON.stringify(nextFavorites)
        )

        window.dispatchEvent(new Event(FAVORITES_EVENT))
    }

    const toggle = (id: number) => {
        const nextFavorites = favorites.includes(id)
            ? favorites.filter((favoriteId) => favoriteId !== id)
            : [...favorites, id]

        updateFavorites(nextFavorites)
    }

    const isFavorite = (id: number) => {
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