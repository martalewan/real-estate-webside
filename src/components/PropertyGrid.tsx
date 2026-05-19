import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import PropertyCard from "./PropertyCard"
import { getProperties } from "../api/properties"
import type { Property } from "../../backend/src/data.js"

export default function PropertyGrid() {
    const [properties, setProperties] = useState<Property[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getProperties()
            .then(setProperties)
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return (
            <section className="container py-24">
                <p>Loading properties...</p>
            </section>
        )
    }

    return (
        <section className="container py-24">

            <div className="mb-12">
                <h3 className="font-serif text-3xl">
                    Featured Properties
                </h3>

                <div className="divider mt-6" />
            </div>

            <div className="grid md:grid-cols-3 gap-10">

                {properties.slice(0, 3).map((p) => (
                    <PropertyCard
                        key={p.id}
                        id={p.id}
                        title={p.title}
                        location={p.location}
                        price={`$${p.price.toLocaleString()}`}
                        images={p.images}
                        bedrooms={p.bedrooms}
                        bathrooms={p.bathrooms}
                        size={p.size}
                        type={p.type}
                    />
                ))}

            </div>

            <div className="flex justify-end mt-20">
                <Link
                    to="/properties"
                    className="btn"
                >
                    View All Properties
                </Link>
            </div>

        </section>
    )
}