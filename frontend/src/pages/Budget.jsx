import React, { useEffect, useState } from "react";
import apiClient from "../ApiClient/interceptor.js";
import { useNavigate } from "react-router-dom";

const Budget = () => {
    const [budget, setBudget] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getBudget = async () => {
            try {
                const response = await apiClient.get("/budget/get");

                setBudget(response.data.budgetData || []);
            } catch (error) {
                console.error("API ERROR:", error);
            }
        };

        getBudget();
    }, []);

    const handleClick = (budgetId) => {
        navigate(`/budget/${budgetId}`);
    };

    return (
        <div className="min-h-[calc(100vh-70px)] bg-[#FDFBF7] font-['Inter','Segoe_UI',sans-serif]">

            {/* =========================
                PAGE HEADING
            ========================= */}

            <div className="mx-auto max-w-[1200px] px-10 pt-10 max-md:px-6 max-md:pt-6">

                <h1 className="m-0 text-[1.8rem] font-bold text-[#7A634E] max-md:text-[1.5rem]">
                    Budget(s)
                </h1>

            </div>


            {/* =========================
                BUDGET GRID
            ========================= */}

            <div
                className="
                    mx-auto
                    grid
                    max-w-[1200px]
                    grid-cols-[repeat(auto-fit,minmax(280px,1fr))]
                    gap-6
                    px-10
                    pb-10
                    pt-6

                    max-md:grid-cols-1
                    max-md:gap-4
                    max-md:px-5
                "
            >

                {budget.length > 0 ? (
                    budget.map((b, index) => (

                        <main
                            key={b._id || index}
                            onClick={() => handleClick(b._id)}
                            className="
                                cursor-pointer
                                rounded-xl
                                border border-[#EBE4D8]
                                bg-white
                                p-6
                                shadow-[0_4px_15px_rgba(122,99,78,0.08)]
                                transition-all duration-200

                                hover:-translate-y-1
                                hover:border-[#A37F59]
                                hover:shadow-[0_8px_22px_rgba(122,99,78,0.14)]

                                max-md:p-5
                            "
                        >

                            {/* =========================
                                CATEGORY
                            ========================= */}

                            <div
                                className="
                                    border-b border-[#EBE4D8]
                                    pb-3
                                    text-[0.85rem]
                                    font-semibold
                                    uppercase
                                    tracking-wide
                                    text-[#8C7662]
                                "
                            >
                                Category
                            </div>

                            <div
                                className="
                                    pt-3
                                    text-[1.2rem]
                                    font-bold
                                    text-[#5F4B3A]
                                    max-md:text-[1.1rem]
                                "
                            >
                                {b?.category?.category || "N/A"}
                            </div>


                            {/* =========================
                                AMOUNT
                            ========================= */}

                            <div
                                className="
                                    my-3
                                    rounded-lg
                                    border border-[#EBE4D8]
                                    bg-[#FAF6F0]
                                    px-4
                                    py-3
                                "
                            >

                                <p className="m-0 text-xs font-medium text-[#8C7662]">
                                    Budget Amount
                                </p>

                                <p
                                    className="
                                        mt-1
                                        mb-0
                                        text-[1.35rem]
                                        font-bold
                                        text-[#5F4B3A]

                                        max-md:text-[1.2rem]
                                    "
                                >
                                    ₹{b?.amount ?? 0}
                                </p>

                            </div>


                            {/* =========================
                                MONTH
                            ========================= */}

                            <div className="flex items-center justify-between border-b border-[#FAF6F0] py-2">

                                <span className="text-sm font-medium text-[#8C7662]">
                                    Month
                                </span>

                                <span className="text-sm font-semibold text-[#7A634E]">
                                    {b?.month || "N/A"}
                                </span>

                            </div>


                            {/* =========================
                                YEAR
                            ========================= */}

                            <div className="flex items-center justify-between py-2">

                                <span className="text-sm font-medium text-[#8C7662]">
                                    Year
                                </span>

                                <span className="text-sm font-semibold text-[#7A634E]">
                                    {b?.year || "N/A"}
                                </span>

                            </div>


                            {/* =========================
                                VIEW DETAILS
                            ========================= */}

                            <div
                                className="
                                    mt-3
                                    border-t border-[#EBE4D8]
                                    pt-3
                                    text-right
                                    text-xs
                                    font-semibold
                                    text-[#A37F59]
                                "
                            >
                                View Details →
                            </div>

                        </main>

                    ))
                ) : (

                    /* =========================
                        EMPTY STATE
                    ========================= */

                    <div
                        className="
                            col-span-full
                            rounded-xl
                            border border-[#EBE4D8]
                            bg-white
                            px-6
                            py-12
                            text-center
                            text-base
                            text-[#8C7662]
                            shadow-[0_4px_15px_rgba(122,99,78,0.08)]
                        "
                    >
                        No budgets found.
                    </div>

                )}

            </div>

        </div>
    );
};

export default Budget;