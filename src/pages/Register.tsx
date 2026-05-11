import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthLayout from "../layouts/AuthLayout"
import useAuth from "../hooks/useAuth"
import {
    getAuthFrom,
    clearAuthFrom
} from "../helpers/authRedirect"

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

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault()

        signIn({
            email: form.email,
            name: form.name,
            id: crypto.randomUUID(),
        })

        const from = getAuthFrom()

        clearAuthFrom()

        navigate(from)
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
                />

                <button className="btn w-full">
                    Create account
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