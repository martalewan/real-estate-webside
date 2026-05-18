import { Link, useLocation } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { setAuthFrom } from "../helpers/authRedirect"
import useFavorites from "../hooks/useFavorites"

export default function Nav() {
    const { user, signOut } = useAuth()
    const location = useLocation()
    const { favorites } = useFavorites()


    return (
        <header className="absolute top-0 left-0 w-full z-50">
            <div className="container py-8 flex justify-between items-center">
                <Link
                    to="/"
                    className="font-serif text-2xl tracking-[-0.04em] text-black"
                >
                    MEstates
                </Link>

                <nav className="flex items-center gap-8 text-sm text-gray-600">

                    <Link
                        to="/properties"
                        className="hover:text-black transition"
                    >
                        Properties
                    </Link>

                    <Link
                        to="/favorites"
                        className="hover:text-black transition flex items-center gap-2"
                    >
                        Favorites

                        {favorites.length > 0 && (
                            <span className="text-[11px] text-gray-400">
                                ({favorites.length})
                            </span>
                        )}
                    </Link>

                    {!user ? (
                        <>
                            <Link
                                to="/login"
                                onClick={() =>
                                    setAuthFrom(location.pathname)
                                }
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                onClick={() =>
                                    setAuthFrom(location.pathname)
                                }
                            >
                                Create account
                            </Link>
                        </>
                    ) : (
                        <>
                            <span className="text-gray-500">
                                {user.name || user.email}
                            </span>

                            <button
                                onClick={signOut}
                            >
                                Logout
                            </button>
                        </>
                    )}
                </nav>
            </div>
        </header>
    )
}