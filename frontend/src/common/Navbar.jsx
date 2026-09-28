import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext.jsx";

const Navbar = () => {
    const { isAuthenticated, user } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className="relative flex items-center justify-between border-b border-[#f1ecec] bg-[#ffffff] px-6 py-4 font-['Inter','Segoe_UI',sans-serif] md:px-10 shadow sticky top-0 z-50 shadow-md">

            {/* =========================
                LOGO
            ========================= */}

            <div>
                <Link
                    to="/"
                    onClick={closeMenu}
                    className="text-[1.5rem] font-bold tracking-[-0.5px] text-[#926b42] no-underline"
                >
                    Budget Baby
                </Link>
            </div>


            {/* =========================
                MOBILE HAMBURGER
            ========================= */}

            <button
                type="button"
                onClick={toggleMenu}
                aria-label="Toggle navigation"
                aria-expanded={isMenuOpen}
                className="z-20 flex flex-col gap-[5px] border-none bg-transparent p-0 md:hidden"
            >
                <span
                    className={`h-[2px] w-[25px] bg-[#7A634E] transition-all duration-300 ${
                        isMenuOpen
                            ? "translate-y-[7px] rotate-45"
                            : ""
                    }`}
                />

                <span
                    className={`h-[2px] w-[25px] bg-[#7A634E] transition-all duration-300 ${
                        isMenuOpen
                            ? "opacity-0"
                            : "opacity-100"
                    }`}
                />

                <span
                    className={`h-[2px] w-[25px] bg-[#7A634E] transition-all duration-300 ${
                        isMenuOpen
                            ? "-translate-y-[7px] -rotate-45"
                            : ""
                    }`}
                />
            </button>


            {/* =========================
                NAVIGATION MENU
            ========================= */}

            <div
                className={`
                    absolute left-0 top-full z-10 w-full
                    overflow-hidden bg-[#FDFBF7]
                    shadow-[0_4px_6px_rgba(0,0,0,0.05)]
                    transition-all duration-300 ease-in-out

                    md:static
                    md:flex md:max-h-none
                    md:flex-1 md:items-center
                    md:justify-between
                    md:overflow-visible
                    md:bg-transparent
                    md:pl-12
                    md:shadow-none

                    ${
                        isMenuOpen
                            ? "max-h-[500px] border-b border-[#EBE4D8] px-6 py-6"
                            : "max-h-0"
                    }

                    md:border-none
                    md:px-0
                    md:py-0
                `}
            >

                {/* =========================
                    MAIN LINKS
                ========================= */}

                <nav
                    className="
                        flex w-full flex-col items-start gap-5
                        md:w-auto md:flex-row md:items-center md:gap-8
                    "
                >

                    <Link
                        to="/dashboard"
                        onClick={closeMenu}
                        className="
                            text-[0.95rem] font-medium
                            text-[#926b42] no-underline
                            transition-colors duration-200
                            hover:text-[#b06412]
                        "
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/createBudget"
                        onClick={closeMenu}
                        className="
                            text-[0.95rem] font-medium
                            text-[#926b42] no-underline
                            transition-colors duration-200
                            hover:text-[#b06412]
                        "
                    >
                        Create Budget
                    </Link>

                    <Link
                        to="/budget"
                        onClick={closeMenu}
                        className="
                            text-[0.95rem] font-medium
                            text-[#926b42] no-underline
                            transition-colors duration-200
                            hover:text-[#b06412]
                        "
                    >
                        Budget
                    </Link>

                </nav>


                {/* =========================
                    AUTH SECTION
                ========================= */}

                <div
                    className="
                        mt-5 flex w-full flex-col
                        items-start gap-5
                        border-t border-[#EBE4D8]
                        pt-5

                        md:mt-0 md:w-auto
                        md:flex-row md:items-center
                        md:gap-8
                        md:border-t-0
                        md:pt-0
                    "
                >

                    {isAuthenticated ? (
                        <>
                            <span className="text-[0.9rem] text-[#5b4632]">
                                Hi, {user.email}
                            </span>

                            <Link
                                to="/sign-out"
                                onClick={closeMenu}
                                className="
                                    w-full rounded-md
                                    border border-[#A37F59]
                                    px-4 py-2
                                    text-center
                                    text-[0.9rem]
                                    font-medium
                                    text-[#926b42]
                                    no-underline
                                    transittext-[#926b42]on-200

                                    hover:bg-[#664829]
                                    hover:text-[#ffff]

                                    md:w-auto
                                "
                            >
                                Sign Out
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/signin"
                                onClick={closeMenu}
                                className="
                                    text-[0.95rem] font-medium
                                    text-[#926b42] no-underline
                                    transition-colors duration-200
                                    hover:text-[#b06412]
                                "
                            >
                                Signin
                            </Link>

                            <Link
                                to="/signup"
                                onClick={closeMenu}
                                className="
                                    text-[0.95rem] font-medium
                                    text-[#926b42] no-underline
                                    transition-colors duration-200
                                    hover:text-[#b06412]
                                "
                            >
                                Signup
                            </Link>
                        </>
                    )}

                </div>

            </div>

        </header>
    );
};

export default Navbar;