const items = [
    {
        number: "01",
        label: "Curated Listings",
        title: "Quality over quantity",
        text: "Every residence is selected for architecture, location, privacy, and long-term value."
    },
    {
        number: "02",
        label: "Private Access",
        title: "Beyond public listings",
        text: "Discover refined homes and discreet opportunities across leading global markets."
    },
    {
        number: "03",
        label: "Advisory First",
        title: "Guidance at every step",
        text: "From search to private viewing, the experience is built around clarity and confidence."
    }
]

export default function WhyUs() {
    return (
        <section className="container py-24" id="about">
            <div className="mb-14 max-w-2xl">
                <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">
                    Why Estates
                </p>

                <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                    A quieter, more selective way to find exceptional homes.
                </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {items.map((item) => (
                    <div
                        key={item.number}
                        className="group border border-[#eee6dd] bg-white p-8 min-h-[280px] flex flex-col justify-between transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                        <div>
                            <div className="flex items-center justify-between mb-10">
                                <p className="text-xs tracking-[0.3em] uppercase text-gray-400">
                                    {item.label}
                                </p>

                                <span className="font-serif text-4xl text-[#e8e2da] group-hover:text-black transition">
                                    {item.number}
                                </span>
                            </div>

                            <h3 className="font-serif text-2xl mb-4">
                                {item.title}
                            </h3>

                            <p className="text-sm text-gray-500 leading-relaxed">
                                {item.text}
                            </p>
                        </div>

                        <div className="mt-10 h-px w-12 bg-[#d8cfc4] group-hover:w-20 group-hover:bg-black transition-all" />
                    </div>
                ))}
            </div>
        </section>
    )
}