import { useSearchParams } from "react-router-dom"
import { properties, type Property } from "../data/data"
import PropertyCard from "../components/PropertyCard"
import Filters from "../components/Filters"

type FiltersState = {
    city: string
    type: string
    priceMin: number | null
    priceMax: number | null
    bedrooms: number
}

type FilterKey = keyof FiltersState

export default function Properties() {
    const [searchParams, setSearchParams] = useSearchParams()

    const filters: FiltersState = {
        city: searchParams.get("city") || "",
        type: searchParams.get("type") || "",
        priceMin: searchParams.get("priceMin")
            ? Number(searchParams.get("priceMin"))
            : null,
        priceMax: searchParams.get("priceMax")
            ? Number(searchParams.get("priceMax"))
            : null,
        bedrooms: searchParams.get("bedrooms")
            ? Number(searchParams.get("bedrooms"))
            : 0
    }

    const cities = [
        ...new Set(properties.map((property) => property.location))
    ]

    const types = [
        ...new Set(properties.map((property) => property.type))
    ]

    const updateFilter = (
        key: FilterKey,
        value: string | number | null
    ): void => {
        const params = new URLSearchParams(searchParams)

        if (!value || value === 0 || value === "") {
            params.delete(key)
        } else {
            params.set(key, String(value))
        }

        setSearchParams(params)
    }

    const resetFilters = (): void => {
        setSearchParams({})
    }

    const filtered: Property[] = properties.filter((property) => {
        return (
            (!filters.city || property.location === filters.city) &&
            (!filters.type || property.type === filters.type) &&
            (!filters.priceMin || property.price >= filters.priceMin) &&
            (!filters.priceMax || property.price <= filters.priceMax) &&
            property.bedrooms >= filters.bedrooms
        )
    })

    return (
        <div className="container py-16 space-y-12">
            <div>
                <h1 className="font-serif text-5xl">
                    All Properties
                </h1>

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
                {filtered.map((property) => (
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
        </div>
    )
}