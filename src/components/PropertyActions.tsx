import useFavorites from "../hooks/useFavorites"

type Property = {
    id: string
    title: string
}

type PropertyActionsProps = {
    property: Property
}

export default function PropertyActions({
    property
}: PropertyActionsProps) {
    const { favorites, toggle } = useFavorites()

    const isFav = favorites.includes(property.id)

    const handlePrint = () => {
        window.print()
    }

    const handleEmail = () => {
        const subject = encodeURIComponent(property.title)

        const body = encodeURIComponent(
            `Check out this property:\n\n${window.location.href}`
        )

        window.location.href = `mailto:?subject=${subject}&body=${body}`
    }

    return (
        <div className="flex gap-6 text-xs tracking-wide uppercase text-gray-400">
            <button
                type="button"
                onClick={handlePrint}
                className="hover:text-black transition"
            >
                Print listing
            </button>

            <button
                type="button"
                onClick={handleEmail}
                className="hover:text-black transition"
            >
                Share via email
            </button>

            <button
                type="button"
                onClick={() => toggle(property.id)}
                className={`transition ${isFav ? "text-black" : "hover:text-black"
                    }`}
            >
                {isFav ? "♥ Saved" : "♡ Save to favorites"}
            </button>
        </div>
    )
}