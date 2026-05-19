import { useState } from "react"
import {
    Link,
    useLocation,
    useNavigate,
} from "react-router-dom"

import {
    AnimatePresence,
    motion,
    type Transition,
    type Variants,
} from "framer-motion"

import useAuth from "../hooks/useAuth"
import { setAuthFrom } from "../helpers/authRedirect"
import useFavorites from "../hooks/useFavorites"

const links = [
    { title: "Home", href: "/" },
    { title: "About", href: "#about" },
    { title: "Contact", href: "#contact" },
    { title: "Properties", href: "/properties" },
    { title: "List Property", href: "/add-property" },

]

const ease: [number, number, number, number] = [
    0.76,
    0,
    0.24,
    1,
]

const transition: Transition = {
    duration: 1,
    ease,
}

const menuHeight = {
    initial: { height: 0 },

    enter: {
        height: "auto",
        transition,
    },

    exit: {
        height: 0,
        transition,
    },
}

const blur = {
    open: {
        filter: "blur(4px)",
        opacity: 0.45,
        transition: { duration: 0.3 } as const,
    },

    closed: {
        filter: "blur(0px)",
        opacity: 1,
        transition: { duration: 0.3 } as const,
    },
}

const translate: Variants = {
    initial: {
        y: "100%",
        opacity: 0,
    },

    enter: (i: number) => ({
        y: 0,
        opacity: 1,

        transition: {
            duration: 1,
            ease,
            delay: i * 0.04,
        },
    }),

    exit: (i: number) => ({
        y: "100%",
        opacity: 0,

        transition: {
            duration: 0.7,
            ease,
            delay: i * 0.02,
        },
    }),
}

