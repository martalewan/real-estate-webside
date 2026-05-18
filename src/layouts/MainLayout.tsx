import { Outlet } from "react-router-dom"
import Navigation from "../components/Navigation"

import Footer from "../components/Footer"
import ScrollToTop from "../components/ScrollToTop"

export default function MainLayout() {
    return (
        <>
            <ScrollToTop />
            <Navigation />

            <Outlet />
            <Footer />
        </>
    )
}