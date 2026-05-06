export type Filters = {
    city: string
    type: string
    priceMin: number | null
    priceMax: number | null
    bedrooms: number
}

type FilterControlsProps = {
    filters: Filters
    onChange: (key: keyof Filters, value: string | number | null) => void
    cities: string[]
    types: string[]
}

export default function FilterControls({
    filters,
    onChange,
    cities,
    types
}: FilterControlsProps) {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div>
                <label className="text-[11px] tracking-[0.2em] text-gray-400 uppercase">
                    City
                </label>

                <select
                    value={filters.city}
                    onChange={(e) => onChange("city", e.target.value)}
                    className="w-full mt-2 px-4 py-3 rounded-xl bg-[#fbfaf8] border border-transparent focus:border-gray-300 outline-none text-sm"
                >
                    <option value="">All locations</option>
                    {cities.map((city) => (
                        <option key={city} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="text-[11px] tracking-[0.2em] text-gray-400 uppercase">
                    Type
                </label>

                <select
                    value={filters.type}
                    onChange={(e) => onChange("type", e.target.value)}
                    className="w-full mt-2 px-4 py-3 rounded-xl bg-[#fbfaf8] border border-transparent focus:border-gray-300 outline-none text-sm"
                >
                    <option value="">All types</option>
                    {types.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="text-[11px] tracking-[0.2em] text-gray-400 uppercase">
                    From
                </label>

                <input
                    type="number"
                    placeholder="From €3 000"
                    value={filters.priceMin ?? ""}
                    onChange={(e) =>
                        onChange(
                            "priceMin",
                            e.target.value === "" ? null : Number(e.target.value)
                        )
                    }
                    className="w-full mt-2 px-4 py-3 rounded-xl bg-[#fbfaf8] border border-transparent focus:border-gray-300 outline-none text-sm"
                />
            </div>

            <div>
                <label className="text-[11px] tracking-[0.2em] text-gray-400 uppercase">
                    To
                </label>

                <input
                    type="number"
                    placeholder="From €3 000 000"
                    value={filters.priceMax ?? ""}
                    onChange={(e) =>
                        onChange(
                            "priceMax",
                            e.target.value === "" ? null : Number(e.target.value)
                        )
                    }
                    className="w-full mt-2 px-4 py-3 rounded-xl bg-[#fbfaf8] border border-transparent focus:border-gray-300 outline-none text-sm"
                />
            </div>

            <div>
                <label className="text-[11px] tracking-[0.2em] text-gray-400 uppercase">
                    Bedrooms
                </label>

                <select
                    value={filters.bedrooms}
                    onChange={(e) =>
                        onChange("bedrooms", Number(e.target.value))
                    }
                    className="w-full mt-2 px-4 py-3 rounded-xl bg-[#fbfaf8] border border-transparent focus:border-gray-300 outline-none text-sm"
                >
                    <option value={0}>Any</option>
                    <option value={2}>2+</option>
                    <option value={3}>3+</option>
                    <option value={4}>4+</option>
                </select>
            </div>
        </div>
    )
}