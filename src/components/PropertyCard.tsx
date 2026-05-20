import { Link } from "react-router-dom"
import { BedDouble, Bath, Ruler } from "lucide-react"
import useFavorites from "../hooks/useFavorites"

type PropertyCardProps = {
    id: string
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
    const { isFavorite, toggle } = useFavorites()
    const saved = isFavorite(id)

    return (
        <div className="group">
            <div className="relative overflow-hidden border border-[#e8e2da] bg-white">
                <Link to={`/properties/${id}`}>
                    <img
                        src={images?.[0]}
                        alt={title}
                        className="h-70 w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                        loading="lazy"
                    />
                </Link>

                <button
                    type="button"
                    onClick={() => toggle(id)}
                    className="absolute right-4 top-4 h-10 w-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-lg shadow-sm hover:bg-white transition"
                    aria-label={
                        saved
                            ? "Remove from favorites"
                            : "Save to favorites"
                    }
                >
                    {saved ? "♥" : "♡"}
                </button>
            </div>

            <Link to={`/properties/${id}`} className="no-link-effect block">
                <div className="pt-4 space-y-3">
                    <div className="space-y-2">
                        <h4 className="font-serif text-xl leading-snug text-gray-900 min-h-[56px]">
                            {title}
                        </h4>

                        <div className="space-y-1">
                            <p className="text-sm text-gray-500">
                                {location}
                            </p>

                            <p className="text-base font-light text-gray-900">
                                {price}
                            </p>
                        </div>
                    </div>

                    <div className="border-t border-[#f1ece6] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />

                    <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                                <BedDouble size={14} />
                                <span>{bedrooms}</span>
                            </div>

                            <div className="flex items-center gap-1.5">
                                <Bath size={14} />
                                <span>{bathrooms}</span>
                            </div>

                            <div className="flex items-center gap-1.5">
                                <Ruler size={14} />
                                <span>{size} m²</span>
                            </div>
                        </div>

                        <span className="capitalize text-gray-400">
                            {type}
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    )
}