export default function Header() {
    const { user, signOut } = useAuth()

    const location = useLocation()
    const navigate = useNavigate()

    const [isActive, setIsActive] = useState(false)

    const [selectedLink, setSelectedLink] = useState({
        isActive: false,
        index: 0,
    })

    const { favorites } = useFavorites()

    const handleSectionNavigation = (sectionId: string) => {
        setIsActive(false)

        const scrollToSection = () => {
            const element = document.getElementById(sectionId)

            if (element) {
                element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                })
            }
        }

        if (location.pathname !== "/") {
            navigate("/")

            setTimeout(scrollToSection, 300)
        } else {
            setTimeout(scrollToSection, 300)
        }
    }

    return (
        <header className="fixed z-50 w-full bg-[#f8f5f0] px-4 py-4 md:px-8">
            <div className="flex w-full justify-between text-xs uppercase tracking-[0.18em] text-black md:text-sm">

                <Link
                    to="/"
                    className="absolute left-4 font-serif text-lg tracking-normal md:left-8"
                >
                    MEstates
                </Link>

                <button
                    onClick={() =>
                        setIsActive(!isActive)
                    }
                    className="group ml-auto flex items-center gap-3 uppercase"
                >
                    <span className="relative h-[10px] w-6">
                        <span
                            className={`absolute left-0 h-px w-full bg-black transition-all duration-700 ${isActive
                                ? "top-1/2 rotate-45"
                                : "top-1"
                                }`}
                        />

                        <span
                            className={`absolute left-0 h-px w-full bg-black transition-all duration-700 ${isActive
                                ? "top-1/2 -rotate-45"
                                : "top-2"
                                }`}
                        />
                    </span>

                    <span className="relative inline-block h-5 overflow-hidden">
                        <span className="invisible block">
                            Close
                        </span>

                        <motion.span
                            animate={{
                                y: isActive
                                    ? "-120%"
                                    : "0%",
                            }}
                            transition={transition}
                            className="absolute left-0 top-0 block"
                        >
                            Menu
                        </motion.span>

                        <motion.span
                            animate={{
                                y: isActive
                                    ? "0%"
                                    : "120%",
                            }}
                            transition={transition}
                            className="absolute left-0 top-0 block"
                        >
                            Close
                        </motion.span>
                    </span>
                </button>
            </div>

            <AnimatePresence mode="wait">
                {isActive && (
                    <motion.nav
                        variants={menuHeight}
                        initial="initial"
                        animate="enter"
                        exit="exit"
                        className="overflow-hidden"
                    >
                        <div className="flex flex-col justify-between gap-14 bg-white p-4 pb-16 pt-12 md:pt-20 lg:flex-row lg:gap-20">

                            <div className="flex max-w-6xl flex-wrap gap-x-6 gap-y-3">

                                {links.map(
                                    (link, index) => (
                                        <motion.div
                                            key={link.title}
                                            variants={blur}
                                            animate={
                                                selectedLink.isActive &&
                                                    selectedLink.index !==
                                                    index
                                                    ? "open"
                                                    : "closed"
                                            }
                                            onMouseEnter={() =>
                                                setSelectedLink(
                                                    {
                                                        isActive: true,
                                                        index,
                                                    }
                                                )
                                            }
                                            onMouseLeave={() =>
                                                setSelectedLink(
                                                    {
                                                        isActive: false,
                                                        index,
                                                    }
                                                )
                                            }
                                            onTouchStart={() =>
                                                setSelectedLink({
                                                    isActive: true,
                                                    index,
                                                })
                                            }
                                            onTouchEnd={() =>
                                                setSelectedLink({
                                                    isActive: false,
                                                    index,
                                                })
                                            }
                                        >
                                            {link.href.startsWith(
                                                "#"
                                            ) ? (
                                                <button
                                                    onClick={() =>
                                                        handleSectionNavigation(
                                                            link.href.replace(
                                                                "#",
                                                                ""
                                                            )
                                                        )
                                                    }
                                                    className="flex font-serif font-light uppercase leading-none tracking-tight text-black sm:text-6xl md:text-7xl lg:text-[5vw]"
                                                >
                                                    {link.title
                                                        .split("")
                                                        .map(
                                                            (
                                                                char,
                                                                i
                                                            ) => (
                                                                <motion.span
                                                                    key={
                                                                        i
                                                                    }
                                                                    custom={
                                                                        i
                                                                    }
                                                                    variants={
                                                                        translate
                                                                    }
                                                                    initial="initial"
                                                                    animate="enter"
                                                                    exit="exit"
                                                                    className="inline-block"
                                                                >
                                                                    {char ===
                                                                        " "
                                                                        ? "\u00A0"
                                                                        : char}
                                                                </motion.span>
                                                            )
                                                        )}
                                                </button>
                                            ) : (
                                                <Link
                                                    to={
                                                        link.href
                                                    }
                                                    onClick={() =>
                                                        setIsActive(
                                                            false
                                                        )
                                                    }
                                                    className="flex font-serif font-light uppercase leading-none tracking-tight text-black sm:text-6xl md:text-7xl lg:text-[5vw]"
                                                >
                                                    {link.title
                                                        .split("")
                                                        .map(
                                                            (
                                                                char,
                                                                i
                                                            ) => (
                                                                <motion.span
                                                                    key={
                                                                        i
                                                                    }
                                                                    custom={
                                                                        i
                                                                    }
                                                                    variants={
                                                                        translate
                                                                    }
                                                                    initial="initial"
                                                                    animate="enter"
                                                                    exit="exit"
                                                                    className="inline-block"
                                                                >
                                                                    {char ===
                                                                        " "
                                                                        ? "\u00A0"
                                                                        : char}
                                                                </motion.span>
                                                            )
                                                        )}
                                                </Link>
                                            )}
                                        </motion.div>
                                    )
                                )}
                            </div>

                            <div className="flex flex-col justify-end gap-8 text-xs uppercase tracking-[0.18em] text-black/60">

                                <div className="overflow-hidden">
                                    <motion.p
                                        custom={0}
                                        variants={
                                            translate
                                        }
                                        initial="initial"
                                        animate="enter"
                                        exit="exit"
                                    >
                                        Global Property Marketplace
                                    </motion.p>
                                </div>

                                <div className="flex flex-col gap-4">

                                    <Link
                                        to="/favorites"
                                        onClick={() => {
                                            setAuthFrom(location.pathname)
                                            setIsActive(false)
                                        }}
                                        className="flex items-center gap-2 transition hover:text-black"
                                    >
                                        Favorites

                                        {favorites.length >
                                            0 && (
                                                <span className="text-[11px] text-gray-400">
                                                    (
                                                    {
                                                        favorites.length
                                                    }
                                                    )
                                                </span>
                                            )}
                                    </Link>

                                    {!user ? (
                                        <Link
                                            to="/login"
                                            onClick={() => {
                                                setAuthFrom(location.pathname)
                                                setIsActive(false)
                                            }}
                                            className="flex items-center transition hover:text-black"
                                        >
                                            Login
                                        </Link>
                                    ) : (
                                        <>
                                            <span className="text-gray-500">
                                                {user.name ||
                                                    user.email}
                                            </span>

                                            <button
                                                onClick={() => {
                                                    signOut()
                                                    setIsActive(false)
                                                }}
                                                className="text-left transition hover:text-black"
                                            >
                                                Logout
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header >
    )
}