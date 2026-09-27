import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    Trash2,
    Plus,
    Wallet,
    TrendingDown,
    PiggyBank,
} from "lucide-react";
import apiClient from "../ApiClient/interceptor";

const BudgetDetails = () => {
    const { budgetId } = useParams();
    const navigate = useNavigate();

    const [budget, setBudget] = useState(null);
    const [purchases, setPurchases] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [purchaseData, setPurchaseData] = useState({
        title: "",
        amount: "",
        note: "",
        date: "",
    });

    const [purchaseLoading, setPurchaseLoading] = useState(false);

    // =====================================================
    // GET BUDGET + PURCHASES
    // =====================================================
    useEffect(() => {
        if (!budgetId) {
            setError("Budget ID is missing.");
            setLoading(false);
            return;
        }

        const fetchBudgetDetails = async () => {
            try {
                setLoading(true);
                setError("");

                console.log("Budget ID:", budgetId);

                // Get budget
                const budgetResponse = await apiClient.get(
                    `/budget/get/${budgetId}`
                );

                console.log("Budget response:", budgetResponse.data);

                const budgetData =
                    budgetResponse.data?.data ||
                    budgetResponse.data?.budget ||
                    budgetResponse.data?.budgetData ||
                    budgetResponse.data;

                setBudget(budgetData);

                // Get purchases
                const purchaseResponse = await apiClient.get(
                    `/purchase/${budgetId}`
                );

                console.log("Purchase response:", purchaseResponse.data);

                setPurchases(
                    purchaseResponse.data?.purchases || []
                );
            } catch (err) {
                console.error("Error:", err);

                setError(
                    err?.response?.data?.message ||
                    "Failed to load budget."
                );
                } finally {
                    setLoading(false);
                }
        };

        fetchBudgetDetails();
    }, [budgetId]);

    // =====================================================
    // INPUT CHANGE
    // =====================================================
    const handleChange = (e) => {
        setPurchaseData({
            ...purchaseData,
            [e.target.name]: e.target.value,
        });
    };

    // =====================================================
    // CREATE PURCHASE
    // =====================================================
    const handlePurchaseSubmit = async (e) => {
        e.preventDefault();

        if (!budgetId) {
            setError("Budget ID is missing.");
            return;
        }

        try {
            setPurchaseLoading(true);
            setError("");

            await apiClient.post("/purchase/", {
                title: purchaseData.title,
                amount: Number(purchaseData.amount),
                note: purchaseData.note,
                date: purchaseData.date,
                budgetId: budgetId,
            });

            // Reset form
            setPurchaseData({
                title: "",
                amount: "",
                note: "",
                date: "",
            });

            // Reload purchases
            const response = await apiClient.get(
                `/purchase/${budgetId}`
            );

            setPurchases(response.data?.purchases || []);
        } catch (err) {
            console.error("Create purchase error:", err);

            setError(
                err?.response?.data?.message ||
                "Failed to create purchase."
            );
        } finally {
            setPurchaseLoading(false);
        }
    };

    // =====================================================
    // DELETE PURCHASE
    // =====================================================
    const handleDeletePurchase = async (purchaseId) => {
        try {
            await apiClient.delete(
                `/purchase/${purchaseId}`
            );

            setPurchases((previous) =>
                previous.filter(
                    (purchase) => purchase._id !== purchaseId
                )
            );
        } catch (err) {
            console.error("Delete error:", err);

            setError(
                err?.response?.data?.message ||
                "Failed to delete purchase."
            );
        }
    };

    // =====================================================
    // LOADING
    // =====================================================
    if (loading) {
        return (
            <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-4">
                <div className="bg-white border border-[#EBE4D8] rounded-2xl shadow-sm p-8 text-center">
                    <div className="w-10 h-10 border-4 border-[#EBE4D8] border-t-[#A37F59] rounded-full animate-spin mx-auto mb-4"></div>

                    <p className="text-[#7A634E] font-medium">
                        Loading budget...
                    </p>
                </div>
            </div>
        );
    }

    // =====================================================
    // ERROR / NO BUDGET
    // =====================================================
    if (!budget) {
        return (
            <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-4">
                <div className="bg-white border border-[#EBE4D8] rounded-2xl shadow-sm p-8 max-w-md w-full text-center">

                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">
                        <Wallet className="text-red-500" size={26} />
                    </div>

                    <h2 className="text-xl font-bold text-[#7A634E]">
                        Budget not found
                    </h2>

                    <p className="mt-2 text-sm text-[#8C7662]">
                        {error || "Unable to find this budget."}
                    </p>

                    <button
                        onClick={() => navigate("/budget")}
                        className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#A37F59] text-white font-semibold hover:bg-[#7A634E] transition"
                    >
                        <ArrowLeft size={17} />
                        Back to Budgets
                    </button>
                </div>
            </div>
        );
    }

    // =====================================================
    // CALCULATIONS
    // =====================================================
    const budgetAmount = Number(budget?.amount || 0);

    const totalSpent = purchases.reduce(
        (total, purchase) =>
            total + Number(purchase.amount || 0),
        0
    );

    const remaining = budgetAmount - totalSpent;

    const percentage =
        budgetAmount > 0
            ? Math.round((totalSpent / budgetAmount) * 100)
            : 0;

    const progressWidth = Math.min(percentage, 100);

    return (
        <div className="min-h-screen bg-[#FDFBF7] px-4 py-6 sm:px-6 lg:px-8">

            <div className="max-w-6xl mx-auto">

                {/* =====================================================
                    BACK BUTTON
                ===================================================== */}
                <button
                    onClick={() => navigate("/budget")}
                    className="mb-6 inline-flex items-center gap-2 text-[#7A634E] hover:text-[#A37F59] font-medium transition"
                >
                    <ArrowLeft size={18} />
                    Back to Budgets
                </button>

                {/* =====================================================
                    ERROR
                ===================================================== */}
                {error && (
                    <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                {/* =====================================================
                    BUDGET HEADER
                ===================================================== */}
                <div className="bg-white border border-[#EBE4D8] rounded-2xl shadow-sm p-6 sm:p-8">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                        <div>
                            <div className="flex items-center gap-3">

                                <div className="w-12 h-12 rounded-xl bg-[#FAF6F0] flex items-center justify-center">
                                    <PiggyBank
                                        size={25}
                                        className="text-[#A37F59]"
                                    />
                                </div>

                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-bold text-[#7A634E]">
                                        {budget?.category?.category ||
                                            budget?.category ||
                                            "Budget"}
                                    </h1>

                                    <p className="text-sm text-[#8C7662] mt-1">
                                        {budget?.month} / {budget?.year}
                                    </p>
                                </div>

                            </div>
                        </div>

                        <div className="text-left sm:text-right">
                            <p className="text-sm text-[#8C7662]">
                                Budget Limit
                            </p>

                            <p className="text-2xl sm:text-3xl font-bold text-[#5F4B3A]">
                                ₹{budgetAmount.toLocaleString("en-IN")}
                            </p>
                        </div>

                    </div>

                    {/* =====================================================
                        SUMMARY
                    ===================================================== */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">

                        {/* Budget */}
                        <div className="rounded-xl border border-[#EBE4D8] bg-[#FDFBF7] p-4">
                            <p className="text-sm text-[#8C7662]">
                                Total Budget
                            </p>

                            <p className="mt-1 text-xl font-bold text-[#7A634E]">
                                ₹{budgetAmount.toLocaleString("en-IN")}
                            </p>
                        </div>

                        {/* Spent */}
                        <div className="rounded-xl border border-[#EBE4D8] bg-[#FDFBF7] p-4">
                            <p className="text-sm text-[#8C7662]">
                                Total Spent
                            </p>

                            <p className="mt-1 text-xl font-bold text-red-600">
                                ₹{totalSpent.toLocaleString("en-IN")}
                            </p>
                        </div>

                        {/* Remaining */}
                        <div className="rounded-xl border border-[#EBE4D8] bg-[#FDFBF7] p-4">
                            <p className="text-sm text-[#8C7662]">
                                Remaining
                            </p>

                            <p
                                className={`mt-1 text-xl font-bold ${
                                    remaining < 0
                                        ? "text-red-600"
                                        : "text-green-700"
                                }`}
                            >
                                ₹{remaining.toLocaleString("en-IN")}
                            </p>
                        </div>

                    </div>

                    {/* =====================================================
                        PROGRESS BAR
                    ===================================================== */}
                    <div className="mt-8">

                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-semibold text-[#7A634E]">
                                Budget Usage
                            </span>

                            <span
                                className={`text-sm font-bold ${
                                    percentage >= 100
                                        ? "text-red-600"
                                        : "text-[#A37F59]"
                                }`}
                            >
                                {percentage}%
                            </span>
                        </div>

                        <div className="w-full h-3 rounded-full bg-[#FAF6F0] border border-[#EBE4D8] overflow-hidden">

                            <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                    percentage >= 100
                                        ? "bg-red-500"
                                        : "bg-[#A37F59]"
                                }`}
                                style={{
                                    width: `${progressWidth}%`,
                                }}
                            />

                        </div>

                    </div>

                </div>

                {/* =====================================================
                    ADD PURCHASE
                ===================================================== */}
                <div className="mt-6 bg-white border border-[#EBE4D8] rounded-2xl shadow-sm p-6 sm:p-8">

                    <div className="flex items-center gap-3 mb-6">

                        <div className="w-10 h-10 rounded-lg bg-[#FAF6F0] flex items-center justify-center">
                            <Plus
                                size={20}
                                className="text-[#A37F59]"
                            />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-[#7A634E]">
                                Add Purchase
                            </h2>

                            <p className="text-sm text-[#8C7662]">
                                Add an expense to this budget
                            </p>
                        </div>

                    </div>

                    <form
                        onSubmit={handlePurchaseSubmit}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                    >

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-semibold text-[#7A634E] mb-2">
                                Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={purchaseData.title}
                                onChange={handleChange}
                                placeholder="e.g. Grocery shopping"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-[#EBE4D8] bg-[#FAFAFA] text-[#7A634E] outline-none focus:bg-white focus:border-[#A37F59] focus:ring-2 focus:ring-[#A37F59]/15 transition"
                            />
                        </div>

                        {/* Amount */}
                        <div>
                            <label className="block text-sm font-semibold text-[#7A634E] mb-2">
                                Amount
                            </label>

                            <input
                                type="number"
                                name="amount"
                                value={purchaseData.amount}
                                onChange={handleChange}
                                placeholder="Enter amount"
                                min="0"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-[#EBE4D8] bg-[#FAFAFA] text-[#7A634E] outline-none focus:bg-white focus:border-[#A37F59] focus:ring-2 focus:ring-[#A37F59]/15 transition"
                            />
                        </div>

                        {/* Date */}
                        <div>
                            <label className="block text-sm font-semibold text-[#7A634E] mb-2">
                                Date
                            </label>

                            <input
                                type="date"
                                name="date"
                                value={purchaseData.date}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-[#EBE4D8] bg-[#FAFAFA] text-[#7A634E] outline-none focus:bg-white focus:border-[#A37F59] focus:ring-2 focus:ring-[#A37F59]/15 transition"
                            />
                        </div>

                        {/* Note */}
                        <div>
                            <label className="block text-sm font-semibold text-[#7A634E] mb-2">
                                Note
                            </label>

                            <input
                                type="text"
                                name="note"
                                value={purchaseData.note}
                                onChange={handleChange}
                                placeholder="e.g. Weekly groceries"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-[#EBE4D8] bg-[#FAFAFA] text-[#7A634E] outline-none focus:bg-white focus:border-[#A37F59] focus:ring-2 focus:ring-[#A37F59]/15 transition"
                            />
                        </div>

                        {/* Submit */}
                        <div className="sm:col-span-2">

                            <button
                                type="submit"
                                disabled={purchaseLoading}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#A37F59] text-white font-semibold hover:bg-[#7A634E] disabled:opacity-60 disabled:cursor-not-allowed transition"
                            >
                                <Plus size={18} />

                                {purchaseLoading
                                    ? "Adding..."
                                    : "Add Purchase"}
                            </button>

                        </div>

                    </form>
                </div>

                {/* =====================================================
                    PURCHASE LIST
                ===================================================== */}
                <div className="mt-6 bg-white border border-[#EBE4D8] rounded-2xl shadow-sm p-6 sm:p-8">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">

                        <div>
                            <h2 className="text-xl font-bold text-[#7A634E]">
                                Purchases
                            </h2>

                            <p className="text-sm text-[#8C7662]">
                                Expenses recorded for this budget
                            </p>
                        </div>

                        <span className="text-sm font-semibold text-[#8C7662]">
                            {purchases.length}{" "}
                            {purchases.length === 1
                                ? "purchase"
                                : "purchases"}
                        </span>

                    </div>

                    {/* Empty state */}
                    {purchases.length === 0 ? (
                        <div className="py-12 text-center border border-dashed border-[#EBE4D8] rounded-xl">

                            <Wallet
                                size={35}
                                className="mx-auto text-[#A37F59] mb-3"
                            />

                            <h3 className="font-semibold text-[#7A634E]">
                                No purchases yet
                            </h3>

                            <p className="text-sm text-[#8C7662] mt-1">
                                Add your first purchase above.
                            </p>

                        </div>
                    ) : (

                        <div className="space-y-3">

                            {purchases.map((purchase) => (

                                <div
                                    key={purchase._id}
                                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-xl border border-[#EBE4D8] bg-[#FDFBF7] hover:border-[#A37F59] transition"
                                >

                                    {/* Purchase information */}
                                    <div className="flex items-start gap-3">

                                        <div className="w-10 h-10 shrink-0 rounded-lg bg-red-50 flex items-center justify-center">
                                            <TrendingDown
                                                size={18}
                                                className="text-red-500"
                                            />
                                        </div>

                                        <div>

                                            <h3 className="font-semibold text-[#7A634E]">
                                                {purchase.title}
                                            </h3>

                                            <p className="text-sm text-[#8C7662] mt-1">
                                                {purchase.note}
                                            </p>

                                            <p className="text-xs text-[#A37F59] mt-1">
                                                {purchase.date
                                                    ? new Date(
                                                          purchase.date
                                                      ).toLocaleDateString(
                                                          "en-IN"
                                                      )
                                                    : "No date"}
                                            </p>

                                        </div>

                                    </div>

                                    {/* Amount + delete */}
                                    <div className="flex items-center justify-between sm:justify-end gap-4">

                                        <span className="font-bold text-red-600">
                                            -₹
                                            {Number(
                                                purchase.amount || 0
                                            ).toLocaleString("en-IN")}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDeletePurchase(
                                                    purchase._id
                                                )
                                            }
                                            className="p-2 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700 transition"
                                            title="Delete purchase"
                                        >
                                            <Trash2 size={18} />
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>
        </div>
    );
};

export default BudgetDetails;