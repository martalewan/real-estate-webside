const API_URL = "http://localhost:5001"

export async function registerUser(data: {
    name: string
    email: string
    password: string
}) {
    const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        throw new Error("Failed to register")
    }

    return response.json()
}

export async function loginUser(data: {
    email: string
    password: string
}) {
    const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        throw new Error("Failed to login")
    }

    return response.json()
}