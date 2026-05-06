import { useParams } from "react-router-dom"
import {
    BedDouble,
    Bath,
    Ruler,
    MapPin,
    Home
} from "lucide-react"

import { properties } from "../data/data"
import Gallery from "../components/Gallery"
import PropertyActions from "../components/PropertyActions"

export default function Property() {
    const { id } = useParams<{ id: string }>()

    const property = properties.find(
        (property) => property.id === Number(id)
    )

    if (!property) {
        return (
            <div className="container py-20">
                Not found
            </div>
        )
    }

    return (
        <div className="container py-16 space-y-14">
            <div className="space-y-3">
                <h1 className="font-serif text-5xl">
                    {property.title}
                </h1>

                <div className="flex items-center gap-2 text-gray-500">
                    <MapPin size={16} />

                    <p>{property.location}</p>
                </div>
            </div>

            <Gallery images={property.images} />

            <div className="pt-2 border-t border-[#f1ece6]">
                <PropertyActions property={property} />
            </div>

            <div className="grid md:grid-cols-[1fr_420px] gap-16 items-start">
                <div className="space-y-6">
                    <p className="text-[11px] tracking-[0.28em] uppercase text-gray-400">
                        Property Overview
                    </p>

                    <p className="text-gray-600 leading-relaxed text-lg max-w-3xl">
                        {property.description}
                    </p>
                </div>

                <aside className="bg-white border border-[#eee6dd] p-8 space-y-8 shadow-[0_24px_70px_rgba(0,0,0,0.04)]">
                    <div className="space-y-2">
                        <p className="text-[11px] text-gray-400">
                            Listing price
                        </p>

                        <p className="font-serif text-5xl tracking-[-0.04em] text-black">
                            ${property.price.toLocaleString()}
                        </p>
                    </div>

                    <div className="h-px bg-[#f1ece6]" />

                    <div className="grid grid-cols-2 gap-4">
                        <div className="border border-[#f1ece6] p-4 space-y-3">
                            <BedDouble size={18} className="text-gray-400" />
                            <p className="text-sm text-gray-900">
                                {property.bedrooms} bedrooms
                            </p>
                        </div>

                        <div className="border border-[#f1ece6] p-4 space-y-3">
                            <Bath size={18} className="text-gray-400" />
                            <p className="text-sm text-gray-900">
                                {property.bathrooms} bathrooms
                            </p>
                        </div>

                        <div className="border border-[#f1ece6] p-4 space-y-3">
                            <Ruler size={18} className="text-gray-400" />
                            <p className="text-sm text-gray-900">
                                {property.size} m²
                            </p>
                        </div>

                        <div className="border border-[#f1ece6] p-4 space-y-3">
                            <Home size={18} className="text-gray-400" />
                            <p className="text-sm text-gray-900 capitalize">
                                {property.type}
                            </p>
                        </div>
                    </div>

                    <button className="btn w-full">
                        Request Private Viewing
                    </button>
                </aside>
            </div>
        </div>
    )
}