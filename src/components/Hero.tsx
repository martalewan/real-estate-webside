import { Link } from "react-router-dom"

export default function Hero() {
    return (
        <section className="container min-h-screen pt-36 pb-28 overflow-visible">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-24 items-center">
                <div className="space-y-12">
                    <div className="space-y-7">
                        <p className="text-[11px] tracking-[0.34em] uppercase text-gray-400">
                            MEstates · Global Property Marketplace
                        </p>

                        <h1 className="font-serif text-6xl md:text-[98px] leading-[0.88] tracking-[-0.065em] text-black">
                            List beautifully.
                            <br />
                            Discover privately.
                        </h1>

                        <p className="max-w-xl text-lg leading-relaxed text-gray-500">
                            A polished marketplace for architectural homes,
                            private residences, and considered property listings
                            across leading global destinations.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <Link to="/properties" className="btn">
                            Browse properties
                        </Link>

                        <Link to="/add-property" className="btn-secondary">
                            List property
                        </Link>
                    </div>

                    <div className="flex items-center gap-10 pt-2">
                        <div className="relative pr-10">
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-px bg-[#e8e2da]" />

                            <p className="font-serif text-2xl leading-none text-black">
                                120+
                            </p>

                            <p className="mt-2 text-[11px] text-gray-400">
                                Curated Listings
                            </p>
                        </div>

                        <div className="relative pr-10">
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-px bg-[#e8e2da]" />

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

                <div className="relative max-w-[480px] ml-auto">
                    <div className="absolute -inset-5 border border-[#eee6dd]" />
                    <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full bg-[#efe7dc] blur-3xl opacity-70" />

                    <div className="relative aspect-[4/5] overflow-hidden bg-[#f8f5f0] shadow-[0_45px_110px_rgba(0,0,0,0.10)] group">
                        <img
                            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1400&auto=format&fit=crop"
                            alt="Premium residence interior"
                            className="h-full w-full object-cover transition duration-[2000ms] ease-out group-hover:scale-[1.025]"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
                    </div>


                    <div className="absolute -right-10 top-8">
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