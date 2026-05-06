import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Property from "./pages/Property"
import Properties from "./pages/Properties"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/properties" element={<Properties />} />
      <Route path="/property/:id" element={<Property />} />
    </Routes>
  )
}