import { useState } from "react"
import GalleryThumbs from "./GalleryThumbs"
import Lightbox from "./Lightbox"

export default function Gallery({ images = [] }) {
    const [activeIndex, setActiveIndex] = useState(null)

    if (!images.length) return null

    const activeImage =
        activeIndex !== null ? images[activeIndex] : null

    const next = (e) => {
        e.stopPropagation()
        setActiveIndex((p) => (p === images.length - 1 ? 0 : p + 1))
    }

    const prev = (e) => {
        e.stopPropagation()
        setActiveIndex((p) => (p === 0 ? images.length - 1 : p - 1))
    }

    return (
        <div className="space-y-4">
            <button
                type="button"
                className="h-[520px] w-full overflow-hidden border bg-white cursor-pointer"
                onClick={() => setActiveIndex(0)}
                aria-label="Open main image"
            >
                <img
                    src={images[0]}
                    alt=""
                    className="w-full h-full object-cover"
                />
            </button>

            <GalleryThumbs
                images={images}
                onSelect={setActiveIndex}
            />

            {activeImage && (
                <Lightbox
                    image={activeImage}
                    activeIndex={activeIndex}
                    total={images.length}
                    onClose={() => setActiveIndex(null)}
                    onNext={next}
                    onPrev={prev}
                />
            )}
        </div>
    )
}