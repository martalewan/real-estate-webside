import { properties } from "../data/data";
import PropertyCard from "./PropertyCard";

export default function PropertyGrid() {
    return (
        <section className="container py-24">

            <div className="mb-12">
                <h3 className="font-serif text-3xl">Available Residences</h3>
                <div className="divider mt-6" />
            </div>

            <div className="grid md:grid-cols-3 gap-10">

                {properties.slice(0, 3).map((p) => (
                    <PropertyCard
                        key={p.id}
                        id={p.id}
                        title={p.title}
                        location={p.location}
                        price={`$${p.price.toLocaleString()}`}
                        images={p.images}
                    />
                ))}

            </div>
        </section>
    )
}