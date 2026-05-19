import express, { Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"
import { properties, Property } from "./data.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

app.use(cors())
app.use(express.json())

app.get("/", (_req: Request, res: Response) => {
    res.send("Estates API is running")
})

app.get("/api/properties", (req: Request, res: Response<Property[]>) => {
    const {
        type,
        status,
        location,
        minPrice,
        maxPrice,
        bedrooms,
        bathrooms
    } = req.query

    let filtered = [...properties]

    if (type) {
        filtered = filtered.filter(
            property => property.type === String(type).toLowerCase()
        )
    }

    if (status) {
        filtered = filtered.filter(
            property =>
                property.status.toLowerCase() === String(status).toLowerCase()
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

    if (bedrooms) {
        filtered = filtered.filter(property => property.bedrooms >= Number(bedrooms))
    }

    if (bathrooms) {
        filtered = filtered.filter(property => property.bathrooms >= Number(bathrooms))
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