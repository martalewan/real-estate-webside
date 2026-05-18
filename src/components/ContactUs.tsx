const contactDetails = [
    {
        label: "Email",
        value: "mlewan.design@gmail.com"
    },
    {
        label: "Office",
        value: "Paris"
    },
    {
        label: "Availability",
        value: "Private consultations by appointment"
    }
]

export default function ContactUs() {
    return (
        <section className="container py-24 border-t border-[#eee6dd]" id="contact">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
                <div className="max-w-xl">
                    <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">
                        Contact Us
                    </p>

                    <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-6">
                        Begin your search with discretion and clarity.
                    </h2>

                    <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                        Whether you are searching for a primary residence,
                        investment opportunity, or a private off-market home,
                        our team offers a tailored approach designed around
                        your preferences and pace.
                    </p>

                    <div className="mt-10 space-y-6">
                        {contactDetails.map((item) => (
                            <div
                                key={item.label}
                                className="border-b border-[#eee6dd] pb-4"
                            >
                                <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-2">
                                    {item.label}
                                </p>

                                <p className="font-serif text-xl">
                                    {item.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border border-[#eee6dd] bg-white p-8 md:p-10">
                    <form className="space-y-6">
                        <div>
                            <label className="text-xs tracking-[0.3em] uppercase text-gray-400 block mb-3">
                                Full Name
                            </label>

                            <input
                                type="text"
                                placeholder="Your name"
                                className="w-full border-b border-[#d8cfc4] bg-transparent pb-3 outline-none placeholder:text-gray-400 focus:border-black transition"
                            />
                        </div>

                        <div>
                            <label className="text-xs tracking-[0.3em] uppercase text-gray-400 block mb-3">
                                Email Address
                            </label>

                            <input
                                type="email"
                                placeholder="name@email.com"
                                className="w-full border-b border-[#d8cfc4] bg-transparent pb-3 outline-none placeholder:text-gray-400 focus:border-black transition"
                            />
                        </div>

                        <div>
                            <label className="text-xs tracking-[0.3em] uppercase text-gray-400 block mb-3">
                                Message
                            </label>

                            <textarea
                                rows={5}
                                placeholder="Tell us about the residence or market you are interested in."
                                className="w-full border-b border-[#d8cfc4] bg-transparent pb-3 outline-none placeholder:text-gray-400 focus:border-black transition resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="group inline-flex items-center gap-4 pt-4"
                        >
                            <span className="text-sm tracking-[0.25em] uppercase">
                                Send Inquiry
                            </span>

                            <span className="h-px w-12 bg-black transition-all duration-300 group-hover:w-20" />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}