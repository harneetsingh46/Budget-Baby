import React, { useEffect, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";
import apiClient from "../ApiClient/interceptor";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  const [selectedMonth, setSelectedMonth] = useState(
    new Date().getMonth() + 1
  );

  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear()
  );

  // const [loading, setLoading] = useState(true);

  const [summary, setSummary] = useState({
    budget: 0,
    expense: 0,
    savings: 0,
    savingsRate: 0,
  });

  const [recentTransactions, setRecentTransactions] = useState([]);
  const [categoryBudgets, setCategoryBudgets] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);

      try {
        const response = await apiClient.get("/dashboard");

        console.log("Dashboard response:", response.data);

        const data = response.data;

        const totalBudget = data.totalBudget || 0;
        const totalSpent = data.totalSpent || 0;
        const remaining = data.remaining || 0;

        const savingsRate =
          totalBudget > 0
            ? Math.round((remaining / totalBudget) * 100)
            : 0;

        setSummary({
          budget: totalBudget,
          expense: totalSpent,
          savings: remaining,
          savingsRate,
        });

        /*
         * Your API returns:
         *
         * budget: [
         *   {
         *     _id,
         *     category,
         *     amount,
         *     month,
         *     year
         *   }
         * ]
         */
        setCategoryBudgets(data.budget || []);

        /*
         * Your API returns recent purchases here.
         */
        setRecentTransactions(data.recentPurchase || []);
        setLoading(false)
      } catch (err) {
        console.log(
          "Error fetching dashboard data:",
          err?.response?.data?.message || err.message
        );

        setSummary({
          budget: 0,
          expense: 0,
          savings: 0,
          savingsRate: 0,
        });

        setRecentTransactions([]);
        setCategoryBudgets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [selectedMonth, selectedYear]);

  const months = [
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

  const currentYear = new Date().getFullYear();

  const years = [
    currentYear - 2,
    currentYear - 1,
    currentYear,
    currentYear + 1,
  ];

  return (
    <div className="min-h-screen bg-[#ffff] px-5 py-8 font-sans sm:px-8">
      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <h1 className="text-2xl font-bold tracking-tight  text-[#926b42]">
              Financial Dashboard
            </h1>

            <p className="mt-1 text-sm text-[#926b42] ">
              Overview of your budget and expenses
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">

            <select
              value={selectedMonth}
              onChange={(e) =>
                setSelectedMonth(Number(e.target.value))
              }
              className="rounded-lg border border-[#EBE4D8] bg-white px-4 py-2.5 text-sm font-semibold text-[#7A634E] shadow-sm outline-none focus:border-[#A37F59] focus:ring-2 focus:ring-[#A37F59]/20"
            >
              {months.map((month) => (
                <option
                  key={month.value}
                  value={month.value}
                >
                  {month.name}
                </option>
              ))}
            </select>

            <select
              value={selectedYear}
              onChange={(e) =>
                setSelectedYear(Number(e.target.value))
              }
              className="rounded-lg border border-[#EBE4D8] bg-white px-4 py-2.5 text-sm font-semibold text-[#7A634E] shadow-sm outline-none focus:border-[#A37F59] focus:ring-2 focus:ring-[#A37F59]/20"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <Link
              to="/createBudget"
              className="flex items-center gap-2 rounded-lg bg-[#644c32] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#433111] hover:text-[#f8f6f3]"
            >
              <Plus size={18} />
              New Budget
            </Link>
          </div>
        </div>

        {/* ================= SUMMARY CARDS ================= */}
        <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">

          {/* Total Budget */}
          <div className="rounded-xl border border-[#EBE4D8] bg-white p-6 shadow-[0_4px_15px_rgba(122,99,78,0.08)] transition hover:-translate-y-0.5">

            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-semibold text-[#8C7662]">
                Total Budget
              </span>

              <div className="rounded-lg bg-[#E8F5E9] p-2 text-[#2E7D32]">
                <TrendingUp size={20} />
              </div>
            </div>

            <h2 className="mb-3 text-3xl font-bold text-[#7A634E]">
              ₹{summary.budget.toLocaleString("en-IN")}
            </h2>

            <span className="inline-flex items-center gap-1 rounded-full bg-[#E8F5E9] px-2.5 py-1 text-xs font-semibold text-[#2E7D32]">
              <ArrowUpRight size={14} />
              Total allocated
            </span>
          </div>

          {/* Total Expense */}
          <div className="rounded-xl border border-[#EBE4D8] bg-white p-6 shadow-[0_4px_15px_rgba(122,99,78,0.08)] transition hover:-translate-y-0.5">

            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-semibold text-[#8C7662]">
                Total Expense
              </span>

              <div className="rounded-lg bg-[#FFEBEE] p-2 text-[#C62828]">
                <TrendingDown size={20} />
              </div>
            </div>

            <h2 className="mb-3 text-3xl font-bold text-[#7A634E]">
              ₹{summary.expense.toLocaleString("en-IN")}
            </h2>

            <span className="inline-flex items-center gap-1 rounded-full bg-[#FFEBEE] px-2.5 py-1 text-xs font-semibold text-[#C62828]">
              <ArrowDownRight size={14} />
              Total spent
            </span>
          </div>

          {/* Remaining */}
          <div className="rounded-xl border border-[#EBE4D8] bg-white p-6 shadow-[0_4px_15px_rgba(122,99,78,0.08)] transition hover:-translate-y-0.5">

            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-semibold text-[#8C7662]">
                Remaining
              </span>

              <div className="rounded-lg bg-[#E3F2FD] p-2 text-[#1565C0]">
                <PiggyBank size={20} />
              </div>
            </div>

            <h2
              className={`mb-3 text-3xl font-bold ${summary.savings < 0
                ? "text-[#C62828]"
                : "text-[#7A634E]"
                }`}
            >
              ₹{summary.savings.toLocaleString("en-IN")}
            </h2>

            <span className="inline-flex items-center rounded-full border border-[#EBE4D8] bg-[#FAF6F0] px-2.5 py-1 text-xs font-semibold text-[#7A634E]">
              {summary.savingsRate}% remaining
            </span>
          </div>
        </div>

        {/* ================= MAIN CONTENT ================= */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">

          {/* ================= RECENT PURCHASES ================= */}
          <div className="rounded-xl border border-[#EBE4D8] bg-white p-6 shadow-[0_4px_15px_rgba(122,99,78,0.08)] lg:col-span-3">

            <div className="mb-5 flex items-center justify-between border-b border-[#EBE4D8] pb-3">

              <h3 className="text-lg font-semibold text-[#7A634E]">
                Recent Purchases
              </h3>

              <Link
                to="/budget"
                className="text-sm font-semibold text-[#A37F59] hover:underline"
              >
                View Budgets
              </Link>
            </div>

            <div className="flex flex-col gap-4">

              {loading ? (
                <p className="py-5 text-center text-sm text-[#8C7662]">
                  Loading purchases...
                </p>
              ) : recentTransactions.length === 0 ? (
                <p className="py-5 text-center text-sm text-[#8C7662]">
                  No purchases found.
                </p>
              ) : (
                recentTransactions.map((purchase) => (

                  <div
                    key={purchase._id}
                    className="flex items-center justify-between border-b border-[#F3EEE7] py-3 last:border-0"
                  >

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFEBEE] text-[#C62828]">
                        <Wallet size={17} />
                      </div>

                      <div>

                        <p className="text-sm font-semibold text-[#7A634E]">
                          {purchase.title}
                        </p>

                        <span className="text-xs text-[#8C7662]">
                          {purchase.category?.category || "No category"}
                        </span>

                        <p className="text-xs text-[#A37F59]">
                          {purchase.date
                            ? new Date(
                              purchase.date
                            ).toLocaleDateString("en-IN")
                            : ""}
                        </p>

                      </div>
                    </div>

                    <div className="text-sm font-bold text-[#C62828]">
                      -₹
                      {Number(
                        purchase.amount || 0
                      ).toLocaleString("en-IN")}
                    </div>

                  </div>
                ))
              )}

            </div>
          </div>

          {/* ================= BUDGET ALLOCATION ================= */}
          <div className="rounded-xl border border-[#EBE4D8] bg-white p-6 shadow-[0_4px_15px_rgba(122,99,78,0.08)] lg:col-span-2">

            <div className="mb-5 flex items-center justify-between border-b border-[#EBE4D8] pb-3">

              <h3 className="text-lg font-semibold text-[#7A634E]">
                Your Budgets
              </h3>

              <span className="text-xs text-[#8C7662]">
                {categoryBudgets.length} budgets
              </span>

            </div>

            <div className="flex flex-col gap-4">

              {loading ? (
                <p className="py-5 text-center text-sm text-[#8C7662]">
                  Loading budgets...
                </p>
              ) : categoryBudgets.length === 0 ? (

                <p className="py-5 text-center text-sm text-[#8C7662]">
                  No budgets found.
                  <br />
                  <br />

                  <Link
                    to="/createBudget"
                    className="font-semibold text-[#A37F59] hover:underline"
                  >
                    Create a budget
                  </Link>
                </p>

              ) : (

                categoryBudgets.map((budget) => {

                  /*
                   * Your budget object:
                   *
                   * {
                   *   _id,
                   *   category,
                   *   amount,
                   *   month,
                   *   year
                   * }
                   */

                  return (
                    <Link
                      key={budget._id}
                      to={`/budget/${budget._id}`}
                      className="rounded-lg border border-[#EBE4D8] bg-[#FAF6F0] p-4 transition hover:border-[#A37F59] hover:bg-white"
                    >

                      <div className="flex items-center justify-between gap-3">

                        <div>

                          <p className="font-semibold text-[#7A634E]">
                            {budget.category?.category ||
                              "Unknown Category"}
                          </p>

                          <p className="mt-1 text-xs text-[#8C7662]">
                            {months.find(
                              (m) =>
                                m.value === Number(budget.month)
                            )?.name || budget.month}{" "}
                            {budget.year}
                          </p>

                        </div>

                        <p className="font-bold text-[#A37F59]">
                          ₹
                          {Number(
                            budget.amount || 0
                          ).toLocaleString("en-IN")}
                        </p>

                      </div>

                    </Link>
                  );
                })

              )}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;

