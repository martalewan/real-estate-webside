import { Link } from "react-router-dom"

export default function PropertyCard({ id, title, location, price, images }) {

    return (
        <Link to={`/property/${id}`}>

            <div className="space-y-4 cursor-pointer">

                <div className="overflow-hidden border border-[#e8e2da] bg-white">
                    <img
                        src={images?.[0]}
                        alt={title}
                        className="h-72 w-full object-cover transition duration-700 hover:scale-105"
                        loading="lazy"
                    />
                </div>

                <h4 className="font-serif text-xl">{title}</h4>

                <p className="text-sm text-gray-500">
                    {location} • {price}
                </p>

            </div>

        </Link>
    )
}