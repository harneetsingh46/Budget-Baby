import React, { useState } from "react";
import Lottie from "lottie-react";
import signinAnimation from "../../lottie/signin.json";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext.jsx";

const Signin = () => {
    const navigate = useNavigate();

    const LottieComponent = Lottie.default || Lottie;

    const [loginData, setLoginData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { login } = useAuth();

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });

        if (error) {
            setError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            await login(loginData);

            setLoginData({
                username: "",
                email: "",
                password: "",
            });

            navigate("/dashboard");
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                err.message ||
                "Failed to sign in. Check your credentials."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-70px)] bg-[#FDFBF7] px-6 py-8 font-['Inter','Segoe_UI',sans-serif]">

            <div className="flex min-h-[calc(100vh-134px)] items-center justify-center">

                {/* =========================
                    MAIN CARD
                ========================= */}

                <div
                    className="
                        flex w-full max-w-[900px]
                        overflow-hidden
                        rounded-xl
                        border border-[#EBE4D8]
                        bg-white
                        shadow-[0_10px_30px_rgba(122,99,78,0.08)]

                        max-md:max-w-[450px]
                        max-md:flex-col
                    "
                >

                    {/* =========================
                        LEFT VISUAL SECTION
                    ========================= */}

                    <div
                        className="
                            flex flex-1
                            items-center justify-center
                            border-r border-[#EBE4D8]
                            bg-[#FAF6F0]
                            p-5

                            max-md:border-r-0
                            max-md:border-b
                            max-md:p-6
                        "
                    >

                        <div className="w-full max-w-[360px] max-md:max-w-[200px]">

                            <LottieComponent
                                animationData={signinAnimation}
                                loop={true}
                            />

                        </div>

                    </div>


                    {/* =========================
                        RIGHT FORM SECTION
                    ========================= */}

                    <div
                        className="
                            flex flex-1
                            flex-col
                            justify-center
                            px-10
                            py-12

                            max-md:px-6
                            max-md:py-8
                        "
                    >

                        {/* Header */}

                        <div>

                            <h2 className="m-0 text-[1.75rem] font-bold text-[#7A634E]">
                                Welcome Back
                            </h2>

                            <p className="mb-6 mt-2 text-[0.95rem] text-[#8C7662]">
                                Sign in to manage your budget
                            </p>

                        </div>


                        {/* =========================
                            ERROR
                        ========================= */}

                        {error && (
                            <div
                                className="
                                    mb-5
                                    rounded-md
                                    border border-[#D8C9B8]
                                    bg-[#FAF6F0]
                                    p-3
                                    text-sm
                                    text-[#7A634E]
                                "
                            >
                                {error}
                            </div>
                        )}


                        {/* =========================
                            FORM
                        ========================= */}

                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-5"
                        >

                            {/* Username */}

                            <div className="flex flex-col gap-1.5">

                                <label
                                    htmlFor="username"
                                    className="text-sm font-semibold text-[#7A634E]"
                                >
                                    Username
                                </label>

                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="Enter your username"
                                    onChange={handleChange}
                                    value={loginData.username}
                                    required
                                    className="
                                        rounded-md
                                        border border-[#EBE4D8]
                                        bg-[#FAFAFA]
                                        px-4 py-3
                                        text-[0.95rem]
                                        text-[#7A634E]
                                        outline-none
                                        transition-all duration-200

                                        placeholder:text-[#C2B6A9]

                                        focus:border-[#A37F59]
                                        focus:bg-white
                                        focus:ring-4
                                        focus:ring-[#A37F59]/15
                                    "
                                />

                            </div>


                            {/* Email */}

                            <div className="flex flex-col gap-1.5">

                                <label
                                    htmlFor="email"
                                    className="text-sm font-semibold text-[#7A634E]"
                                >
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="name@example.com"
                                    onChange={handleChange}
                                    value={loginData.email}
                                    required
                                    className="
                                        rounded-md
                                        border border-[#EBE4D8]
                                        bg-[#FAFAFA]
                                        px-4 py-3
                                        text-[0.95rem]
                                        text-[#7A634E]
                                        outline-none
                                        transition-all duration-200

                                        placeholder:text-[#C2B6A9]

                                        focus:border-[#A37F59]
                                        focus:bg-white
                                        focus:ring-4
                                        focus:ring-[#A37F59]/15
                                    "
                                />

                            </div>


                            {/* Password */}

                            <div className="flex flex-col gap-1.5">

                                <label
                                    htmlFor="password"
                                    className="text-sm font-semibold text-[#7A634E]"
                                >
                                    Password
                                </label>

                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="••••••••"
                                    onChange={handleChange}
                                    value={loginData.password}
                                    required
                                    className="
                                        rounded-md
                                        border border-[#EBE4D8]
                                        bg-[#FAFAFA]
                                        px-4 py-3
                                        text-[0.95rem]
                                        text-[#7A634E]
                                        outline-none
                                        transition-all duration-200

                                        placeholder:text-[#C2B6A9]

                                        focus:border-[#A37F59]
                                        focus:bg-white
                                        focus:ring-4
                                        focus:ring-[#A37F59]/15
                                    "
                                />

                            </div>


                            {/* =========================
                                SUBMIT
                            ========================= */}

                            <button
                                type="submit"
                                disabled={loading}
                                className="
                                    mt-2
                                    rounded-md
                                    border border-[#A37F59]
                                    bg-[#A37F59]
                                    px-4 py-3.5
                                    text-base
                                    font-semibold
                                    text-[#FDFBF7]
                                    transition-all duration-200

                                    hover:border-[#7A634E]
                                    hover:bg-[#7A634E]

                                    disabled:cursor-not-allowed
                                    disabled:opacity-65
                                "
                            >
                                {loading ? "Signing In..." : "Sign In"}
                            </button>

                        </form>


                        {/* =========================
                            SIGNUP
                        ========================= */}

                        <p className="mt-7 text-center text-[0.9rem] text-[#8C7662]">

                            Don't have an account?{" "}

                            <Link
                                to="/signup"
                                className="
                                    font-semibold
                                    text-[#A37F59]
                                    no-underline
                                    hover:underline
                                "
                            >
                                Sign Up
                            </Link>

                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Signin;