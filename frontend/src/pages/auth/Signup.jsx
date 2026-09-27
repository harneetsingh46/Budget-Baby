import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Lottie from "lottie-react";
import lottii from "../../lottie/signup.json";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../../ApiClient/interceptor";

const Signup = () => {
    const navigate = useNavigate();
    const LottieComponent = Lottie.default || Lottie;

    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        username: "",
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        if (error) setError("");
    };

    const signupAxios = async (data) => {
        try {
            const response = await apiClient.post(
                "auth/signup",
                data
            );

            console.log(response.data);

            setFormData({
                fname: "",
                lname: "",
                username: "",
                email: "",
                password: "",
            });

            navigate("/signin");
        } catch (err) {
            console.log(err.message);

            setError(
                err?.response?.data?.message ||
                "Failed to create account. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        await signupAxios(formData);
    };

    return (
        <div className="min-h-[calc(100vh-70px)] bg-[#FDFBF7] px-6 py-8 font-['Inter','Segoe_UI',sans-serif]">

            <div className="flex min-h-[calc(100vh-134px)] items-center justify-center">

                {/* Main Card */}
                <div
                    className="
                        flex w-full max-w-[950px]
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
                        LEFT ANIMATION
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
                                animationData={lottii}
                                loop={true}
                            />
                        </div>
                    </div>


                    {/* =========================
                        FORM SECTION
                    ========================= */}

                    <div
                        className="
                            flex flex-1
                            flex-col
                            justify-center
                            px-10
                            py-10

                            max-md:px-6
                            max-md:py-8
                        "
                    >

                        {/* Header */}

                        <div>
                            <h2 className="m-0 text-[1.75rem] font-bold text-[#7A634E]">
                                Create an Account
                            </h2>

                            <p className="mb-6 mt-2 text-[0.95rem] text-[#8C7662]">
                                Join Budget Baby to start managing your finances
                            </p>
                        </div>


                        {/* =========================
                            ERROR MESSAGE
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
                            className="flex flex-col gap-[1.1rem]"
                        >

                            {/* First + Last Name */}

                            <div className="flex gap-4 max-md:flex-col max-md:gap-[1.1rem]">

                                {/* First Name */}

                                <div className="flex flex-1 flex-col gap-1.5">

                                    <label
                                        htmlFor="fname"
                                        className="text-sm font-semibold text-[#7A634E]"
                                    >
                                        First Name
                                    </label>

                                    <input
                                        type="text"
                                        id="fname"
                                        name="fname"
                                        placeholder="John"
                                        onChange={handleChange}
                                        value={formData.fname}
                                        required
                                        className="
                                            w-full
                                            box-border
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


                                {/* Last Name */}

                                <div className="flex flex-1 flex-col gap-1.5">

                                    <label
                                        htmlFor="lname"
                                        className="text-sm font-semibold text-[#7A634E]"
                                    >
                                        Last Name
                                    </label>

                                    <input
                                        type="text"
                                        id="lname"
                                        name="lname"
                                        placeholder="Doe"
                                        onChange={handleChange}
                                        value={formData.lname}
                                        required
                                        className="
                                            w-full
                                            box-border
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

                            </div>


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
                                    placeholder="johndoe123"
                                    onChange={handleChange}
                                    value={formData.username}
                                    required
                                    className="
                                        w-full
                                        box-border
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
                                    Email
                                </label>

                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="name@example.com"
                                    onChange={handleChange}
                                    value={formData.email}
                                    required
                                    className="
                                        w-full
                                        box-border
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

                                <div className="relative flex items-center">

                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        id="password"
                                        name="password"
                                        placeholder="••••••••"
                                        onChange={handleChange}
                                        value={formData.password}
                                        required
                                        className="
                                            w-full
                                            box-border
                                            rounded-md
                                            border border-[#EBE4D8]
                                            bg-[#FAFAFA]
                                            px-4 py-3
                                            pr-12
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

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        aria-label="Toggle password visibility"
                                        className="
                                            absolute
                                            right-3
                                            flex
                                            items-center
                                            justify-center
                                            border-none
                                            bg-transparent
                                            p-0
                                            text-[#8C7662]
                                            transition-colors
                                            hover:text-[#7A634E]
                                        "
                                    >
                                        {showPassword ? (
                                            <EyeOff size={18} />
                                        ) : (
                                            <Eye size={18} />
                                        )}
                                    </button>

                                </div>

                            </div>


                            {/* =========================
                                SUBMIT BUTTON
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
                                {loading
                                    ? "Creating Account..."
                                    : "Sign Up"}
                            </button>

                        </form>


                        {/* =========================
                            SIGN IN
                        ========================= */}

                        <p className="mt-6 text-center text-[0.9rem] text-[#8C7662]">

                            Already have an account?{" "}

                            <Link
                                to="/signin"
                                className="
                                    font-semibold
                                    text-[#A37F59]
                                    no-underline
                                    hover:underline
                                "
                            >
                                Sign In
                            </Link>

                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Signup;