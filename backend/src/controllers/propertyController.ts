import { Request, Response } from "express"
import type { AuthRequest } from "../middleware/authMiddleware.js"
import { PropertyModel } from "../models/Property.js"

export async function getProperties(req: Request, res: Response) {
    const {
        type,
        status,
        location,
        minPrice,
        maxPrice,
        bedrooms,
        bathrooms
    } = req.query

    const query: Record<string, unknown> = {}

    if (type) query.type = String(type).toLowerCase()
    if (status) query.status = String(status)

    if (location) {
        query.$or = [
            { location: { $regex: String(location), $options: "i" } },
            { district: { $regex: String(location), $options: "i" } }
        ]
    }

    if (minPrice || maxPrice) {
        query.price = {}

        if (minPrice) {
            ; (query.price as Record<string, number>).$gte = Number(minPrice)
        }

        if (maxPrice) {
            ; (query.price as Record<string, number>).$lte = Number(maxPrice)
        }
    }

    if (bedrooms) {
        query.bedrooms = { $gte: Number(bedrooms) }
    }

    if (bathrooms) {
        query.bathrooms = { $gte: Number(bathrooms) }
    }

    const properties = await PropertyModel.find(query).sort({
        createdAt: -1
    })

    res.json(properties)
}

export async function getProperty(req: Request, res: Response) {
    const property = await PropertyModel.findById(req.params.id)

    if (!property) {
        return res.status(404).json({
            message: "Property not found"
        })
    }

    res.json(property)
}

export async function createProperty(req: AuthRequest, res: Response) {
    const newProperty = await PropertyModel.create({
        ...req.body,
        ownerId: req.user?.id
    })

    res.status(201).json(newProperty)
}

export async function updateProperty(req: AuthRequest, res: Response) {
    const property = await PropertyModel.findById(req.params.id)

    if (!property) {
        return res.status(404).json({
            message: "Property not found"
        })
    }

    if (property.ownerId.toString() !== req.user?.id) {
        return res.status(403).json({
            message: "Not authorized"
        })
    }

    const updatedProperty = await PropertyModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )

    res.json(updatedProperty)
}

export async function deleteProperty(req: AuthRequest, res: Response) {
    const property = await PropertyModel.findById(req.params.id)

    if (!property) {
        return res.status(404).json({
            message: "Property not found"
        })
    }

    if (property.ownerId.toString() !== req.user?.id) {
        return res.status(403).json({
            message: "Not authorized"
        })
    }

    await property.deleteOne()

    res.json({
        message: "Property deleted successfully"
    })
}