import React from "react";
import { Link } from "react-router-dom";
import {
  Wallet,
  PieChart,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const Hero = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#5F4B3A]">

      {/* Hero Section */}
      <section className="px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">

          {/* Left Content */}
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#EBE4D8] bg-white px-4 py-2 text-sm font-medium text-[#8C7662] shadow-sm">
              <Wallet size={16} />
              Simple. Smart. Personal.
            </div>

            <h1 className="text-4xl font-bold leading-tight text-[#7A634E] sm:text-5xl lg:text-6xl">
              Take control of your
              <span className="text-[#A37F59]"> money.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-[#8C7662]">
              Budget Baby helps you organize your budgets, track your spending,
              and build better financial habits — all in one simple place.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 rounded-lg bg-[#A37F59] px-6 py-3 font-semibold text-white transition hover:bg-[#7A634E] transition hover:-translate-y-0.5"
              >
                Get Started
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/signin"
                className="rounded-lg border border-[#EBE4D8] bg-white px-6 py-3 font-semibold text-[#7A634E] transition hover:bg-[#FAF6F0] transition hover:-translate-y-0.5"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Visual */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">

              <div className="rounded-3xl border border-[#EBE4D8] bg-white p-8 shadow-xl">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#8C7662]">
                      Financial Planning
                    </p>
                    <h2 className="mt-1 text-2xl font-bold text-[#7A634E]">
                      Your Money,
                      <br />
                      Your Plan.
                    </h2>
                  </div>

                  <div className="rounded-xl bg-[#FAF6F0] p-3 text-[#A37F59]">
                    <PieChart size={28} />
                  </div>
                </div>

                <div className="space-y-4">

                  <div className="rounded-xl bg-[#FAF6F0] p-4 transition hover:-translate-y-0.5 ">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-white p-2 text-[#A37F59]">
                        <Wallet size={20} />
                      </div>

                      <div>
                        <p className="font-semibold text-[#7A634E]">
                          Create Budgets
                        </p>
                        <p className="text-sm text-[#8C7662]">
                          Plan your monthly spending
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl bg-[#FAF6F0] p-4 transition hover:-translate-y-0.5 ">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-white p-2 text-[#A37F59]">
                        <TrendingUp size={20} />
                      </div>

                      <div>
                        <p className="font-semibold text-[#7A634E]">
                          Track Spending
                        </p>
                        <p className="text-sm text-[#8C7662]">
                          Understand where your money goes
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl bg-[#FAF6F0] p-4 transition hover:-translate-y-0.5 ">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-white p-2 text-[#A37F59]">
                        <ShieldCheck size={20} />
                      </div>

                      <div>
                        <p className="font-semibold text-[#7A634E]">
                          Stay Organized
                        </p>
                        <p className="text-sm text-[#8C7662]">
                          Keep your finances in one place
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Features */}
      <section className="border-y border-[#EBE4D8] bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-[#7A634E]">
              Everything you need to manage your budget
            </h2>

            <p className="mt-4 text-[#8C7662]">
              Budget Baby keeps financial planning simple so you can focus on
              making better decisions with your money.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">

            <div className="rounded-2xl border border-[#EBE4D8] bg-[#FDFBF7] p-6 transition hover:-translate-y-0.5 shadow">
              <div className="mb-4 inline-flex rounded-xl bg-[#FAF6F0] p-3 text-[#A37F59]">
                <Wallet size={24} />
              </div>

              <h3 className="text-xl font-bold text-[#7A634E]">
                Budget Planning
              </h3>

              <p className="mt-3 leading-7 text-[#8C7662]">
                Create monthly budgets and organize them by category to make
                your spending easier to manage.
              </p>
            </div>

            <div className="rounded-2xl border border-[#EBE4D8] bg-[#FDFBF7] p-6 transition hover:-translate-y-0.5 shadow">
              <div className="mb-4 inline-flex rounded-xl bg-[#FAF6F0] p-3 text-[#A37F59]">
                <PieChart size={24} />
              </div>

              <h3 className="text-xl font-bold text-[#7A634E]">
                Expense Tracking
              </h3>

              <p className="mt-3 leading-7 text-[#8C7662]">
                Record purchases and keep track of your expenses against your
                planned budgets.
              </p>
            </div>

            <div className="rounded-2xl border border-[#EBE4D8] bg-[#FDFBF7] p-6 transition hover:-translate-y-0.5 shadow">
              <div className="mb-4 inline-flex rounded-xl bg-[#FAF6F0] p-3 text-[#A37F59]">
                <TrendingUp size={24} />
              </div>

              <h3 className="text-xl font-bold text-[#7A634E]">
                Better Financial Habits
              </h3>

              <p className="mt-3 leading-7 text-[#8C7662]">
                Get a clearer picture of your spending habits and work toward
                your financial goals.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl rounded-3xl bg-[#7A634E] px-6 py-14 text-center shadow-lg sm:px-12">

          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to start managing your money?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[#FDFBF7]">
            Create your account and start building a better budgeting habit
            today.
          </p>

          <Link
            to="/signup"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-[#7A634E] transition hover:bg-[#FDFBF7] transition hover:-translate-y-0.5"
          >
            Create Your Account
            <ArrowRight size={18} />
          </Link>

        </div>
      </section>
    </div>
  );
};

export default Hero;