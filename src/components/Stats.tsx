const stats = [
    {
        value: "120+",
        label: "Curated residences",
        text: "Selected properties across leading global destinations."
    },
    {
        value: "18",
        label: "International markets",
        text: "From coastal retreats to metropolitan penthouses."
    },
    {
        value: "Private",
        label: "Client experience",
        text: "Discreet enquiries, saved favorites, and tailored guidance."
    }
]

export default function Stats() {
    return (
        <section className="container py-32">
            <div className="max-w-3xl mx-auto text-center mb-20">
                <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">
                    Platform Overview
                </p>

                <h2 className="font-serif text-5xl leading-tight">
                    Designed for modern luxury property discovery.
                </h2>

                <p className="mt-6 text-gray-500 leading-relaxed">
                    A refined browsing experience focused on architecture,
                    location, and clarity — built for clients exploring
                    exceptional residences worldwide.
                </p>
            </div>

            <div className="grid md:grid-cols-3 border border-[#eee6dd] bg-white">
                {stats.map((stat, index) => (
                    <div
                        key={stat.label}
                        className={`p-10 md:p-12 text-center space-y-5 ${index !== stats.length - 1
                                ? "border-b md:border-b-0 md:border-r border-[#eee6dd]"
                                : ""
                            }`}
                    >
                        <p className="font-serif text-6xl text-black">
                            {stat.value}
                        </p>

                        <div className="space-y-2">
                            <h3 className="uppercase tracking-[0.2em] text-xs text-gray-400">
                                {stat.label}
                            </h3>

                            <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
                                {stat.text}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}