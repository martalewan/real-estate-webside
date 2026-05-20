import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import AuthLayout from "../layouts/AuthLayout"
import useAuth from "../hooks/useAuth"
import { getAuthFrom, clearAuthFrom } from "../helpers/authRedirect"
import { loginUser } from "../api/auth"

export default function Login() {
    const navigate = useNavigate()
    const { signIn } = useAuth()

    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (
        e: React.SyntheticEvent<HTMLFormElement>
    ) => {
        e.preventDefault()

        try {
            setLoading(true)
            setError("")

            const data = await loginUser({
                email: form.email,
                password: form.password
            })

            localStorage.setItem("token", data.token)
            localStorage.setItem("user", JSON.stringify(data.user))

            signIn(data.user)

            const from = getAuthFrom()
            clearAuthFrom()

            navigate(from)
        } catch {
            setError("Invalid email or password.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthLayout title="Welcome back" subtitle="Sign in to your account">
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    className="input"
                    value={form.email}
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="input"
                    value={form.password}
                    onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                    }
                    required
                />

                {error && (
                    <p className="text-sm text-red-500">
                        {error}
                    </p>
                )}

                <button className="btn w-full" disabled={loading}>
                    {loading ? "Signing in..." : "Sign in"}
                </button>

                <button
                    type="button"
                    className="btn-secondary w-full"
                    onClick={() => navigate(getAuthFrom())}
                >
                    Cancel
                </button>
            </form>

            <p className="text-sm text-center text-gray-500">
                No account?{" "}
                <Link className="text-black" to="/register">
                    Create one
                </Link>
            </p>
        </AuthLayout>
    )
}