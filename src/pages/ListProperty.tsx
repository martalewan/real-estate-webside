import { useState } from "react"
import { useNavigate } from "react-router-dom"

type PropertyForm = {
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

    const [form, setForm] = useState<PropertyForm>(initialForm)

    const updateField = (
        key: keyof PropertyForm,
        value: string | boolean | string[]
    ) => {
        setForm((current) => ({
            ...current,
            [key]: value
        }))
    }

    const fileToBase64 = (
        file: File
    ): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()

            reader.onload = () => {
                resolve(reader.result as string)
            }

            reader.onerror = reject

            reader.readAsDataURL(file)
        })
    }

    const handleMainImageUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0]

        if (!file) return

        const image = await fileToBase64(file)

        updateField("mainImage", image)
    }

    const handleGalleryUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const files = Array.from(
            e.target.files || []
        )

        const images = await Promise.all(
            files.map((file) =>
                fileToBase64(file)
            )
        )

        updateField("galleryImages", images)
    }

    const toggleAmenity = (
        amenity: string
    ) => {
        setForm((current) => ({
            ...current,
            amenities:
                current.amenities.includes(amenity)
                    ? current.amenities.filter(
                        (item) => item !== amenity
                    )
                    : [
                        ...current.amenities,
                        amenity
                    ]
        }))
    }

    const handleSubmit = (
        e: React.SyntheticEvent<HTMLFormElement>
    ) => {
        e.preventDefault()

        const newProperty = {
            id: Date.now(),
            title: form.title,
            location: form.location,
            district: form.district,
            type: form.type,
            status: form.status,
            price: Number(form.price),
            bedrooms: Number(form.bedrooms),
            bathrooms: Number(form.bathrooms),
            size: Number(form.size),
            outdoorSize: Number(form.outdoorSize),
            yearBuilt: Number(form.yearBuilt),
            parkingSpaces: Number(form.parkingSpaces),
            energyRating: form.energyRating,
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

        const stored = JSON.parse(
            localStorage.getItem(
                "user_properties"
            ) || "[]"
        )

        localStorage.setItem(
            "user_properties",
            JSON.stringify([
                ...stored,
                newProperty
            ])
        )

        navigate("/properties")
    }

    return (
        <div className="container pt-32 pb-20">
            <div className="grid lg:grid-cols-[0.78fr_1.22fr] gap-20 items-start">
                <div className="space-y-6 block md:sticky top-32">
                    <p className="text-[11px] tracking-[0.34em] uppercase text-gray-400">
                        List Property
                    </p>

                    <h1 className="font-serif text-6xl tracking-[-0.055em] leading-[0.9]">
                        Present your home beautifully.
                    </h1>

                    <p className="text-gray-500 leading-relaxed max-w-md">
                        Create a premium private listing with
                        refined details, imagery, amenities,
                        and seller information.
                    </p>

                    <div className="pt-8 border-t border-[#eee6dd] space-y-3 text-sm text-gray-500">
                        <p>Premium presentation</p>
                        <p>Private seller contact</p>
                        <p>Architectural property showcase</p>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="border border-[#eee6dd] bg-white p-8 md:p-10 space-y-12 shadow-[0_30px_90px_rgba(0,0,0,0.04)]"
                >
                    {/* DETAILS */}

                    <section className="space-y-6">
                        <p className="text-[11px] tracking-[0.3em] uppercase text-gray-400">
                            Property Details
                        </p>

                        <input
                            className="input"
                            placeholder="Property title"
                            value={form.title}
                            onChange={(e) =>
                                updateField(
                                    "title",
                                    e.target.value
                                )
                            }
                            required
                        />

                        <div className="grid md:grid-cols-2 gap-4">
                            <input
                                className="input"
                                placeholder="City"
                                value={form.location}
                                onChange={(e) =>
                                    updateField(
                                        "location",
                                        e.target.value
                                    )
                                }
                                required
                            />

                            <input
                                className="input"
                                placeholder="District"
                                value={form.district}
                                onChange={(e) =>
                                    updateField(
                                        "district",
                                        e.target.value
                                    )
                                }
                                required
                            />

                            <select
                                className="input"
                                value={form.type}
                                onChange={(e) =>
                                    updateField(
                                        "type",
                                        e.target.value
                                    )
                                }
                            >
                                <option value="villa">
                                    Villa
                                </option>

                                <option value="penthouse">
                                    Penthouse
                                </option>

                                <option value="chalet">
                                    Chalet
                                </option>

                                <option value="loft">
                                    Loft
                                </option>

                                <option value="residence">
                                    Residence
                                </option>
                            </select>

                            <select
                                className="input"
                                value={form.status}
                                onChange={(e) =>
                                    updateField(
                                        "status",
                                        e.target.value
                                    )
                                }
                            >
                                <option value="For Sale">
                                    For Sale
                                </option>

                                <option value="New Listing">
                                    New Listing
                                </option>

                                <option value="Exclusive">
                                    Exclusive
                                </option>
                            </select>
                        </div>
                    </section>

                    {/* SPECIFICATIONS */}

                    <section className="space-y-6">
                        <p className="text-[11px] tracking-[0.3em] uppercase text-gray-400">
                            Specifications
                        </p>

                        <div className="grid md:grid-cols-2 gap-4">
                            <input
                                className="input"
                                type="number"
                                placeholder="Price"
                                value={form.price}
                                onChange={(e) =>
                                    updateField(
                                        "price",
                                        e.target.value
                                    )
                                }
                                required
                            />

                            <input
                                className="input"
                                type="number"
                                placeholder="Interior size (m²)"
                                value={form.size}
                                onChange={(e) =>
                                    updateField(
                                        "size",
                                        e.target.value
                                    )
                                }
                                required
                            />

                            <input
                                className="input"
                                type="number"
                                placeholder="Outdoor size (m²)"
                                value={form.outdoorSize}
                                onChange={(e) =>
                                    updateField(
                                        "outdoorSize",
                                        e.target.value
                                    )
                                }
                            />

                            <input
                                className="input"
                                type="number"
                                placeholder="Year built"
                                value={form.yearBuilt}
                                onChange={(e) =>
                                    updateField(
                                        "yearBuilt",
                                        e.target.value
                                    )
                                }
                            />

                            <input
                                className="input"
                                type="number"
                                placeholder="Bedrooms"
                                value={form.bedrooms}
                                onChange={(e) =>
                                    updateField(
                                        "bedrooms",
                                        e.target.value
                                    )
                                }
                                required
                            />

                            <input
                                className="input"
                                type="number"
                                placeholder="Bathrooms"
                                value={form.bathrooms}
                                onChange={(e) =>
                                    updateField(
                                        "bathrooms",
                                        e.target.value
                                    )
                                }
                                required
                            />

                            <input
                                className="input"
                                type="number"
                                placeholder="Parking spaces"
                                value={form.parkingSpaces}
                                onChange={(e) =>
                                    updateField(
                                        "parkingSpaces",
                                        e.target.value
                                    )
                                }
                            />

                            <select
                                className="input"
                                value={form.energyRating}
                                onChange={(e) =>
                                    updateField(
                                        "energyRating",
                                        e.target.value
                                    )
                                }
                            >
                                <option value="A">
                                    Energy Rating A
                                </option>

                                <option value="B">
                                    Energy Rating B
                                </option>

                                <option value="C">
                                    Energy Rating C
                                </option>
                            </select>
                        </div>

                        <div className="space-y-3">
                            <p className="text-sm text-gray-500">
                                Furnishing
                            </p>

                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() =>
                                        updateField(
                                            "furnished",
                                            true
                                        )
                                    }
                                    className={`border px-5 py-4 text-sm transition ${form.furnished
                                        ? "border-black bg-black text-white"
                                        : "border-[#eee6dd] bg-white text-gray-500 hover:text-black"
                                        }`}
                                >
                                    Furnished
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        updateField(
                                            "furnished",
                                            false
                                        )
                                    }
                                    className={`border px-5 py-4 text-sm transition ${!form.furnished
                                        ? "border-black bg-black text-white"
                                        : "border-[#eee6dd] bg-white text-gray-500 hover:text-black"
                                        }`}
                                >
                                    Unfurnished
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* AMENITIES */}

                    <section className="space-y-6">
                        <p className="text-[11px] tracking-[0.3em] uppercase text-gray-400">
                            Amenities
                        </p>

                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {amenityOptions.map(
                                (amenity) => {
                                    const selected =
                                        form.amenities.includes(
                                            amenity
                                        )

                                    return (
                                        <button
                                            key={amenity}
                                            type="button"
                                            onClick={() =>
                                                toggleAmenity(
                                                    amenity
                                                )
                                            }
                                            className={`border px-4 py-3 text-sm text-left transition ${selected
                                                ? "border-black bg-black text-white"
                                                : "border-[#eee6dd] bg-white text-gray-500 hover:text-black"
                                                }`}
                                        >
                                            {amenity}
                                        </button>
                                    )
                                }
                            )}
                        </div>
                    </section>

                    {/* DESCRIPTION */}

                    <section className="space-y-6">
                        <p className="text-[11px] tracking-[0.3em] uppercase text-gray-400">
                            Description
                        </p>

                        <textarea
                            className="input min-h-44 resize-none"
                            placeholder="Describe the property"
                            value={form.description}
                            onChange={(e) =>
                                updateField(
                                    "description",
                                    e.target.value
                                )
                            }
                            required
                        />
                    </section>

                    {/* IMAGES */}

                    <section className="space-y-6">
                        <p className="text-[11px] tracking-[0.3em] uppercase text-gray-400">
                            Images
                        </p>

                        <div className="space-y-4">
                            <label className="block border border-dashed border-[#ddd4ca] bg-[#faf8f5] p-6 text-center cursor-pointer hover:border-black transition">
                                <span className="text-sm text-gray-500">
                                    Upload main image
                                </span>

                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={
                                        handleMainImageUpload
                                    }
                                    required
                                />
                            </label>

                            {form.mainImage && (
                                <div className="overflow-hidden border border-[#eee6dd]">
                                    <img
                                        src={form.mainImage}
                                        alt="Main preview"
                                        className="h-72 w-full object-cover"
                                    />
                                </div>
                            )}

                            <label className="block border border-dashed border-[#ddd4ca] bg-white p-6 text-center cursor-pointer hover:border-black transition">
                                <span className="text-sm text-gray-500">
                                    Upload gallery images
                                </span>

                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    className="hidden"
                                    onChange={
                                        handleGalleryUpload
                                    }
                                />
                            </label>

                            {form.galleryImages.length >
                                0 && (
                                    <div className="grid grid-cols-3 gap-3">
                                        {form.galleryImages.map(
                                            (
                                                image,
                                                index
                                            ) => (
                                                <img
                                                    key={
                                                        index
                                                    }
                                                    src={
                                                        image
                                                    }
                                                    alt={`Gallery ${index + 1
                                                        }`}
                                                    className="h-28 w-full object-cover border border-[#eee6dd]"
                                                />
                                            )
                                        )}
                                    </div>
                                )}
                        </div>
                    </section>

                    {/* CONTACT */}

                    <section className="space-y-6">
                        <p className="text-[11px] tracking-[0.3em] uppercase text-gray-400">
                            Contact Person
                        </p>

                        <input
                            className="input"
                            placeholder="Full name"
                            value={form.contactName}
                            onChange={(e) =>
                                updateField(
                                    "contactName",
                                    e.target.value
                                )
                            }
                            required
                        />

                        <div className="grid md:grid-cols-2 gap-4">
                            <input
                                className="input"
                                type="email"
                                placeholder="Email"
                                value={form.contactEmail}
                                onChange={(e) =>
                                    updateField(
                                        "contactEmail",
                                        e.target.value
                                    )
                                }
                                required
                            />

                            <input
                                className="input"
                                placeholder="Phone"
                                value={form.contactPhone}
                                onChange={(e) =>
                                    updateField(
                                        "contactPhone",
                                        e.target.value
                                    )
                                }
                                required
                            />
                        </div>
                    </section>

                    <button className="btn w-full">
                        Publish Listing
                    </button>
                </form>
            </div>
        </div>
    )
}