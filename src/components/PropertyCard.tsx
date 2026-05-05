export default function PropertyCard({ title, location, price }) {
    return (
        <div className="space-y-4">
            <div className="h-72 border border-[#e8e2da] bg-white" />

            <h4 className="font-serif text-xl">{title}</h4>

            <p className="text-sm text-gray-500">
                {location} • {price}
            </p>
        </div>
    )
}