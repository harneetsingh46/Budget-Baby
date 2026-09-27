import React, { useEffect, useState } from 'react';
import apiClient from '../ApiClient/interceptor';
import { useNavigate } from 'react-router-dom';

const CreateBudget = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [categoryLoader, setCategoryLoader] = useState(true);
    const [createCategory, setCreateCategory] = useState(false);

    const [categoryData, setCategoryData] = useState({
        category: ""
    });

    const [budgetData, setbudgetData] = useState({
        category: "",
        amount: "",
        month: "",
        year: ""
    });

    const handleBudgetChange = (e) => {
        setbudgetData({
            ...budgetData,
            [e.target.name]: e.target.value
        });
    };

    const submitBudget = async (e) => {
        e.preventDefault();

        try {
            const response = await apiClient.post(
                "/budget/create",
                budgetData
            );

            console.log(response.data.data);

            setbudgetData({
                category: "",
                amount: "",
                month: "",
                year: ""
            });
            navigate("/budget")
        } catch (error) {
            console.log(error.message);
        }
    };

    const getCategories = async () => {
        try {
            const response = await apiClient.get("/category/get");
            setCategories(response.data.data);
        } catch (err) {
            console.log(err.message);
        } finally {
            setCategoryLoader(false);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    const handleChange = (e) => {
        setCategoryData({
            ...categoryData,
            [e.target.name]: e.target.value
        });
    };

    const handleCategorySubmit = async (e) => {
        e.preventDefault();

        try {
            await apiClient.post(
                "/category/create",
                categoryData
            );

            getCategories();

            setCategoryData({
                category: ""
            });

            setCreateCategory(false);
        } catch (error) {
            console.log(error.message);
        }
    };

    const month = [
        { value: 1, name: "January" },
        { value: 2, name: "February" },
        { value: 3, name: "March" },
        { value: 4, name: "April" },
        { value: 5, name: "May" },
        { value: 6, name: "June" },
        { value: 7, name: "July" },
        { value: 8, name: "August" },
        { value: 9, name: "September" },
        { value: 10, name: "October" },
        { value: 11, name: "November" },
        { value: 12, name: "December" },
    ];

    return (
        <main className="min-h-[calc(100vh-70px)] bg-[#FDFBF7] flex items-center justify-center px-6 py-8 font-['Inter','Segoe_UI',sans-serif]">

            <div className="w-full max-w-[550px] rounded-xl border border-[#EBE4D8] bg-white p-6 shadow-[0_10px_30px_rgba(122,99,78,0.08)] sm:p-10">

                {/* Header */}
                <div className="mb-8 text-center">
                    <h2 className="m-0 text-2xl font-bold text-[#7A634E]">
                        Create Budget
                    </h2>

                    <p className="mt-2 text-sm text-[#8C7662]">
                        Set up your budget goals for the month
                    </p>
                </div>

                <form
                    onSubmit={submitBudget}
                    className="flex flex-col gap-5"
                >

                    {/* Category */}
                    <div className="flex flex-col gap-2">

                        <label className="text-sm font-semibold text-[#7A634E]">
                            Select Category
                        </label>

                        {categoryLoader ? (
                            <select
                                disabled
                                className="w-full rounded-md border border-[#EBE4D8] bg-[#F5F5F5] px-4 py-3 text-sm text-[#A0A0A0] outline-none cursor-not-allowed"
                            >
                                <option>
                                    Loading....
                                </option>
                            </select>
                        ) : categories.length === 0 ? (
                            <select
                                disabled
                                className="w-full rounded-md border border-[#EBE4D8] bg-[#F5F5F5] px-4 py-3 text-sm text-[#A0A0A0] outline-none cursor-not-allowed"
                            >
                                <option>
                                    No category found!
                                </option>
                            </select>
                        ) : (
                            <select
                                name="category"
                                value={budgetData.category}
                                onChange={handleBudgetChange}
                                className="w-full rounded-md border border-[#EBE4D8] bg-[#FAFAFA] px-4 py-3 text-sm text-[#7A634E] outline-none transition-all focus:border-[#A37F59] focus:bg-white focus:ring-4 focus:ring-[#A37F59]/15"
                            >
                                <option value="">
                                    Select a category
                                </option>

                                {categories.map((cat) => (
                                    <option
                                        key={cat._id}
                                        value={cat._id}
                                    >
                                        {cat.category}
                                    </option>
                                ))}
                            </select>
                        )}

                    </div>

                    {/* Create Category */}
                    <div className="-mt-2 mb-2">

                        {createCategory ? (

                            <div className="flex flex-col gap-2 rounded-md border border-dashed border-[#EBE4D8] bg-[#FDFBF7] p-3 sm:flex-row sm:items-center">

                                <input
                                    type="text"
                                    name="category"
                                    placeholder="Enter new category"
                                    value={categoryData.category}
                                    onChange={handleChange}
                                    className="w-full flex-1 rounded-md border border-[#EBE4D8] bg-[#FAFAFA] px-3 py-2 text-sm text-[#7A634E] outline-none focus:border-[#A37F59] focus:bg-white focus:ring-4 focus:ring-[#A37F59]/15"
                                />

                                <button
                                    type="button"
                                    onClick={handleCategorySubmit}
                                    className="rounded-md border border-[#A37F59] bg-[#A37F59] px-3 py-2 text-sm font-semibold text-white transition hover:border-[#7A634E] hover:bg-[#433111] hover:text-[#f8f6f3]"
                                >
                                    Save
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setCreateCategory(false)}
                                    className="rounded-md border border-[#EBE4D8] bg-transparent px-3 py-2 text-sm font-semibold text-[#7A634E] transition hover:bg-[#F5F5F5]"
                                >
                                    Cancel
                                </button>

                            </div>

                        ) : (

                            <button
                                type="button"
                                onClick={() => setCreateCategory(true)}
                                className="border-none bg-transparent p-0 text-sm font-semibold text-[#A37F59] transition hover:text-[#7A634E] hover:underline"
                            >
                                + Create New Category
                            </button>

                        )}

                    </div>

                    {/* Amount */}
                    <div className="flex flex-col gap-2">

                        <label className="text-sm font-semibold text-[#7A634E]">
                            Amount
                        </label>

                        <input
                            type="number"
                            name="amount"
                            placeholder="Enter Amount (e.g. 500)"
                            value={budgetData.amount}
                            onChange={handleBudgetChange}
                            className="w-full rounded-md border border-[#EBE4D8] bg-[#FAFAFA] px-4 py-3 text-sm text-[#7A634E] outline-none transition-all focus:border-[#A37F59] focus:bg-white focus:ring-4 focus:ring-[#A37F59]/15"
                        />

                    </div>

                    {/* Month & Year */}
                    <div className="flex flex-col gap-5 sm:flex-row">

                        {/* Month */}
                        <div className="flex flex-1 flex-col gap-2">

                            <label className="text-sm font-semibold text-[#7A634E]">
                                Month
                            </label>

                            <select
                                name="month"
                                value={budgetData.month}
                                onChange={handleBudgetChange}
                                className="w-full rounded-md border border-[#EBE4D8] bg-[#FAFAFA] px-4 py-3 text-sm text-[#7A634E] outline-none transition-all focus:border-[#A37F59] focus:bg-white focus:ring-4 focus:ring-[#A37F59]/15"
                            >
                                <option value="">
                                    Select Month
                                </option>

                                {month.map((m) => (
                                    <option
                                        key={m.value}
                                        value={m.value}
                                    >
                                        {m.name}
                                    </option>
                                ))}
                            </select>

                        </div>

                        {/* Year */}
                        <div className="flex flex-1 flex-col gap-2">

                            <label className="text-sm font-semibold text-[#7A634E]">
                                Year
                            </label>

                            <input
                                type="number"
                                name="year"
                                placeholder="e.g. 2026"
                                min="2026"
                                max="2100"
                                value={budgetData.year}
                                onChange={handleBudgetChange}
                                className="w-full rounded-md border border-[#EBE4D8] bg-[#FAFAFA] px-4 py-3 text-sm text-[#7A634E] outline-none transition-all focus:border-[#A37F59] focus:bg-white focus:ring-4 focus:ring-[#A37F59]/15"
                            />

                        </div>

                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="mt-2 w-full rounded-md border border-[#A37F59] bg-[#A37F59] px-4 py-3 text-base font-semibold text-[#FDFBF7] transition-all hover:border-[#7A634E] hover:bg-[#433111] hover:text-[#f8f6f3] active:scale-[0.99]"
                    >
                        Save Budget
                    </button>

                </form>

            </div>

        </main>
    );
};

export default CreateBudget;