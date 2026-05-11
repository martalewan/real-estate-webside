import { useState } from "react";
import type { MouseEvent } from "react";
import GalleryThumbs from "./GalleryThumbs";
import Lightbox from "./Lightbox";

type GalleryProps = {
    images?: string[];
};

type LightboxActionEvent =
    | MouseEvent<HTMLButtonElement>
    | globalThis.KeyboardEvent;

export default function Gallery({ images = [] }: GalleryProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    if (!images.length) return null;

    const activeImage =
        activeIndex !== null ? images[activeIndex] : null;

    const next = (e: LightboxActionEvent) => {
        e.stopPropagation();

        setActiveIndex((prev) =>
            prev === null
                ? 0
                : prev === images.length - 1
                    ? 0
                    : prev + 1
        );
    };

    const prev = (e: LightboxActionEvent) => {
        e.stopPropagation();

        setActiveIndex((prev) =>
            prev === null
                ? 0
                : prev === 0
                    ? images.length - 1
                    : prev - 1
        );
    };

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
    );
}