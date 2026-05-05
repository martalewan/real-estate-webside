export default function Nav() {
    return (
        <header className="container py-10 flex justify-between items-center">
            <div className="text-xs tracking-[0.3em] uppercase text-gray-500">
                Estates
            </div>

            <nav className="flex gap-8 text-sm text-gray-600">
                <a href="#">Properties</a>
                <a href="#">Contact</a>
            </nav>
        </header>
    )
}