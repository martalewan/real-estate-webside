import Nav from "./components/Nav"
import Hero from "./components/Hero"
import FeaturedProperty from "./components/FeaturedProperty"
import PropertyGrid from "./components/PropertyGrid"
import Stats from "./components/Stats"
import Footer from "./components/Footer"

export default function App() {
  return (
    <div className="min-h-screen">

      <Nav />
      <Hero />
      <FeaturedProperty />
      <PropertyGrid />
      <Stats />
      <Footer />

    </div>
  )
}