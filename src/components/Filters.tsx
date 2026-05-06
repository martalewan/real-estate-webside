import FilterControls from "./FilterControls"
import ActiveFilterChips from "./ActiveFilterChips"

export type FiltersState = {
    city: string
    type: string
    priceMin: number | null
    priceMax: number | null
    bedrooms: number
    sort: string
}

type FiltersProps = {
    filters: FiltersState
    onChange: (
        key: keyof FiltersState,
        value: string | number | null
    ) => void
    onReset: () => void
    cities: string[]
    types: string[]
}

export default function Filters({
    filters,
    onChange,
    onReset,
    cities,
    types
}: FiltersProps) {
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