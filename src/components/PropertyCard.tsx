import { Link } from "react-router-dom"

type PropertyCardProps = {
    id: number
    title: string
    location: string
    price: string | number
    images?: string[]
    bedrooms: number
    bathrooms: number
    size: number
    type: string
}

export default function PropertyCard({
    id,
    title,
    location,
    price,
    images,
    bedrooms,
    bathrooms,
    size,
    type
}: PropertyCardProps) {
    return (
        <Link to={`/property/${id}`}>
            <div className="group cursor-pointer">
                <div className="overflow-hidden border border-[#e8e2da] bg-white">
                    <img
                        src={images?.[0]}
                        alt={title}
                        className="h-70 w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                        loading="lazy"
                    />
                </div>

                <div className="pt-4 space-y-3">
                    <div className="flex items-start justify-between gap-6">
                        <h4 className="font-serif text-xl leading-snug text-gray-900">
                            {title}
                        </h4>

                        <span className="text-lg font-light text-gray-900 whitespace-nowrap">
                            {price}
                        </span>
                    </div>

                    <p className="text-sm text-gray-500">
                        {location}
                    </p>

                    <div className="border-t border-[#f1ece6]" />

                    <div className="flex justify-between text-xs text-gray-500 tracking-wide">
                        <div className="flex gap-4">
                            <span>{bedrooms} bd</span>
                            <span>{bathrooms} ba</span>
                            <span>{size} m²</span>
                        </div>

                        <span className="capitalize text-gray-400">
                            {type}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}