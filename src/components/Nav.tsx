import { Link, useLocation } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { setAuthFrom } from "../helpers/authRedirect"

export default function Nav() {
    const { user, signOut } = useAuth()
    const location = useLocation()

    return (
        <header className="container py-10 flex justify-between items-center">

            <div className="text-xs tracking-[0.3em] uppercase text-gray-500">
                <Link to="/">Estates</Link>
            </div>

            <nav className="flex gap-8 text-sm text-gray-600 items-center">

                <Link to="/properties">Properties</Link>

                {!user ? (
                    <>
                        <Link
                            to="/login"
                            onClick={() => setAuthFrom(location.pathname)}
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            onClick={() => setAuthFrom(location.pathname)}
                        >
                            Create account
                        </Link>
                    </>
                ) : (
                    <>
                        <span className="text-gray-500">
                            {user.name || user.email}
                        </span>

                        <button onClick={signOut}>
                            Logout
                        </button>
                    </>
                )}

            </nav>

        </header>
    )
}