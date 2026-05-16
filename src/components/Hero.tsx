import { Link } from "react-router-dom"

export default function Hero() {
    return (
        <section className="container min-h-screen overflow-hidden pt-32 pb-20 sm:pt-40 lg:pt-56 lg:pb-28">
            <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">

                <div className="space-y-12">
                    <div className="space-y-7">

                        <p className="text-[11px] tracking-[0.34em] uppercase text-gray-400">
                            MEstates · Global Property Marketplace
                        </p>

                        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[98px] leading-[0.95] lg:leading-[0.88] tracking-[-0.065em] text-black">
                            List beautifully.
                            <br />
                            Discover privately.
                        </h1>

                        <p className="max-w-xl text-base sm:text-lg leading-relaxed text-gray-500">
                            A polished marketplace for architectural homes,
                            private residences, and considered property listings
                            across leading global destinations.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4">
                        <Link
                            to="/properties"
                            className="btn w-full sm:w-auto"
                        >
                            Browse properties
                        </Link>

                        <Link
                            to="/add-property"
                            className="btn-secondary w-full sm:w-auto"
                        >
                            List property
                        </Link>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-10 pt-2">

                        <div className="relative sm:pr-10">
                            <div className="absolute right-0 top-1/2 hidden h-8 w-px -translate-y-1/2 bg-[#e8e2da] sm:block" />

                            <p className="font-serif text-2xl leading-none text-black">
                                120+
                            </p>

                            <p className="mt-2 text-[11px] text-gray-400">
                                Curated Listings
                            </p>
                        </div>

                        <div className="relative sm:pr-10">
                            <div className="absolute right-5 top-1/2 hidden h-8 w-px -translate-y-1/2 bg-[#e8e2da] sm:block" />

                            <p className="font-serif text-2xl leading-none text-black">
                                18
                            </p>

                            <p className="mt-2 text-[11px] text-gray-400">
                                International Cities
                            </p>
                        </div>

                        <div>
                            <p className="font-serif text-2xl leading-none text-black">
                                Private
                            </p>

                            <p className="mt-2 text-[11px] text-gray-400">
                                Client Enquiries
                            </p>
                        </div>
                    </div>
                </div>

                <div className="relative w-full max-w-sm sm:max-w-[420px] mx-auto lg:ml-auto">

                    <div className="absolute -inset-5 border border-[#eee6dd]" />

                    <div className="absolute -right-4 -top-4 sm:-right-8 sm:-top-8 h-32 w-32 sm:h-48 sm:w-48 rounded-full bg-[#efe7dc] blur-3xl opacity-70" />

                    <div className="relative aspect-[4/5] overflow-hidden bg-[#f8f5f0] shadow-[0_45px_110px_rgba(0,0,0,0.10)] group">

                        <img
                            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1400&auto=format&fit=crop"
                            alt="Premium residence interior"
                            className="h-full w-full object-cover transition duration-[2000ms] ease-out group-hover:scale-[1.025]"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
                    </div>

                    <div className="absolute right-4 top-4 sm:right-10 sm:top-8 scale-75 sm:scale-100">

                        <div className="relative flex items-center justify-center">

                            <div className="absolute h-40 w-40 rounded-full bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)]" />

                            <svg
                                className="absolute h-36 w-36 animate-[spin_50s_linear_infinite]"
                                viewBox="0 0 200 200"
                            >
                                <defs>
                                    <path
                                        id="heroCirclePath"
                                        d="
                                            M 100,100
                                            m -74,0
                                            a 74,74 0 1,1 148,0
                                            a 74,74 0 1,1 -148,0
                                        "
                                    />
                                </defs>

                                <text
                                    fill="black"
                                    fontSize="14"
                                    fontWeight="500"
                                    letterSpacing="3"
                                    opacity="0.9"
                                >
                                    <textPath href="#heroCirclePath">
                                        MESTATES • PREMIUM HOMES • PRIVATE LISTINGS •
                                    </textPath>
                                </text>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}