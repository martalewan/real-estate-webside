import Hero from "../components/Hero"
import FeaturedProperty from "../components/FeaturedProperty"
import PropertyGrid from "../components/PropertyGrid"
import Stats from "../components/Stats"

export default function Home() {
    return (
        <div className="min-h-screen">

            <Hero />
            <FeaturedProperty />

            <PropertyGrid />

            <Stats />

        </div>
    )
}