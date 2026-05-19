import type { Property } from "../../backend/src/data.js"

const API_URL = "http://localhost:5001"

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

export async function createProperty(property: Omit<Property, "id">): Promise<Property> {
    const response = await fetch(`${API_URL}/api/properties`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(property)
    })

    if (!response.ok) {
        throw new Error("Failed to create property")
    }

    return response.json()
}