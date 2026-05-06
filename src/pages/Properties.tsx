import { useSearchParams } from "react-router-dom"
import { properties } from "../data/data"
import PropertyCard from "../components/PropertyCard"
import Filters from "../components/Filters"

export default function Properties() {
    const [searchParams, setSearchParams] = useSearchParams()

    const filters = {
        city: searchParams.get("city") || "",
        type: searchParams.get("type") || "",
        priceMin: Number(searchParams.get("priceMin")) || 0,
        priceMax: Number(searchParams.get("priceMax")) || null,
        bedrooms: Number(searchParams.get("bedrooms")) || null
    }

    const cities = [...new Set(properties.map((p) => p.location))]
    const types = [...new Set(properties.map((p) => p.type))]

    const updateFilter = (key, value) => {
        const params = new URLSearchParams(searchParams)

        if (!value || value === 0 || value === "") {
            params.delete(key)
        } else {
            params.set(key, value)
        }

        setSearchParams(params)
    }

    const resetFilters = () => {
        setSearchParams({})
    }

    const filtered = properties.filter((p) => {
        return (
            (!filters.city || p.location === filters.city) &&
            (!filters.type || p.type === filters.type) &&
            (!filters.priceMin || p.price >= filters.priceMin) &&
            (!filters.priceMax || p.price <= filters.priceMax) &&
            p.bedrooms >= filters.bedrooms
        )
    })

    return (
        <div className="container py-16 space-y-12">

            <div>
                <h1 className="font-serif text-5xl">All Properties</h1>
                <p className="text-gray-500 mt-2">
                    {filtered.length} residences found
                </p>
                <div className="divider mt-6" />
            </div>

            <Filters
                filters={filters}
                onChange={updateFilter}
                onReset={resetFilters}
                cities={cities}
                types={types}
            />

            <div className="grid md:grid-cols-3 gap-10">
                {filtered.map((p) => (
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