import type { PropertyForm } from "../pages/ListProperty"

const amenityOptions = [
    "Private pool",
    "Garden",
    "Terrace",
    "Garage",
    "Security",
    "Elevator",
    "Concierge",
    "City view",
    "Smart home",
    "Fireplace",
    "Spa",
    "Fitness room",
    "Balcony",
    "Parking"
]

type Props = {
    form: PropertyForm
    toggleAmenity: (amenity: string) => void
}

export default function AmenitiesSection({
    form,
    toggleAmenity
}: Props) {
    return (
        <section className="space-y-6">

            <p className="text-[11px] tracking-[0.3em] uppercase text-gray-400">
                Amenities
            </p>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">

                {amenityOptions.map((amenity) => {

                    const selected =
                        form.amenities.includes(amenity)

                    return (
                        <button
                            key={amenity}
                            type="button"
                            onClick={() =>
                                toggleAmenity(amenity)
                            }
                            className={`border px-4 py-3 text-sm text-left transition ${selected
                                ? "border-black bg-black text-white"
                                : "border-[#eee6dd] bg-white text-gray-500 hover:text-black"
                                }`}
                        >
                            {amenity}
                        </button>
                    )
                })}

            </div>

        </section>
    )
}