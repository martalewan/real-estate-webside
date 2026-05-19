import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Property from "./pages/Property"
import Properties from "./pages/Properties"
import MainLayout from "./layouts/MainLayout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Favorites from "./pages/Favorites"
import ListProperty from "./pages/ListProperty"

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<MainLayout />}>

        <Route path="/" element={<Home />} />
        <Route path="/add-property" element={<ListProperty />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:id" element={<Property />} />
        <Route path="/properties/:id/edit" element={<ListProperty />} />
      </Route>
    </Routes>
  )
}