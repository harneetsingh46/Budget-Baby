# 💰 BudgetBaby

**BudgetBaby** is a personal finance and budgeting web application designed to help users manage their monthly budgets, track purchases, organize expenses by category, and understand their overall financial activity.

The application provides an authenticated dashboard where users can create budgets, add purchases against those budgets, monitor spending, and manage their financial information in one place.

---

## ✨ Features

### 🔐 Authentication

* User registration
* User login
* Protected application routes
* Prevent authenticated users from accessing Sign In and Sign Up pages
* User-specific budget and purchase data
* Authentication-aware navigation

### 🏠 Landing Page

BudgetBaby includes a public landing page that introduces the application and explains its main features.

The landing page does **not** expose private user information, dashboard data, budgets, or transactions.

### 📊 Dashboard

The dashboard provides an overview of the user's financial activity.

It includes:

* Total income
* Total expenses
* Total savings
* Savings percentage
* Recent transactions
* Budget allocation
* Spending progress
* Month and year filters

### 💰 Budget Management

Users can:

* Create a budget
* Select a category
* Create a new category
* Set a budget amount
* Select a month
* Select a year
* View all their budgets
* View individual budget details
* Delete budgets

Budgets are displayed with the newest budgets appearing first.

### 🧾 Purchase Tracking

Users can add purchases to a specific budget.

Each purchase contains:

* Title
* Amount
* Note
* Date
* Budget
* Category
* Month
* Year

Users can also delete purchases.

### 🗂️ Categories

Users can:

* View available categories
* Create new categories
* Assign categories to budgets
* Associate purchases with their budget category

### 📱 Responsive UI

The application is designed to work across:

* Desktop
* Tablet
* Mobile

The UI uses a soft cream and brown color palette to provide a simple financial management experience.

---

# 🛠️ Tech Stack

## Frontend

* React
* React Router
* Axios
* Tailwind CSS
* Lucide React
* Lottie React

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT/Authentication middleware

## API Communication

Axios is used on the frontend to communicate with the backend API.

An Axios interceptor is used for authenticated API requests.

---

# 📁 Project Structure

A simplified project structure looks like this:

```text
BudgetBaby/
│
├── frontend/
│   ├── src/
│   │   ├── ApiClient/
│   │   │   └── interceptor.js
│   │   │
│   │   ├── common/
│   │   │   └── Layout.jsx
│   │   │
│   │   ├── Context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Hero.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Budget.jsx
│   │   │   ├── BudgetDetails.jsx
│   │   │   ├── CreateBudget.jsx
│   │   │   │
│   │   │   └── auth/
│   │   │       ├── Signin.jsx
│   │   │       ├── Signup.jsx
│   │   │       └── SignOut.jsx
│   │   │
│   │   ├── utils/
│   │   │   ├── ProtectedRoutes.jsx
│   │   │   └── PublicRoutes.jsx
│   │   │
│   │   └── App.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── controllers/
│   │   ├── budget.controller.js
│   │   └── purchase.controller.js
│   │
│   ├── model/
│   │   ├── budget.schema.js
│   │   └── purchase.schema.js
│   │
│   ├── routes/
│   │   ├── budget.routes.js
│   │   └── purchase.routes.js
│   │
│   ├── utils/
│   │   └── protect.js
│   │
│   ├── .env
│   └── server.js
│
└── README.md
```

---

# 🔑 Application Routes

## Public Routes

| Route       | Description             |
| ----------- | ----------------------- |
| `/`         | BudgetBaby landing page |
| `/signin`   | User login              |
| `/signup`   | User registration       |
| `/sign-out` | Sign out                |

## Protected Routes

Authentication is required for these routes:

| Route               | Description         |
| ------------------- | ------------------- |
| `/dashboard`        | Financial dashboard |
| `/budget`           | User's budgets      |
| `/createBudget`     | Create a new budget |
| `/budget/:budgetId` | Budget details      |

Unauthenticated users attempting to access protected pages should be redirected to the Sign In page.

Authenticated users attempting to access `/signin` or `/signup` should be redirected to the dashboard.

---

# 🔌 API Endpoints

## Authentication

The authentication API handles user registration, login, and authentication.

Example:

```text
POST /api/auth/signup
```

---

## Budget API

### Create Budget

```http
POST /api/budget/create
```

Creates a new budget for the authenticated user.

### Get Budgets

```http
GET /api/budget/get
```

Returns budgets belonging to the authenticated user.

