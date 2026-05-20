import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import type { LucideIcon } from "lucide-react"
import type { Property } from "../../backend/src/data.js"
import { deleteProperty } from "../api/properties"
import { useNavigate } from "react-router-dom"

import {
    BedDouble,
    Bath,
    Ruler,
    MapPin,
    Home
} from "lucide-react"

import { getProperty } from "../api/properties"

import Gallery from "../components/Gallery"
import PropertyActions from "../components/PropertyActions"
import ConfirmModal from "../components/ConfirmModal.js"
import useAuth from "../hooks/useAuth.js"

export default function Property() {
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()
    const { user } = useAuth()
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [property, setProperty] = useState<Property | null>(null)
    const [loading, setLoading] = useState(true)

    const handleDelete = async () => {
        if (!property) return

        try {
            await deleteProperty(property.id)

            navigate("/properties")
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (!id) return

        getProperty(Number(id))
            .then(setProperty)
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [id])

    if (loading) {
        return (
            <div className="container pt-32 pb-16">
                Loading property...
            </div>
        )
    }

    if (!property) {
        return (
            <div className="container pt-32 pb-16">
                Not found
            </div>
        )
    }

    const mainDetails: {
        icon: LucideIcon
        label: string
    }[] = [
            {
                icon: BedDouble,
                label: `${property.bedrooms} bedrooms`
            },
            {
                icon: Bath,
                label: `${property.bathrooms} bathrooms`
            },
            {
                icon: Ruler,
                label: `${property.size} m²`
            },
            {
                icon: Home,
                label: property.type
            }
        ]

    const secondaryDetails = [
        ["Outdoor space", `${property.outdoorSize} m²`],
        ["Parking", `${property.parkingSpaces} spaces`],
        ["Built", property.yearBuilt],
        ["Energy rating", property.energyRating]
    ]

    return (
        <div className="container pt-32 pb-16 space-y-14">

            <div className="space-y-5">

                <div className="flex items-center gap-3">

                    <span className="px-3 py-1 border border-[#e8e2da] text-[11px] text-gray-500 bg-[#faf8f5]">
                        {property.status}
                    </span>

                    <span className="text-[11px] text-gray-400">
                        {property.district}
                    </span>

                </div>

                <div className="space-y-3">

                    <h1 className="font-serif text-5xl tracking-[-0.04em]">
                        {property.title}
                    </h1>

                    <div className="flex items-center gap-2 text-gray-500">
                        <MapPin size={16} />
                        <p>{property.location}</p>
                    </div>

                </div>

            </div>

            <Gallery images={property.images} />

            <div className="pt-2 border-t border-[#f1ece6]">
                <PropertyActions property={property} />
            </div>

            <div className="grid lg:grid-cols-[1fr_420px] gap-20 items-start">

                <div className="space-y-14">

                    <section className="space-y-6">

                        <p className="text-[11px] tracking-[0.3em] uppercase text-gray-400">
                            Property Overview
                        </p>

                        <p className="max-w-3xl text-xl leading-relaxed text-gray-600 whitespace-pre-line">
                            {property.description}
                        </p>

                    </section>

                    <section className="grid sm:grid-cols-2 gap-px border border-[#eee6dd] bg-[#eee6dd]">

                        {secondaryDetails.map(([label, value]) => (
                            <div
                                key={label}
                                className="bg-white px-6 py-5"
                            >
                                <p className="text-[11px] text-gray-400 mb-2">
                                    {label}
                                </p>

                                <p className="font-serif text-2xl text-black">
                                    {value}
                                </p>
                            </div>
                        ))}

                    </section>

                    <section className="space-y-5">

                        <p className="text-[11px] tracking-[0.3em] uppercase text-gray-400">
                            Amenities
                        </p>

                        <div className="flex flex-wrap gap-3">

                            {property.amenities.map((amenity) => (
                                <span
                                    key={amenity}
                                    className="border border-[#eee6dd] bg-white px-5 py-2.5 text-sm text-gray-600"
                                >
                                    {amenity}
                                </span>
                            ))}

                        </div>

                    </section>

                    <section className="border border-[#eee6dd] bg-white p-7 flex items-center justify-between gap-8">

                        <div>
                            <p className="text-[11px] tracking-[0.3em] uppercase text-gray-400 mb-3">
                                Contact Person
                            </p>

                            <p className="font-serif text-3xl text-black">
                                {property.contactPerson.name}
                            </p>
                        </div>

                        <div className="text-sm text-gray-500 space-y-2 text-right">
                            <p>{property.contactPerson.phone}</p>
                            <p>{property.contactPerson.email}</p>
                        </div>

                    </section>

                </div>

                <aside className="sticky top-24 border border-[#eee6dd] bg-[#faf8f5] p-8 space-y-8">

                    <div className="space-y-3">

                        <div className="flex items-center justify-between">

                            <span className="text-[11px] tracking-[0.22em] uppercase text-gray-400">
                                {property.status}
                            </span>

                            <span className="text-sm text-gray-400">
                                {property.district}
                            </span>

                        </div>

                        <p className="font-serif text-5xl tracking-[-0.04em] text-black">
                            ${property.price.toLocaleString()}
                        </p>

                    </div>

                    <div className="grid grid-cols-2 gap-px bg-[#e8e2da] border border-[#e8e2da]">

                        {mainDetails.map(({ icon: Icon, label }) => (
                            <div
                                key={label}
                                className="bg-[#faf8f5] p-5 space-y-3"
                            >
                                <Icon
                                    size={18}
                                    className="text-gray-400"
                                />

                                <p className="text-sm text-gray-700 capitalize leading-relaxed">
                                    {label}
                                </p>
                            </div>
                        ))}

                    </div>

                    <div className="space-y-4 border-t border-[#ece6dd] pt-6">

                        {secondaryDetails.map(([label, value]) => (
                            <div
                                key={label}
                                className="flex items-center justify-between text-sm"
                            >
                                <span className="text-gray-400">
                                    {label}
                                </span>

                                <span className="text-black">
                                    {value}
                                </span>
                            </div>
                        ))}

                    </div>

                    <div className="flex flex-col gap-3">
                        <button className="btn w-full">
                            Request Private Viewing
                        </button>
                        {user && Number(user.id) === property.ownerId && (
                            <>
                                <Link to={`/properties/${property.id}/edit`} className="btn w-full flex items-center justify-center">
                                    Edit Property
                                </Link>
                                <button
                                    onClick={() => setShowDeleteModal(true)}
                                    className="rounded-xl w-full border border-red-500 text-red-500 py-2 hover:bg-red-500 hover:text-white transition"
                                >
                                    Delete Property
                                </button>
                            </>
                        )}
                    </div>

                </aside>

            </div>
            <ConfirmModal
                open={showDeleteModal}
                title="Delete this property?"
                description="This listing will be permanently removed and cannot be recovered."
                confirmText="Delete Permanently"
                cancelText="Cancel"
                danger
                onCancel={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
            />
        </div>
    )
}