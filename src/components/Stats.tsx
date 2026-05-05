export default function Stats() {
    return (
        <section className="container py-24 text-center space-y-10">

            <h2 className="font-serif text-4xl">
                Curated. Not Listed.
            </h2>

            <p className="max-w-2xl mx-auto text-gray-500">
                Every residence is selected with architectural intention,
                privacy standards, and long-term value in mind.
            </p>

            <div className="grid md:grid-cols-3 gap-10 pt-10 text-sm text-gray-500">

                <div>
                    <p className="text-2xl text-black font-medium">120+</p>
                    Exclusive Properties
                </div>

                <div>
                    <p className="text-2xl text-black font-medium">18</p>
                    Countries
                </div>

                <div>
                    <p className="text-2xl text-black font-medium">Private</p>
                    Client Network
                </div>

            </div>

        </section>
    )
}