function generateSeed(type, city, i) {
    let hash = 0
    const str = `${type}-${city}-${i}`

    for (let j = 0; j < str.length; j++) {
        hash = (hash << 5) - hash + str.charCodeAt(j)
        hash |= 0
    }

    return Math.abs(hash)
}

function generateImages(seed, type) {
    const base = "https://images.unsplash.com/"

    const typeStyle = {
        villa: "photo-1600585154340-be6161a56a0c",
        penthouse: "photo-1493809842364-78817add7ffb",
        chalet: "photo-1519710164239-da123dc03ef4",
        loft: "photo-1505691938895-1758d7feb511",
        residence: "photo-1600047509807-ba8f99d2cdde"
    }

    const extras = [
        "photo-1502005229762-cf1b2da7c5d6",
        "photo-1507089947368-19c1da9775ae",
        "photo-1512917774080-1506263e2d87"
    ]

    const baseId = typeStyle[type] || typeStyle.residence

    const pick = (i) =>
        `${base}${[baseId, ...extras][(seed + i) % 4]}?w=1200&auto=format&fit=crop`

    return [pick(0), pick(1), pick(2)]
}

function generateTitle(type, city, index) {
    const names = [
        "Horizon", "Lumière", "Noir", "Bellevue", "Épure",
        "Alta", "Nero", "Silva", "Marble", "Velvet"
    ]

    const typeLabel = {
        villa: "Villa",
        penthouse: "Penthouse",
        chalet: "Chalet",
        loft: "Loft",
        residence: "Residence"
    }

    return `${typeLabel[type]} ${names[index % names.length]} — ${city}`
}

function generateDescription(type, city, i) {
    const tone = {
        villa: "A rare architectural villa defined by privacy, proportion, and natural light.",
        penthouse: "A sky-level penthouse offering sweeping city views and refined materiality.",
        chalet: "An alpine retreat crafted from timber, stone, and quiet sophistication.",
        loft: "An industrial loft reimagined with contemporary elegance and spatial openness.",
        residence: "A curated residence balancing design clarity with everyday comfort."
    }

    const detail = [
        "Generous volumes create a seamless flow between interior and exterior spaces.",
        "Natural light becomes a defining architectural element throughout the day.",
        "Every surface has been selected to emphasize warmth and texture.",
        "The layout prioritizes both privacy and open social living.",
        "Minimalist architecture enhances a sense of calm and permanence."
    ]

    const closing = [
        `Located in ${city}, this property embodies understated luxury in a prime setting.`,
        `In ${city}, it offers a rare balance between tranquility and urban accessibility.`,
        `Set within ${city}, it represents a discreet yet sophisticated lifestyle.`,
        `Positioned in ${city}, it is designed for refined modern living.`,
        `In ${city}, the home blends architecture, comfort, and exclusivity.`
    ]

    return `${tone[type] || tone.residence}
${detail[i % detail.length]}
${closing[i % closing.length]}`
}

const cities = [
    "Paris", "London", "Dubai", "Tokyo", "Sydney",
    "Los Angeles", "Ibiza", "Milan", "Berlin", "Miami"
]

const types = ["villa", "penthouse", "chalet", "loft", "residence"]

export const properties = Array.from({ length: 30 }).map((_, i) => {
    const city = cities[i % cities.length]
    const type = types[i % types.length]

    const seed = generateSeed(type, city, i)

    return {
        id: i + 1,

        type,
        location: city,

        title: generateTitle(type, city, i),

        price: 3000000 + i * 550000,
        bedrooms: 2 + (i % 5),
        bathrooms: 2 + (i % 4),
        size: 150 + i * 25,

        images: generateImages(seed, type),

        description: generateDescription(type, city, i)
    }
})