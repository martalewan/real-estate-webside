export default function Filters({
    filters,
    setFilters,
    cities,
    types
}) {
    return (
        <div className="mb-12">

            <div className="grid md:grid-cols-5 gap-6 items-end">

                <div>
                    <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide">
                        City
                    </label>
                    <select
                        value={filters.city}
                        onChange={(e) =>
                            setFilters({ ...filters, city: e.target.value })
                        }
                        className="input"
                    >
                        <option value="">All</option>
                        {cities.map((c) => (
                            <option key={c}>{c}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide">
                        Type
                    </label>
                    <select
                        value={filters.type}
                        onChange={(e) =>
                            setFilters({ ...filters, type: e.target.value })
                        }
                        className="input"
                    >
                        <option value="">All</option>
                        {types.map((t) => (
                            <option key={t}>{t}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide">
                        Price From
                    </label>
                    <input
                        type="number"
                        placeholder="$3,000,000"
                        value={filters.priceMin || ""}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                priceMin: Number(e.target.value) || 0
                            })
                        }
                        className="input"
                    />
                </div>

                <div>
                    <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide">
                        Price To
                    </label>
                    <input
                        type="number"
                        placeholder="$20,000,000"
                        value={filters.priceMax || ""}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                priceMax: Number(e.target.value) || 0
                            })
                        }
                        className="input"
                    />
                </div>

                <div>
                    <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide">
                        Bedrooms
                    </label>
                    <select
                        value={filters.bedrooms}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                bedrooms: Number(e.target.value)
                            })
                        }
                        className="input"
                    >
                        <option value={0}>Any</option>
                        <option value={2}>2+</option>
                        <option value={3}>3+</option>
                        <option value={4}>4+</option>
                    </select>
                </div>

            </div>

            <div className="flex justify-between items-center mt-6">

                <div className="text-sm text-gray-500">
                    {filters.city && <span>{filters.city} · </span>}
                    {filters.type && <span className="capitalize">{filters.type} · </span>}
                    {(filters.priceMin || filters.priceMax) && (
                        <span>
                            ${filters.priceMin?.toLocaleString() || 0} — $
                            {filters.priceMax?.toLocaleString() || "Any"}
                        </span>
                    )}
                </div>

                <button
                    onClick={() =>
                        setFilters({
                            city: "",
                            type: "",
                            priceMin: 0,
                            priceMax: 0,
                            bedrooms: 0
                        })
                    }
                    className="btn-ghost"
                >
                    Reset
                </button>

            </div>

            <div className="divider mt-8" />

        </div>
    )
}