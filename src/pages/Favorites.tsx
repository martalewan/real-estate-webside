import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import useFavorites from "../hooks/useFavorites"
import PropertyCard from "../components/PropertyCard"
import { getProperties } from "../api/properties"
import type { Property } from "../../backend/src/data.js"

export default function Favorites() {
    const { favorites, clearFavorites } = useFavorites()

    const [properties, setProperties] = useState<Property[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getProperties()
            .then(setProperties)
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    const favoriteProperties = properties.filter((property) =>
        favorites.includes(property.id)
    )

    if (loading) {
        return (
            <div className="container py-16">
                <p>Loading favorites...</p>
            </div>
        )
    }

    return (
        <div className="container py-16 space-y-12">

            <div className="flex items-end justify-between gap-6">

                <div>
                    <h1 className="font-serif text-5xl">
                        Saved Properties
                    </h1>

                    <p className="text-gray-500 mt-2">
                        {favoriteProperties.length} saved residences
                    </p>
                </div>

                {favoriteProperties.length > 0 && (
                    <button
                        type="button"
                        onClick={clearFavorites}
                        className="text-sm text-gray-500 hover:text-black transition"
                    >
                        Clear favorites
                    </button>
                )}

            </div>

            {favoriteProperties.length > 0 ? (

                <div className="grid md:grid-cols-3 gap-10">

                    {favoriteProperties.map((property) => (
                        <PropertyCard
                            key={property.id}
                            id={property.id}
                            title={property.title}
                            location={property.location}
                            price={`$${property.price.toLocaleString()}`}
                            images={property.images}
                            bedrooms={property.bedrooms}
                            bathrooms={property.bathrooms}
                            size={property.size}
                            type={property.type}
                        />
                    ))}

                </div>

            ) : (

                <div className="border border-[#eee6dd] bg-white p-10 text-center space-y-4">

                    <h2 className="font-serif text-3xl">
                        No saved properties yet
                    </h2>

                    <p className="text-gray-500">
                        Save properties you like and they’ll appear here.
                    </p>

                    <Link
                        to="/properties"
                        className="btn inline-block"
                    >
                        Browse properties
                    </Link>

                </div>

            )}
        </div>
    )
}