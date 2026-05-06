import Hero from "../components/Hero"
import PropertyGrid from "../components/PropertyGrid"
import Stats from "../components/Stats"
import WhyUs from "../components/WhyUs"

export default function Home() {
    return (
        <div className="min-h-screen">

            <Hero />
            <PropertyGrid />
            <WhyUs />
            <Stats />

        </div>
    )
}