import type { PropertyForm } from "../pages/ListProperty"
type Props = {
    form: PropertyForm
    handleMainImageUpload: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void
    handleGalleryUpload: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void
}

export default function ImagesSection({
    form,
    handleMainImageUpload,
    handleGalleryUpload
}: Props) {
    return (
        <section className="space-y-6">

            <p className="text-[11px] tracking-[0.3em] uppercase text-gray-400">
                Images
            </p>

            <div className="space-y-4">

                <label className="block border border-dashed border-[#ddd4ca] bg-[#faf8f5] p-6 text-center cursor-pointer hover:border-black transition">

                    <span className="text-sm text-gray-500">
                        Upload main image
                    </span>

                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleMainImageUpload}
                    />

                </label>

                {form.mainImage && (
                    <div className="overflow-hidden border border-[#eee6dd]">

                        <img
                            src={form.mainImage}
                            alt="Main preview"
                            className="h-72 w-full object-cover"
                        />

                    </div>
                )}

                <label className="block border border-dashed border-[#ddd4ca] bg-white p-6 text-center cursor-pointer hover:border-black transition">

                    <span className="text-sm text-gray-500">
                        Upload gallery images
                    </span>

                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleGalleryUpload}
                    />

                </label>

                {form.galleryImages.length > 0 && (

                    <div className="grid grid-cols-3 gap-3">

                        {form.galleryImages.map(
                            (image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Gallery ${index + 1}`}
                                    className="h-28 w-full object-cover border border-[#eee6dd]"
                                />
                            )
                        )}

                    </div>
                )}

            </div>

        </section>
    )
}