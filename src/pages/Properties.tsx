import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { properties } from "../data/data"
import PropertyCard from "../components/PropertyCard"
import Filters from "../components/Filters"

const PER_PAGE = 6

export default function Properties() {
    const [searchParams, setSearchParams] = useSearchParams()

    const initialPage = Number(searchParams.get("page")) || 1

    const [page, setPage] = useState(initialPage)

    const [filters, setFilters] = useState({
        city: "",
        type: "",
        priceMin: 0,
        priceMax: 0,
        bedrooms: 0
    })

    useEffect(() => {
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev)
            params.set("page", String(page))
            return params
        })
    }, [page])

    const cities = [...new Set(properties.map((p) => p.location))]
    const types = [...new Set(properties.map((p) => p.type))]

    const filtered = properties.filter((p) => {
        return (
            (!filters.city || p.location === filters.city) &&
            (!filters.type || p.type === filters.type) &&
            (!filters.priceMin || p.price >= filters.priceMin) &&
            (!filters.priceMax || p.price <= filters.priceMax) &&
            p.bedrooms >= filters.bedrooms
        )
    })

    const visible = filtered.slice(0, page * PER_PAGE)

    return (
        <div className="min-h-screen">

            <section className="container pt-16 pb-10 space-y-6">
                <h1 className="font-serif text-5xl md:text-6xl">
                    Residences
                </h1>

                <p className="text-gray-500">
                    {filtered.length} available
                </p>

                <div className="divider" />
            </section>

            <section className="container pb-10">
                <Filters
                    filters={filters}
                    setFilters={setFilters}
                    cities={cities}
                    types={types}
                />
            </section>

            <section className="container pb-20">
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-12">
                    {visible.map((p) => (
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

                {visible.length < filtered.length && (
                    <div className="flex justify-center mt-16">
                        <button
                            onClick={() => setPage((p) => p + 1)}
                            className="btn-secondary"
                        >
                            Load More
                        </button>
                    </div>
                )}
            </section>

        </div>
    )
}