import FilterControls from "./FilterControls"
import ActiveFilterChips from "./ActiveFilterChips"

export default function Filters({
    filters,
    onChange,
    onReset,
    cities,
    types
}) {
    return (
        <div className="mb-16 space-y-10">

            <div className="bg-white border border-[#eee6dd] rounded-md p-6">

                <FilterControls
                    filters={filters}
                    onChange={onChange}
                    cities={cities}
                    types={types}
                />

                <ActiveFilterChips
                    filters={filters}
                    onChange={onChange}
                    onReset={onReset}
                />

            </div>

            <div className="border-t border-[#f1ece6]" />
        </div>
    )
}