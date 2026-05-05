import { useEffect, useState } from "react"

export default function Gallery({ images = [] }) {
    const [activeIndex, setActiveIndex] = useState(null)

    const activeImage =
        activeIndex !== null ? images[activeIndex] : null

    // ESC to close modal
    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === "Escape") setActiveIndex(null)
        }

        window.addEventListener("keydown", onKeyDown)
        return () => window.removeEventListener("keydown", onKeyDown)
    }, [])

    if (!images.length) return null

    return (
        <div className="space-y-4">

            {/* ===== MAIN IMAGE ===== */}
            <div
                className="h-[500px] border border-[#e8e2da] bg-white cursor-pointer overflow-hidden"
                onClick={() => setActiveIndex(0)}
            >
                <img
                    src={images[0]}
                    alt="main"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* ===== THUMBNAILS ===== */}
            <div className="grid grid-cols-4 gap-3">
                {images.map((img, i) => (
                    <div
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className="h-24 border border-[#e8e2da] bg-white cursor-pointer overflow-hidden hover:opacity-80 transition"
                    >
                        <img
                            src={img}
                            alt={`thumb-${i}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>

            {/* ===== MODAL VIEWER ===== */}
            {activeImage && (
                <div
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                    onClick={() => setActiveIndex(null)}
                >
                    <div
                        className="w-[85%] h-[85%] bg-white flex items-center justify-center overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={activeImage}
                            alt="active"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            )}

        </div>
    )
}