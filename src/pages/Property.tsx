import { useParams } from "react-router-dom"
import { properties } from "../data/data"
import Gallery from "../components/Gallery"
import PropertyActions from "../components/PropertyActions"

export default function Property() {
    const { id } = useParams<{ id: string }>()

    const property = properties.find(
        (property) => property.id === Number(id)
    )

    if (!property) {
        return (
            <div className="container py-20">
                Not found
            </div>
        )
    }

    return (
        <div className="container py-16 space-y-12">
            <h1 className="font-serif text-5xl">
                {property.title}
            </h1>

            <div className="space-y-1">
                <p className="text-gray-500">
                    {property.location}
                </p>

                <p className="text-gray-400 text-sm capitalize">
                    {property.type}
                </p>
            </div>

            <Gallery images={property.images} />

            <div className="pt-2 border-t border-[#f1ece6]">
                <PropertyActions property={property} />
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-4">
                    <p className="text-gray-600 leading-relaxed">
                        {property.description}
                    </p>
                </div>

                <div className="card space-y-2">
                    <p className="text-black font-medium text-lg">
                        ${property.price.toLocaleString()}
                    </p>

                    <div className="pt-2 space-y-1 text-gray-600">
                        <p>
                            <span className="text-gray-400">
                                Bedrooms:
                            </span>{" "}
                            {property.bedrooms}
                        </p>

                        <p>
                            <span className="text-gray-400">
                                Bathrooms:
                            </span>{" "}
                            {property.bathrooms}
                        </p>

                        <p>
                            <span className="text-gray-400">
                                Area:
                            </span>{" "}
                            {property.size} m²
                        </p>

                        <p>
                            <span className="text-gray-400">
                                Type:
                            </span>{" "}
                            {property.type}
                        </p>
                    </div>

                    <button className="btn mt-4">
                        Request Private Viewing
                    </button>
                </div>
            </div>
        </div>
    )
}