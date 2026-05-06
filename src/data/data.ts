type PropertyType =
    | "villa"
    | "penthouse"
    | "chalet"
    | "loft"
    | "residence"

export type Property = {
    id: number
    type: PropertyType
    location: string
    title: string
    price: number
    bedrooms: number
    bathrooms: number
    size: number
    images: string[]
    description: string
}

function generateSeed(type: PropertyType, city: string, index: number): number {
    let hash = 0
    const str = `${type}-${city}-${index}`

    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i)
        hash |= 0
    }

    return Math.abs(hash)
}

function generateImages(seed: number, type: PropertyType): string[] {
    const base = "https://images.unsplash.com/"

    const typeStyle: Record<PropertyType, string> = {
        villa: "photo-1600585154340-be6161a56a0c",
        penthouse: "photo-1493809842364-78817add7ffb",
        chalet: "photo-1519710164239-da123dc03ef4",
        loft: "photo-1505691938895-1758d7feb511",
        residence: "photo-1600047509807-ba8f99d2cdde"
    }

    const imageIds = [
        typeStyle[type],
        "photo-1502005229762-cf1b2da7c5d6",
        "photo-1507089947368-19c1da9775ae",
        "photo-1512917774080-1506263e2d87"
    ]

    const pick = (index: number) =>
        `${base}${imageIds[(seed + index) % imageIds.length]}?w=1200&auto=format&fit=crop`

    return [pick(0), pick(1), pick(2)]
}

function generateTitle(
    type: PropertyType,
    city: string,
    index: number
): string {
    const names = [
        "Horizon",
        "Lumière",
        "Noir",
        "Bellevue",
        "Épure",
        "Alta",
        "Nero",
        "Silva",
        "Marble",
        "Velvet"
    ]

    const typeLabel: Record<PropertyType, string> = {
        villa: "Villa",
        penthouse: "Penthouse",
        chalet: "Chalet",
        loft: "Loft",
        residence: "Residence"
    }

    return `${typeLabel[type]} ${names[index % names.length]} — ${city}`
}

function generateDescription(
    type: PropertyType,
    city: string,
    index: number
): string {
    const tone: Record<PropertyType, string> = {
        villa: "A rare architectural villa defined by privacy, proportion, and natural light.",
        penthouse: "A sky-level penthouse offering sweeping city views and refined materiality.",
        chalet: "An alpine retreat crafted from timber, stone, and quiet sophistication.",
        loft: "An industrial loft reimagined with contemporary elegance and spatial openness.",
        residence: "A curated residence balancing design clarity with everyday comfort."
    }

    const details = [
        "Generous volumes create a seamless flow between interior and exterior spaces.",
        "Natural light becomes a defining architectural element throughout the day.",
        "Every surface has been selected to emphasize warmth and texture.",
        "The layout prioritizes both privacy and open social living.",
        "Minimalist architecture enhances a sense of calm and permanence."
    ]

    const closings = [
        `Located in ${city}, this property embodies understated luxury in a prime setting.`,
        `In ${city}, it offers a rare balance between tranquility and urban accessibility.`,
        `Set within ${city}, it represents a discreet yet sophisticated lifestyle.`,
        `Positioned in ${city}, it is designed for refined modern living.`,
        `In ${city}, the home blends architecture, comfort, and exclusivity.`
    ]

    return [
        tone[type],
        details[index % details.length],
        closings[index % closings.length]
    ].join("\n")
}

export const cities = [
    "Paris",
    "London",
    "Dubai",
    "Tokyo",
    "Sydney",
    "Los Angeles",
    "Ibiza",
    "Milan",
    "Berlin",
    "Miami"
] as const

export const types = [
    "villa",
    "penthouse",
    "chalet",
    "loft",
    "residence"
] as const satisfies readonly PropertyType[]

export const properties: Property[] = Array.from({ length: 30 }, (_, index) => {
    const city = cities[index % cities.length]
    const type = types[index % types.length]
    const seed = generateSeed(type, city, index)

    return {
        id: index + 1,
        type,
        location: city,
        title: generateTitle(type, city, index),
        price: 3_000_000 + index * 550_000,
        bedrooms: 2 + (index % 5),
        bathrooms: 2 + (index % 4),
        size: 150 + index * 25,
        images: generateImages(seed, type),
        description: generateDescription(type, city, index)
    }
})