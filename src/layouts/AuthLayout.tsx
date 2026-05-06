export default function AuthLayout({ title, subtitle, children }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8f5f0]">

            <div className="w-full max-w-md bg-white border border-[#eee6dd] rounded-xl shadow-lg p-8 space-y-6">

                <div className="text-center space-y-2">
                    <h2>{title}</h2>
                    <p className="text-sm text-gray-500">{subtitle}</p>
                </div>

                {children}

            </div>

        </div>
    )
}