Budgets can be sorted by creation date:

```js
.sort({ createdAt: -1 })
```

so the newest budgets appear first.

### Get One Budget

```http
GET /api/budget/get/:id
```

Returns details for a specific budget.

### Delete Budget

```http
DELETE /api/budget/delete/:id
```

Deletes a budget belonging to the authenticated user.

---

# 🧾 Purchase API

### Create Purchase

```http
POST /api/purchase/create
```

Creates a purchase associated with a budget.

Example request body:

```json
{
  "title": "Grocery Shopping",
  "amount": 1200,
  "note": "Monthly groceries",
  "date": "2026-09-27",
  "budgetId": "YOUR_BUDGET_ID"
}
```

### Get Purchases

```http
GET /api/purchase/budget/:budgetId
```

Returns purchases associated with a specific budget.

### Delete Purchase

```http
DELETE /api/purchase/delete/:id
```

Deletes a purchase belonging to the authenticated user.

---

# 🗃️ Budget Data

A budget contains information such as:

```json
{
  "_id": "budget_id",
  "user": "user_id",
  "category": "category_id",
  "amount": 5000,
  "month": 8,
  "year": 2026
}
```

Budget records use timestamps so that they can be ordered using `createdAt`.

---

# 🧾 Purchase Data

A purchase contains information such as:

```json
{
  "user": "user_id",
  "budget": "budget_id",
  "category": "category_id",
  "title": "Grocery Shopping",
  "amount": 1200,
  "note": "Monthly groceries",
  "date": "2026-09-27",
  "month": 8,
  "year": 2026
}
```

---

# ⚙️ Installation

## 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
```

Move into the project:

```bash
cd BudgetBaby
```

---

## 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

## 3. Install Backend Dependencies

Open another terminal:

```bash
cd backend
npm install
```

---

# 🔐 Environment Variables

Create a `.env` file inside the backend directory.

Example:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Do not commit your `.env` file to Git.

Make sure `.env` is included in `.gitignore`.

---

# ▶️ Running the Application

## Start Backend

Inside the backend directory:

```bash
npm run dev
```

or:

```bash
npm start
```

The backend will run on the configured port.

Example:

```text
http://localhost:3000
```

---

## Start Frontend

Inside the frontend directory:

```bash
npm run dev
```

The React application will normally be available at:

```text
http://localhost:5173
```

---

# 🔒 Authentication Flow

BudgetBaby uses protected and public route handling.

### Logged Out

A logged-out user can access:

```text
/
 /signin
 /signup
```

They cannot access:

```text
/dashboard
/budget
/createBudget
/budget/:budgetId
```

They should be redirected to:

```text
/signin
```

### Logged In

A logged-in user can access:

```text
/dashboard
/budget
/createBudget
/budget/:budgetId
```

If they try to access:

```text
/signin
/signup
```

they should be redirected to:

```text
/dashboard
```

---

# 🎨 Design

BudgetBaby uses a minimal financial dashboard design based around:

* Cream backgrounds
* Brown typography
* White cards
* Soft borders
* Rounded components
* Responsive layouts
* Simple financial icons

The application uses Tailwind CSS for styling.

---

# 📈 Dashboard Overview

The dashboard calculates and displays:

```text
Total Income
Total Expense
Total Savings
Savings Rate
```

It also provides:

```text
Recent Transactions
Budget Allocation
Spending Progress
```

Users can select a month and year to view the corresponding financial information.

---

# 🛡️ Security

BudgetBaby uses authenticated API requests so that users can access only their own financial data.

Backend queries use the authenticated user's ID, for example:

```js
{
  user: req.user._id
}
```

This ensures that budgets and purchases are associated with the currently authenticated user.

Passwords and sensitive authentication information should never be committed to the repository.

---

# 🚀 Future Improvements

Possible future improvements include:

* Income management
* Advanced expense analytics
* Charts and graphs
* Monthly financial reports
* Budget notifications
* Spending alerts
* Recurring expenses
* Export financial reports
* Profile management
* Password reset
* Dark mode
* Improved mobile navigation

---

# 👨‍💻 Development

BudgetBaby is built as a full-stack application with a React frontend and Node/Express backend.

The frontend communicates with the backend through REST APIs, while MongoDB stores user, budget, category, and purchase information.

---

# 📄 License

This project is currently intended for educational and personal development purposes.

---

## 💰 BudgetBaby

**Plan your money. Track your spending. Build better habits.**
