type ConfirmModalProps = {
    open: boolean
    title: string
    description: string
    confirmText?: string
    cancelText?: string
    onConfirm: () => void
    onCancel: () => void
    danger?: boolean
}

export default function ConfirmModal({
    open,
    title,
    description,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
    danger = false
}: ConfirmModalProps) {

    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-6">

            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">

                <div className="space-y-3">

                    <p
                        className={`text-[11px] uppercase tracking-[0.3em] ${danger
                                ? "text-red-500"
                                : "text-gray-400"
                            }`}
                    >
                        Confirmation
                    </p>

                    <h2 className="font-serif text-3xl">
                        {title}
                    </h2>

                    <p className="text-gray-500 leading-relaxed">
                        {description}
                    </p>

                </div>

                <div className="mt-8 flex gap-4">

                    <button
                        onClick={onCancel}
                        className="flex-1 rounded-xl border border-[#eee6dd] px-6 py-4 text-sm transition hover:border-black"
                    >
                        {cancelText}
                    </button>

                    <button
                        onClick={onConfirm}
                        className={`flex-1 rounded-xl px-6 py-4 text-sm text-white transition ${danger
                                ? "bg-red-500 hover:bg-red-600"
                                : "bg-black hover:opacity-80"
                            }`}
                    >
                        {confirmText}
                    </button>

                </div>

            </div>

        </div>
    )
}