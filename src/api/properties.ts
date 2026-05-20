import type { Property } from "../../backend/src/data.js"

const API_URL = "http://localhost:5001"

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

    return response.json()
}

export async function getProperty(id: number): Promise<Property> {
    const response = await fetch(`${API_URL}/api/properties/${id}`)

    if (!response.ok) {
        throw new Error("Failed to fetch property")
    }

    return response.json()
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

    return response.json()
}

export async function updateProperty(
    id: number,
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

    return response.json()
}

export async function deleteProperty(id: number) {
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

    const properties: Property[] = await response.json()
    const user = JSON.parse(localStorage.getItem("user") || "null")

    return properties.filter(
        (property) => property.ownerId === user?.id
    )
}