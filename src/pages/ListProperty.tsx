import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { uploadImageToCloudinary } from "../api/cloudinary"

import {
    createProperty,
    getProperty,
    updateProperty
} from "../api/properties"


import PropertyDetailsSection from "../components/PropertyDetailsSection"
import AmenitiesSection from "../components/AmenitiesSection"
import ImagesSection from "../components/ImageSection"
import SpecificationsSection from "../components/SpecificationsSection"
import DescriptionSection from "../components/DescriptionSection"
import ContactSection from "../components/ContactSection"
import type { Property } from "../types/property"

export type PropertyForm = {
    title: string
    location: string
    district: string
    type: string
    status: string
    price: string
    bedrooms: string
    bathrooms: string
    size: string
    outdoorSize: string
    yearBuilt: string
    parkingSpaces: string
    energyRating: string
    furnished: boolean
    amenities: string[]
    description: string
    mainImage: string
    galleryImages: string[]
    contactName: string
    contactEmail: string
    contactPhone: string
}

const initialForm: PropertyForm = {
    title: "",
    location: "",
    district: "",
    type: "residence",
    status: "New Listing",
    price: "",
    bedrooms: "",
    bathrooms: "",
    size: "",
    outdoorSize: "",
    yearBuilt: "",
    parkingSpaces: "",
    energyRating: "A",
    furnished: false,
    amenities: [],
    description: "",
    mainImage: "",
    galleryImages: [],
    contactName: "",
    contactEmail: "",
    contactPhone: ""
}

export default function ListProperty() {
    const navigate = useNavigate()

    const { id } = useParams<{ id: string }>()

    const isEditing = Boolean(id)

    const [form, setForm] = useState<PropertyForm>(initialForm)

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!id) return

        getProperty(id).then((property) => {
            setForm({
                title: property.title,
                location: property.location,
                district: property.district,
                type: property.type,
                status: property.status,
                price: String(property.price),
                bedrooms: String(property.bedrooms),
                bathrooms: String(property.bathrooms),
                size: String(property.size),
                outdoorSize: String(property.outdoorSize),
                yearBuilt: String(property.yearBuilt),
                parkingSpaces: String(property.parkingSpaces),
                energyRating: property.energyRating,
                furnished: property.furnished,
                amenities: property.amenities,
                description: property.description,
                mainImage: property.images[0] || "",
                galleryImages: property.images.slice(1),
                contactName: property.contactPerson.name,
                contactEmail: property.contactPerson.email,
                contactPhone: property.contactPerson.phone
            })
        })
    }, [id])

    const updateField = (
        key: keyof PropertyForm,
        value: string | boolean | string[]
    ) => {
        setForm((current) => ({
            ...current,
            [key]: value
        }))
    }

    const handleMainImageUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0]

        if (!file) return

        const imageUrl = await uploadImageToCloudinary(file)

        updateField("mainImage", imageUrl)
    }

    const handleGalleryUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const files = Array.from(e.target.files || [])

        const imageUrls = await Promise.all(
            files.map((file) =>
                uploadImageToCloudinary(file)
            )
        )

        updateField("galleryImages", imageUrls)
    }

    const toggleAmenity = (amenity: string) => {
        setForm((current) => ({
            ...current,
            amenities:
                current.amenities.includes(amenity)
                    ? current.amenities.filter(
                        (item) => item !== amenity
                    )
                    : [...current.amenities, amenity]
        }))
    }

    const handleSubmit = async (
        e: React.SyntheticEvent<HTMLFormElement>
    ) => {
        e.preventDefault()

        try {
            setLoading(true)

            const propertyData = {
                title: form.title,
                location: form.location,
                district: form.district,
                type: form.type as Property["type"],
                status: form.status as Property["status"],
                price: Number(form.price),
                bedrooms: Number(form.bedrooms),
                bathrooms: Number(form.bathrooms),
                size: Number(form.size),
                outdoorSize: Number(form.outdoorSize),
                yearBuilt: Number(form.yearBuilt),
                parkingSpaces: Number(form.parkingSpaces),
                energyRating:
                    form.energyRating as Property["energyRating"],
                furnished: form.furnished,
                amenities: form.amenities,
                images: [
                    form.mainImage,
                    ...form.galleryImages
                ],
                description: form.description,
                contactPerson: {
                    name: form.contactName,
                    email: form.contactEmail,
                    phone: form.contactPhone
                }
            }

            const savedProperty =
                isEditing && id
                    ? await updateProperty(
                        id,
                        propertyData
                    )
                    : await createProperty(
                        propertyData
                    )

            navigate(
                `/properties/${savedProperty.id}`
            )

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container pt-32 pb-20">
            <div className="grid lg:grid-cols-[0.78fr_1.22fr] gap-20 items-start">

                <div className="space-y-6 block lg:sticky top-32">

                    <p className="text-[11px] tracking-[0.34em] uppercase text-gray-400">
                        List Property
                    </p>

                    <h1 className="font-serif text-6xl tracking-[-0.055em] leading-[0.9]">
                        Present your home beautifully.
                    </h1>

                    <p className="text-gray-500 leading-relaxed max-w-md">
                        Create a premium private listing.
                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="border border-[#eee6dd] bg-white p-8 md:p-10 space-y-12"
                >

                    <PropertyDetailsSection
                        form={form}
                        updateField={updateField}
                    />

                    <SpecificationsSection
                        form={form}
                        updateField={updateField}
                    />

                    <AmenitiesSection
                        form={form}
                        toggleAmenity={toggleAmenity}
                    />

                    <DescriptionSection
                        form={form}
                        updateField={updateField}
                    />

                    <ImagesSection
                        form={form}
                        handleMainImageUpload={handleMainImageUpload}
                        handleGalleryUpload={handleGalleryUpload}
                    />

                    <ContactSection
                        form={form}
                        updateField={updateField}
                    />

                    <button
                        className="btn w-full"
                        disabled={loading}
                    >
                        {loading
                            ? isEditing
                                ? "Updating..."
                                : "Publishing..."
                            : isEditing
                                ? "Update Listing"
                                : "Publish Listing"}
                    </button>

                </form>
            </div>
        </div>
    )
}