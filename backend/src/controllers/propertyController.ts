import { Request, Response } from "express"
import { properties, type Property } from "../data.js"
import type { AuthRequest } from "../middleware/authMiddleware.js"

export function getProperties(req: Request, res: Response<Property[]>) {
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
}

export function getProperty(req: Request, res: Response) {
    const property = properties.find(
        property => property.id === Number(req.params.id)
    )

    if (!property) {
        return res.status(404).json({ message: "Property not found" })
    }

    res.json(property)
}

export function createProperty(req: AuthRequest, res: Response) {
    const newProperty: Property = {
        ...req.body,
        id: properties.length + 1,
        ownerId: req.user?.id
    }

    properties.push(newProperty)

    res.status(201).json(newProperty)
}

export function updateProperty(req: AuthRequest, res: Response) {
    const propertyId = Number(req.params.id)

    const index = properties.findIndex(
        property => property.id === propertyId
    )

    if (index === -1) {
        return res.status(404).json({
            message: "Property not found"
        })
    }

    const updatedProperty: Property = {
        ...properties[index],
        ...req.body,
        id: propertyId
    }

    properties[index] = updatedProperty

    res.json(updatedProperty)
}

export function deleteProperty(req: AuthRequest, res: Response) {
    const propertyId = Number(req.params.id)

    const index = properties.findIndex(
        property => property.id === propertyId
    )

    if (index === -1) {
        return res.status(404).json({
            message: "Property not found"
        })
    }

    const deletedProperty = properties.splice(index, 1)[0]

    res.json({
        message: "Property deleted successfully",
        property: deletedProperty
    })
}