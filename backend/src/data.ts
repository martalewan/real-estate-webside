export type PropertyType =
    | "villa"
    | "penthouse"
    | "chalet"
    | "loft"
    | "residence"

export type PropertyStatus =
    | "For Sale"
    | "New Listing"
    | "Exclusive"

export type EnergyRating = "A" | "B" | "C"

export type Property = {
    id: number
    ownerId?: number,
    type: PropertyType
    status: PropertyStatus
    location: string
    district: string
    title: string
    price: number
    bedrooms: number
    bathrooms: number
    size: number
    outdoorSize: number
    yearBuilt: number
    parkingSpaces: number
    energyRating: EnergyRating
    furnished: boolean
    amenities: string[]
    contactPerson: {
        name: string
        phone: string
        email: string
    }
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
    const imagesByType: Record<PropertyType, string[]> = {
        villa: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&auto=format&fit=crop&q=80"
        ],
        penthouse: [
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=1200&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&auto=format&fit=crop&q=80"
        ],
        chalet: [
            "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1200&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=1200&auto=format&fit=crop&q=80"
        ],
        loft: [
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&auto=format&fit=crop&q=80"
        ],
        residence: [
            "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&auto=format&fit=crop&q=80"
        ]
    }

    const images = imagesByType[type]

    return [
        images[seed % images.length],
        images[(seed + 1) % images.length],
        images[(seed + 2) % images.length]
    ]
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

const districts: Record<string, string[]> = {
    Paris: ["Saint-Germain", "Le Marais", "Passy"],
    London: ["Chelsea", "Mayfair", "Notting Hill"],
    Dubai: ["Palm Jumeirah", "Downtown Dubai", "Dubai Marina"],
    Tokyo: ["Minato", "Shibuya", "Aoyama"],
    Sydney: ["Bondi", "Double Bay", "Mosman"],
    "Los Angeles": ["Beverly Hills", "Malibu", "Hollywood Hills"],
    Ibiza: ["Santa Eulalia", "Talamanca", "Es Cubells"],
    Milan: ["Brera", "Porta Nuova", "CityLife"],
    Berlin: ["Mitte", "Charlottenburg", "Prenzlauer Berg"],
    Miami: ["Brickell", "South Beach", "Coconut Grove"]
}

const amenitiesByType: Record<PropertyType, string[]> = {
    villa: ["Private pool", "Garden", "Terrace", "Garage", "Security"],
    penthouse: ["Rooftop terrace", "Elevator", "Concierge", "City view", "Smart home"],
    chalet: ["Fireplace", "Mountain view", "Spa", "Ski room", "Private sauna"],
    loft: ["Open plan", "High ceilings", "Industrial details", "Natural light", "Smart home"],
    residence: ["Elevator", "Parking", "Fitness room", "Security", "Private balcony"]
}

const contactPeople = [
    {
        name: "Marta Lewandowska",
        phone: "+33 6 24 18 90 42",
        email: "marta@example.com"
    },
    {
        name: "Elena Moreau",
        phone: "+33 6 12 44 78 19",
        email: "elena@example.com"
    },
    {
        name: "Daniel Hart",
        phone: "+44 7700 900123",
        email: "daniel@example.com"
    }
]

function pickDistrict(city: string, index: number): string {
    const cityDistricts = districts[city] || ["Prime district"]

    return cityDistricts[index % cityDistricts.length]
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
        status:
            index % 3 === 0
                ? "Exclusive"
                : index % 3 === 1
                    ? "New Listing"
                    : "For Sale",
        location: city,
        district: pickDistrict(city, index),
        title: generateTitle(type, city, index),
        price: 3_000_000 + index * 550_000,
        bedrooms: 2 + (index % 5),
        bathrooms: 2 + (index % 4),
        size: 150 + index * 25,
        outdoorSize: 20 + index * 6,
        yearBuilt: 2012 + (index % 13),
        parkingSpaces: 1 + (index % 3),
        energyRating: ["A", "B", "C"][index % 3] as EnergyRating,
        furnished: index % 2 === 0,
        amenities: amenitiesByType[type],
        contactPerson: contactPeople[index % contactPeople.length],
        images: generateImages(seed, type),
        description: generateDescription(type, city, index)
    }
})