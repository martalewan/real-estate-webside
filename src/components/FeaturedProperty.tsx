export default function FeaturedProperty() {
    return (
        <section className="container py-24">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                    <h2 className="font-serif text-4xl">
                        Villa Aurora
                    </h2>

                    <p className="text-gray-500 leading-relaxed">
                        A rare architectural estate overlooking the Mediterranean.
                        Designed with stone, glass, and silence in mind.
                    </p>

                    <div className="text-sm text-gray-500 space-y-1">
                        <p>Cap Ferrat, France</p>
                        <p>
                            6 Bedrooms • 7 Bathrooms • 850 m²
                        </p>
                        <p className="text-black font-medium">
                            $18,500,000
                        </p>
                    </div>

                    <div className="flex gap-4 pt-2">
                        <button className="btn">
                            View Property
                        </button>

                        <button className="btn-secondary">
                            Request Private Tour
                        </button>
                    </div>
                </div>

                <div className="h-[520px] border border-[#e8e2da] bg-white flex items-center justify-center text-gray-400">
                    Featured Property Image
                </div>
            </div>
        </section>
    )
}