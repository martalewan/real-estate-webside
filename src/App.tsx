import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Property from "./pages/Property"
import Properties from "./pages/Properties"
import MainLayout from "./layouts/MainLayout"

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/property/:id" element={<Property />} />
      </Route>
    </Routes>
  )
}