export default function ActiveFilterChips({
    filters,
    onChange,
    onReset
}) {
    return (
        <div className="flex justify-between items-center mt-8">

            <div className="flex gap-2 flex-wrap">

                {filters.city && (
                    <button
                        onClick={() => onChange("city", "")}
                        className="px-4 py-1.5 text-sm rounded-full bg-[#f4efe8] text-gray-700 hover:bg-[#eee2d6] transition"
                    >
                        {filters.city} ✕
                    </button>
                )}

                {filters.type && (
                    <button
                        onClick={() => onChange("type", "")}
                        className="px-4 py-1.5 text-sm rounded-full bg-[#f4efe8] text-gray-700 hover:bg-[#eee2d6] transition capitalize"
                    >
                        {filters.type} ✕
                    </button>
                )}

                {(filters.priceMin || filters.priceMax) && (
                    <button
                        onClick={() => {
                            onChange("priceMin", null)
                            onChange("priceMax", null)
                        }}
                        className="px-4 py-1.5 text-sm rounded-full bg-[#f4efe8] text-gray-700 hover:bg-[#eee2d6] transition"
                    >
                        {filters.priceMin ? `$${filters.priceMin.toLocaleString()}` : "Any"} —{" "}
                        {filters.priceMax ? `$${filters.priceMax.toLocaleString()}` : "∞"}
                    </button>
                )}

                {filters.bedrooms > 0 && (
                    <button
                        onClick={() => onChange("bedrooms", 0)}
                        className="px-4 py-1.5 text-sm rounded-full bg-[#f4efe8] text-gray-700 hover:bg-[#eee2d6] transition"
                    >
                        {filters.bedrooms}+ beds ✕
                    </button>
                )}

            </div>

            <button
                onClick={onReset}
                className="text-sm text-gray-500 hover:text-black transition"
            >
                Reset
            </button>

        </div>
    )
}