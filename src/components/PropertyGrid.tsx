import PropertyCard from "./PropertyCard"

export default function PropertyGrid() {
    return (
        <section className="container py-24">

            <div className="mb-12">
                <h3 className="font-serif text-3xl">Available Residences</h3>
                <div className="divider mt-6" />
            </div>

            <div className="grid md:grid-cols-3 gap-10">

                <PropertyCard
                    title="West Village Loft"
                    location="New York"
                    price="$4.2M"
                />

                <PropertyCard
                    title="Coastal Residence"
                    location="Malibu"
                    price="$9.8M"
                />

                <PropertyCard
                    title="Penthouse Suite"
                    location="Paris"
                    price="$7.1M"
                />

            </div>
        </section>
    )
}