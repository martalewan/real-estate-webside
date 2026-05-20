import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { getMyProperties } from "../api/properties"
import PropertyCard from "../components/PropertyCard"
import type { Property } from "../../backend/src/data"

export default function MyProperties() {
    const [properties, setProperties] = useState<Property[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getMyProperties()
            .then(setProperties)
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return (
            <div className="container pt-32 pb-16">
                Loading your listings...
            </div>
        )
    }

    return (
        <div className="container pt-32 pb-20 space-y-12">
            <div className="flex items-end justify-between gap-6">
                <div>
                    <p className="text-[11px] tracking-[0.3em] uppercase text-gray-400">
                        Dashboard
                    </p>

                    <h1 className="font-serif text-5xl">
                        My Properties
                    </h1>

                    <p className="text-gray-500 mt-2">
                        {properties.length} listings published
                    </p>
                </div>

                <Link to="/add-property" className="btn">
                    Add Property
                </Link>
            </div>

            {properties.length > 0 ? (
                <div className="grid md:grid-cols-3 gap-10">
                    {properties.map((property) => (
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
                        No listings yet
                    </h2>

                    <p className="text-gray-500">
                        Create your first property listing and it will appear here.
                    </p>

                    <Link to="/add-property" className="btn inline-block">
                        List a property
                    </Link>
                </div>
            )}
        </div>
    )
}