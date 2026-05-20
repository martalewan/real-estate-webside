import type { Property } from "../types/property"

const API_URL = "http://localhost:5001"

function normalizeProperty(property: any): Property {
    return {
        ...property,
        id: property._id
    }
}

function getAuthHeaders() {
    const token = localStorage.getItem("token")

    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    }
}

export async function getProperties(): Promise<Property[]> {
    const response = await fetch(`${API_URL}/api/properties`)

    if (!response.ok) {
        throw new Error("Failed to fetch properties")
    }

    const data = await response.json()

    return data.map(normalizeProperty)
}

export async function getProperty(id: string): Promise<Property> {
    const response = await fetch(`${API_URL}/api/properties/${id}`)

    if (!response.ok) {
        throw new Error("Failed to fetch property")
    }

    const data = await response.json()
    return normalizeProperty(data)
}

export async function createProperty(
    property: Omit<Property, "id">
): Promise<Property> {
    const response = await fetch(`${API_URL}/api/properties`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(property)
    })

    if (!response.ok) {
        throw new Error("Failed to create property")
    }

    const data = await response.json()
    return normalizeProperty(data)
}

export async function updateProperty(
    id: string,
    property: Omit<Property, "id">
): Promise<Property> {
    const response = await fetch(`${API_URL}/api/properties/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(property)
    })

    if (!response.ok) {
        throw new Error("Failed to update property")
    }

    const data = await response.json()
    return normalizeProperty(data)
}

export async function deleteProperty(id: string) {
    const response = await fetch(`${API_URL}/api/properties/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders()
    })

    if (!response.ok) {
        throw new Error("Failed to delete property")
    }

    return response.json()
}

export async function getMyProperties(): Promise<Property[]> {
    const response = await fetch(`${API_URL}/api/properties`, {
        headers: getAuthHeaders()
    })

    if (!response.ok) {
        throw new Error("Failed to fetch my properties")
    }

    const data = await response.json()
    const properties: Property[] = data.map(normalizeProperty)

    const user = JSON.parse(localStorage.getItem("user") || "null")

    return properties.filter(
        (property) => property.ownerId === user?.id
    )
}