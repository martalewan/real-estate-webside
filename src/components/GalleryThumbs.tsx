export default function GalleryThumbs({ images, onSelect }) {
    return (
        <div className="grid grid-cols-4 gap-3">
            {images.map((img, i) => (
                <button
                    key={i}
                    type="button"
                    onClick={() => onSelect(i)}
                    className="h-24 overflow-hidden border bg-white cursor-pointer"
                    aria-label={`Open image ${i + 1}`}
                >
                    <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </button>
            ))}
        </div>
    )
}