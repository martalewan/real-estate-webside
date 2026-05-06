export default function Filters({
    filters,
    onChange,
    onReset,
    cities,
    types
}) {
    return (
        <div className="mb-16 space-y-10">

            <div className="bg-white border border-[#eee6dd] shadow-sm rounded-2xl p-6">

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
                            {cities.map((c) => (
                                <option key={c} value={c}>{c}</option>
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
                            {types.map((t) => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-[11px] tracking-[0.2em] text-gray-400 uppercase">
                            From
                        </label>

                        <input
                            type="number"
                            placeholder="3,000,000"
                            value={filters.priceMin || ""}
                            onChange={(e) =>
                                onChange("priceMin", Number(e.target.value) || 0)
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
                            placeholder="20,000,000"
                            value={filters.priceMax || ""}
                            onChange={(e) =>
                                onChange("priceMax", Number(e.target.value) || 0)
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

                <div className="flex justify-between items-center mt-8">

                    <div className="flex gap-2 flex-wrap">

                        {filters.city && (
                            <span className="px-4 py-1.5 text-sm rounded-full bg-[#f4efe8] text-gray-700">
                                {filters.city}
                            </span>
                        )}

                        {filters.type && (
                            <span className="px-4 py-1.5 text-sm rounded-full bg-[#f4efe8] text-gray-700 capitalize">
                                {filters.type}
                            </span>
                        )}

                        {(filters.priceMin || filters.priceMax) && (
                            <span className="px-4 py-1.5 text-sm rounded-full bg-[#f4efe8] text-gray-700">
                                {filters.priceMin ? `$${filters.priceMin.toLocaleString()}` : "Any"} —{" "}
                                {filters.priceMax ? `$${filters.priceMax.toLocaleString()}` : "∞"}
                            </span>
                        )}

                    </div>

                    <button
                        onClick={onReset}
                        className="text-sm text-gray-500 hover:text-black transition"
                    >
                        Reset
                    </button>

                </div>
            </div>

            <div className="border-t border-[#f1ece6]" />
        </div>
    )
}