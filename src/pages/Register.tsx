import { useState } from "react"
import { useNavigate } from "react-router-dom"

import AuthLayout from "../layouts/AuthLayout"
import useAuth from "../hooks/useAuth"

import {
    getAuthFrom,
    clearAuthFrom
} from "../helpers/authRedirect"

import { registerUser, loginUser } from "../api/auth"

type RegisterForm = {
    name: string
    email: string
    password: string
}

export default function Register() {
    const navigate = useNavigate()
    const { signIn } = useAuth()

    const [form, setForm] = useState<RegisterForm>({
        name: "",
        email: "",
        password: ""
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault()

        try {
            setLoading(true)
            setError("")

            await registerUser({
                name: form.name,
                email: form.email,
                password: form.password
            })

            const data = await loginUser({
                email: form.email,
                password: form.password
            })

            localStorage.setItem(
                "token",
                data.token
            )

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            )

            signIn(data.user)

            const from = getAuthFrom()

            clearAuthFrom()

            navigate(from)

        } catch {
            setError("Failed to create account.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthLayout
            title="Create account"
            subtitle="Join the platform"
        >

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >

                <input
                    type="text"
                    placeholder="Name"
                    className="input"
                    value={form.name}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            name: e.target.value
                        })
                    }
                    required
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="input"
                    value={form.email}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            email: e.target.value
                        })
                    }
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="input"
                    value={form.password}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            password: e.target.value
                        })
                    }
                    required
                />

                {error && (
                    <p className="text-sm text-red-500">
                        {error}
                    </p>
                )}

                <button
                    className="btn w-full"
                    disabled={loading}
                >
                    {loading
                        ? "Creating account..."
                        : "Create account"}
                </button>

                <button
                    type="button"
                    className="btn-secondary w-full"
                    onClick={() =>
                        navigate(getAuthFrom())
                    }
                >
                    Cancel
                </button>

            </form>

        </AuthLayout>
    )
}