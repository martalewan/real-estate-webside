import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import AuthLayout from "../layouts/AuthLayout"
import useAuth from "../hooks/useAuth"
import { getAuthFrom, clearAuthFrom } from "../helpers/authRedirect"

export default function Login() {
    const navigate = useNavigate()
    const { signIn } = useAuth()

    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        signIn({
            email: form.email,
            name: "User"
        })

        const from = getAuthFrom()
        clearAuthFrom()

        navigate(from)
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
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="input"
                    value={form.password}
                    onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                    }
                />

                <button className="btn w-full">
                    Sign in
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