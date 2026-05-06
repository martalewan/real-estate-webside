import { useEffect } from "react"
import { useZoomPan } from "../hooks/useZoomPan"

const SCALE = 2.5

export default function Lightbox({
    image,
    activeIndex,
    total,
    onClose,
    onNext,
    onPrev
}) {
    const {
        imgRef,
        zoomed,
        toggleZoom,
        onPointerDown,
        onPointerMove,
        onPointerUp
    } = useZoomPan({
        scale: SCALE,
        resetKey: image
    })

    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === "Escape") onClose()
            if (e.key === "ArrowRight") onNext(e)
            if (e.key === "ArrowLeft") onPrev(e)
        }

        window.addEventListener("keydown", onKeyDown)
        return () => window.removeEventListener("keydown", onKeyDown)
    }, [onClose, onNext, onPrev])

    return (
        <div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div
                className="relative w-[85%] h-[85%] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                onPointerLeave={onPointerUp}
            >
                <img
                    ref={imgRef}
                    src={image}
                    alt=""
                    draggable={false}
                    onPointerDown={onPointerDown}
                    onClick={toggleZoom}
                    className={`w-full h-full object-cover select-none transition-transform duration-150 touch-none ${zoomed
                        ? "cursor-grab active:cursor-grabbing"
                        : "cursor-zoom-in"
                        }`}
                />

                <button
                    type="button"
                    onClick={onPrev}
                    aria-label="Previous image"
                    className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full"
                >
                    ‹
                </button>

                <button
                    type="button"
                    onClick={onNext}
                    aria-label="Next image"
                    className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full"
                >
                    ›
                </button>

                <div className="absolute bottom-5 right-5 text-white bg-black/40 px-3 py-1 rounded-full">
                    {activeIndex + 1} / {total}
                </div>
            </div>
        </div>
    )
}