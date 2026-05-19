import type { PropertyForm } from "../pages/ListProperty"

type Props = {
    form: PropertyForm
    updateField: (
        key: keyof PropertyForm,
        value: string
    ) => void
}

export default function PropertyDetailsSection({
    form,
    updateField
}: Props) {
    return (
        <section className="space-y-6">

            <p className="text-[11px] tracking-[0.3em] uppercase text-gray-400">
                Property Details
            </p>

            <input
                className="input"
                placeholder="Property title"
                value={form.title}
                onChange={(e) =>
                    updateField("title", e.target.value)
                }
                required
            />

            <div className="grid md:grid-cols-2 gap-4">

                <input
                    className="input"
                    placeholder="City"
                    value={form.location}
                    onChange={(e) =>
                        updateField("location", e.target.value)
                    }
                    required
                />

                <input
                    className="input"
                    placeholder="District"
                    value={form.district}
                    onChange={(e) =>
                        updateField("district", e.target.value)
                    }
                    required
                />

                <select
                    className="input"
                    value={form.type}
                    onChange={(e) =>
                        updateField("type", e.target.value)
                    }
                >
                    <option value="villa">Villa</option>
                    <option value="penthouse">Penthouse</option>
                    <option value="chalet">Chalet</option>
                    <option value="loft">Loft</option>
                    <option value="residence">Residence</option>
                </select>

                <select
                    className="input"
                    value={form.status}
                    onChange={(e) =>
                        updateField("status", e.target.value)
                    }
                >
                    <option value="For Sale">For Sale</option>
                    <option value="New Listing">New Listing</option>
                    <option value="Exclusive">Exclusive</option>
                </select>

            </div>
        </section>
    )
}