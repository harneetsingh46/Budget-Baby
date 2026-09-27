import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./common/Layout";

import Hero from "./pages/Hero";
import Dashboard from "./pages/Dashboard";
import Budget from "./pages/Budget";
import CreateBudget from "./pages/CreateBudget";
import BudgetDetails from "./pages/BudgetDetails";

import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import SignOut from "./pages/auth/SignOut";

import { AuthProvider } from "./Context/AuthContext";

import ProtectedRoutes from "./utils/ProtectedRoutes";
import PublicRoutes from "./utils/PublicRoutes";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [

        // PUBLIC AUTH PAGES
        // Logged-in users cannot access these
        {
          element: <PublicRoutes />,
          children: [
            {
              path:"/",
              element: <Hero />
            },
            {
              path: "/signin",
              element: <Signin />
            },
            {
              path: "/signup",
              element: <Signup />
            }
          ]
        },

        // PROTECTED PAGES
        // User MUST be logged in
        {
          element: <ProtectedRoutes />,
          children: [
            {
              path: "/dashboard",
              element: <Dashboard />
            },
            {
              path: "/budget",
              element: <Budget />
            },
            {
              path: "/createBudget",
              element: <CreateBudget />
            },
            {
              path: "/budget/:budgetId",
              element: <BudgetDetails />
            },
            {
              path: "/sign-out",
              element: <SignOut />
            }
          ]
        }
      ]
    }
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;