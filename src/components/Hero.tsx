export default function Hero() {
    return (
        <section className="container py-24 text-center space-y-10">

            <h1 className="font-serif text-6xl md:text-7xl tracking-tight">
                Exceptional <br /> Residences
            </h1>

            <p className="max-w-2xl mx-auto text-gray-500 leading-relaxed">
                A curated collection of the world’s most refined homes.
                Architecture, space, and light—selected with precision.
            </p>

            <div className="max-w-xl mx-auto">
                <input
                    placeholder="Search location or property name"
                    className="text-center"
                />
            </div>

        </section>
    )
}