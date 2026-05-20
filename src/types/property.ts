export type PropertyType =
    | "villa"
    | "penthouse"
    | "chalet"
    | "loft"
    | "residence"

export type PropertyStatus =
    | "For Sale"
    | "New Listing"
    | "Exclusive"

export type EnergyRating = "A" | "B" | "C"

export type Property = {
    id: string
    _id?: string
    ownerId?: string
    type: PropertyType
    status: PropertyStatus
    location: string
    district: string
    title: string
    price: number
    bedrooms: number
    bathrooms: number
    size: number
    outdoorSize: number
    yearBuilt: number
    parkingSpaces: number
    energyRating: EnergyRating
    furnished: boolean
    amenities: string[]
    contactPerson: {
        name: string
        phone: string
        email: string
    }
    images: string[]
    description: string
    createdAt?: string
    updatedAt?: string
}