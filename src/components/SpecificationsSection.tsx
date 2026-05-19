import type { PropertyForm } from "../pages/ListProperty"

type Props = {
    form: PropertyForm
    updateField: (
        key: keyof PropertyForm,
        value: string | boolean
    ) => void
}

export default function SpecificationsSection({
    form,
    updateField
}: Props) {
    return (
        <section className="space-y-6">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gray-400">
                Specifications
            </p>

            <div className="grid md:grid-cols-2 gap-4">
                <input className="input" type="number" placeholder="Price" value={form.price} onChange={(e) => updateField("price", e.target.value)} required />
                <input className="input" type="number" placeholder="Interior size (m²)" value={form.size} onChange={(e) => updateField("size", e.target.value)} required />
                <input className="input" type="number" placeholder="Outdoor size (m²)" value={form.outdoorSize} onChange={(e) => updateField("outdoorSize", e.target.value)} />
                <input className="input" type="number" placeholder="Year built" value={form.yearBuilt} onChange={(e) => updateField("yearBuilt", e.target.value)} />
                <input className="input" type="number" placeholder="Bedrooms" value={form.bedrooms} onChange={(e) => updateField("bedrooms", e.target.value)} required />
                <input className="input" type="number" placeholder="Bathrooms" value={form.bathrooms} onChange={(e) => updateField("bathrooms", e.target.value)} required />
                <input className="input" type="number" placeholder="Parking spaces" value={form.parkingSpaces} onChange={(e) => updateField("parkingSpaces", e.target.value)} />

                <select className="input" value={form.energyRating} onChange={(e) => updateField("energyRating", e.target.value)}>
                    <option value="A">Energy Rating A</option>
                    <option value="B">Energy Rating B</option>
                    <option value="C">Energy Rating C</option>
                </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <button
                    type="button"
                    onClick={() => updateField("furnished", true)}
                    className={`border px-5 py-4 text-sm transition ${form.furnished
                        ? "border-black bg-black text-white"
                        : "border-[#eee6dd] bg-white text-gray-500 hover:text-black"
                        }`}
                >
                    Furnished
                </button>

                <button
                    type="button"
                    onClick={() => updateField("furnished", false)}
                    className={`border px-5 py-4 text-sm transition ${!form.furnished
                        ? "border-black bg-black text-white"
                        : "border-[#eee6dd] bg-white text-gray-500 hover:text-black"
                        }`}
                >
                    Unfurnished
                </button>
            </div>
        </section>
    )
}