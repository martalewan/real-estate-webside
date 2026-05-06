import { properties } from "../data/data"
import PropertyCard from "../components/PropertyCard"

export default function Properties() {
    return (
        <div className="container py-16 space-y-12">

            {/* HEADER */}
            <div>
                <h1 className="font-serif text-5xl">
                    All Properties
                </h1>

                <p className="text-gray-500 mt-2">
                    Explore our curated collection of luxury residences
                </p>

                <div className="divider mt-6" />
            </div>

            {/* GRID */}
            <div className="grid md:grid-cols-3 gap-10">
                {properties.map((p) => (
                    <PropertyCard
                        key={p.id}
                        id={p.id}
                        title={p.title}
                        location={p.location}
                        price={`$${p.price.toLocaleString()}`}
                        images={p.images}
                    />
                ))}
            </div>

        </div>
    )
}