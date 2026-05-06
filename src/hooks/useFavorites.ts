import { useEffect, useState } from "react"

const FAVORITES_KEY = "favorites"

type UseFavoritesReturn = {
    favorites: number[]
    toggle: (id: number) => void
    isFavorite: (id: number) => boolean
    clearFavorites: () => void
}

export default function useFavorites(): UseFavoritesReturn {
    const [favorites, setFavorites] = useState<number[]>([])

    useEffect(() => {
        try {
            const stored = JSON.parse(
                localStorage.getItem(FAVORITES_KEY) || "[]"
            ) as unknown

            if (
                Array.isArray(stored) &&
                stored.every((item) => typeof item === "number")
            ) {
                setFavorites(stored)
            }
        } catch (error) {
            console.error(
                "Failed to parse favorites",
                error
            )
        }
    }, [])

    const toggle = (id: number): void => {
        const updated = favorites.includes(id)
            ? favorites.filter((favoriteId) => favoriteId !== id)
            : [...favorites, id]

        setFavorites(updated)

        localStorage.setItem(
            FAVORITES_KEY,
            JSON.stringify(updated)
        )
    }

    const isFavorite = (id: number): boolean => {
        return favorites.includes(id)
    }

    const clearFavorites = (): void => {
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