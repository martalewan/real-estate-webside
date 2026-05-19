import type { PropertyForm } from "../pages/ListProperty"

type Props = {
    form: PropertyForm
    updateField: (
        key: keyof PropertyForm,
        value: string
    ) => void
}

export default function DescriptionSection({
    form,
    updateField
}: Props) {
    return (
        <section className="space-y-6">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gray-400">
                Description
            </p>

            <textarea
                className="input min-h-44 resize-none"
                placeholder="Describe the property"
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                required
            />
        </section>
    )
}