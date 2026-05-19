import express, { Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

app.use(cors())
app.use(express.json())

type PropertyType = "villa" | "penthouse" | "chalet" | "loft" | "residence"
type PropertyStatus = "For Sale" | "New Listing" | "Exclusive"
type EnergyRating = "A" | "B" | "C"

type Property = {
    id: number
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
}

const properties: Property[] = [
    {
        id: 1,
        type: "villa",
        status: "For Sale",
        location: "Marbella, Spain",
        district: "Golden Mile",
        title: "Elegant Villa in Marbella",
        price: 2400000,
        bedrooms: 5,
        bathrooms: 4,
        size: 420,
        outdoorSize: 180,
        yearBuilt: 2021,
        parkingSpaces: 2,
        energyRating: "A",
        furnished: true,
        amenities: ["Private pool", "Garden", "Terrace", "Garage", "Security"],
        contactPerson: {
            name: "Marta Lewandowska",
            phone: "+33 6 24 18 90 42",
            email: "marta@example.com"
        },
        images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80"
        ],
        description: "A luxury villa with sea views, private pool and modern interiors."
    }
]

app.get("/", (_req: Request, res: Response) => {
    res.send("Estates API is running")
})

app.get("/api/properties", (req: Request, res: Response<Property[]>) => {
    const { type, status, location, minPrice, maxPrice } = req.query

    let filtered = [...properties]

    if (type) {
        filtered = filtered.filter(
            property => property.type === String(type).toLowerCase()
        )
    }

    if (status) {
        filtered = filtered.filter(
            property => property.status.toLowerCase() === String(status).toLowerCase()
        )
    }

    if (location) {
        filtered = filtered.filter(
            property =>
                property.location.toLowerCase().includes(String(location).toLowerCase()) ||
                property.district.toLowerCase().includes(String(location).toLowerCase())
        )
    }

    if (minPrice) {
        filtered = filtered.filter(property => property.price >= Number(minPrice))
    }

    if (maxPrice) {
        filtered = filtered.filter(property => property.price <= Number(maxPrice))
    }

    res.json(filtered)
})

app.get("/api/properties/:id", (req: Request, res: Response) => {
    const property = properties.find(
        property => property.id === Number(req.params.id)
    )

    if (!property) {
        return res.status(404).json({ message: "Property not found" })
    }

    res.json(property)
})

app.post("/api/contact", (req: Request, res: Response) => {
    const { name, email, message, propertyId } = req.body

    if (!name || !email || !message) {
        return res.status(400).json({
            message: "Name, email and message are required"
        })
    }

    res.status(201).json({
        message: "Message received successfully",
        data: {
            name,
            email,
            message,
            propertyId: propertyId || null
        }
    })
})

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`)
})