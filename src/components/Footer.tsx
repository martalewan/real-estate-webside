import { Link } from "react-router-dom"

const navigation = [
    {
        label: "Properties",
        href: "/properties"
    },
    {
        label: "List Property",
        href: "/add-property"
    },
    {
        label: "Favorites",
        href: "/favorites"
    }
]

export default function Footer() {
    return (
        <footer className="border-t border-[#eee6dd]">
            <div className="container py-20 space-y-16">
                <div className="grid md:grid-cols-2 gap-16 items-start">
                    <div className="space-y-6 max-w-md">
                        <p className="text-xs tracking-[0.35em] uppercase text-gray-400">
                            Estates
                        </p>

                        <h2 className="font-serif text-4xl leading-tight">
                            A modern platform for exceptional properties.
                        </h2>

                        <p className="text-gray-500 leading-relaxed">
                            Discover curated homes, architectural residences,
                            and premium real estate listings across global destinations.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-12 text-sm">
                        <div className="space-y-5">
                            <p className="text-xs tracking-[0.25em] uppercase text-gray-400">
                                Navigation
                            </p>

                            <div className="flex flex-col gap-3">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.href}
                                        to={item.href}
                                        className="text-gray-600 hover:text-black transition"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-5">
                            <p className="text-xs tracking-[0.25em] uppercase text-gray-400">
                                Contact
                            </p>

                            <div className="space-y-3 text-gray-600">
                                <p>mlewan.design@gmail.com</p>
                                <p>Paris · London · Dubai</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-[#eee6dd] flex flex-col md:flex-row gap-4 justify-between items-center text-xs tracking-[0.2em] uppercase text-gray-400">
                    <p>
                        © 2026 Estates
                    </p>

                    <p>
                        Designed & developed by Marta Lewandowska
                    </p>
                </div>
            </div>
        </footer>
    )
}