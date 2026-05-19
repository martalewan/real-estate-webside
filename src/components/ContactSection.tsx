import type { PropertyForm } from "../pages/ListProperty"

type Props = {
    form: PropertyForm
    updateField: (
        key: keyof PropertyForm,
        value: string
    ) => void
}

export default function ContactSection({
    form,
    updateField
}: Props) {
    return (
        <section className="space-y-6">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gray-400">
                Contact Person
            </p>

            <input
                className="input"
                placeholder="Full name"
                value={form.contactName}
                onChange={(e) => updateField("contactName", e.target.value)}
                required
            />

            <div className="grid md:grid-cols-2 gap-4">
                <input
                    className="input"
                    type="email"
                    placeholder="Email"
                    value={form.contactEmail}
                    onChange={(e) => updateField("contactEmail", e.target.value)}
                    required
                />

                <input
                    className="input"
                    placeholder="Phone"
                    value={form.contactPhone}
                    onChange={(e) => updateField("contactPhone", e.target.value)}
                    required
                />
            </div>
        </section>
    )
}