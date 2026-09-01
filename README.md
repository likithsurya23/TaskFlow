# ⚡ TaskFlow — Modern Task & Productivity Management System

TaskFlow is a full-stack, responsive task management platform built with **Next.js 16 (App Router)**, **Tailwind CSS 4**, **Node.js**, **Express**, and **MongoDB**. It features user authentication, real-time status tracking, priority management, interactive calendar/analytics views, dark/light theme switching, and an offline demo fallback mode.

---

## ✨ Features

- 🔐 **Authentication & Authorization**: Secure JWT-based registration and login with `bcryptjs` password hashing and local session persistence. Includes an automatic offline demo mode when backend service is offline.
- 📊 **Interactive Dashboard**: Real-time summary cards (total, completed, pending, in-progress tasks), quick action modal, and progress metrics.
- 📋 **Task Management (CRUD)**: Create, view, edit, search, filter, and delete tasks. Set task priorities (`Low`, `Medium`, `High`), status (`Pending`, `In Progress`, `Completed`), and due dates.
- 🌓 **Dark / Light Mode**: Theme context toggling with custom CSS variables and glassmorphism UI components.
- 📅 **Calendar & Analytics**: Interactive calendar schedule view and task distribution analytics.
- 📱 **Fully Responsive Layout**: Built with Tailwind CSS 4 and Lucide React icons, optimized for desktop, tablet, and mobile screens.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library / Styling**: [React 19](https://react.dev/), [Tailwind CSS 4](https://tailwindcss.com/), Custom Vanilla CSS
- **Icons**: [Lucide React](https://lucide.dev/)
- **State & Context**: React Context API (`AuthContext`, `ThemeContext`)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) & [Express 5](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose 9](https://mongoosejs.com/)
- **Authentication**: JSON Web Tokens (`jsonwebtoken`) & `bcryptjs`
- **Cross-Origin Handling**: `cors` middleware

---

## 📁 Repository Structure

```
TaskFlow/
├── frontend/                # Next.js frontend application
│   ├── src/
│   │   ├── app/             # App router pages (dashboard, tasks, analytics, calendar, login, etc.)
│   │   ├── components/      # Reusable UI components (TaskCard, TaskForm, Sidebar, Navbar)
│   │   ├── context/         # AuthContext and ThemeContext providers
│   │   └── ...
│   ├── .env                 # Frontend environment variables
│   └── package.json
├── backend/                 # Express REST API backend
│   ├── config/              # MongoDB connection setup
│   ├── controllers/         # Request handlers (authController, taskController)
│   ├── middleware/          # JWT authentication middleware
│   ├── models/              # Mongoose schemas (User, Task)
│   ├── routes/              # API endpoints (/api/auth, /api/tasks)
│   ├── .env                 # Backend environment variables
│   ├── server.js            # Express app entry point
│   └── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)
- **MongoDB** (Local instance running at `mongodb://127.0.0.1:27017` or a MongoDB Atlas URI)

---

### 1. Setup Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Create or inspect the `.env` file in the `backend/` directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/taskflow
   JWT_SECRET=your_super_secret_jwt_key
   ```

4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The API server will run at `http://localhost:5000`.*

---

### 2. Setup Frontend

1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Create or inspect the `.env` file in the `frontend/` directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. Start the Next.js development server:
   ```bash
   npm run dev
   ```
   *Open [http://localhost:3000](http://localhost:3000) in your browser.*

---

## 🔌 API Endpoints

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | Register a new user | No |
| `POST` | `/api/auth/login` | Authenticate user & receive JWT token | No |
| `GET` | `/api/auth/me` | Fetch currently authenticated user profile | Yes (`Bearer <token>`) |

### Tasks (`/api/tasks`)
| Method | Endpoint | Description | Auth Required |
| --- | --- | --- | --- |
| `GET` | `/api/tasks` | Get all tasks for the logged-in user | Yes |
| `POST` | `/api/tasks` | Create a new task | Yes |
| `PUT` | `/api/tasks/:id` | Update an existing task | Yes |
| `DELETE` | `/api/tasks/:id` | Delete a task | Yes |

---

## 📜 Available Scripts

### Backend (`/backend`)
- `npm run dev` — Starts the server using `nodemon` for auto-reloading on changes.
- `npm start` — Starts the production Node server.

### Frontend (`/frontend`)
- `npm run dev` — Runs the Next.js development server at `http://localhost:3000`.
- `npm run build` — Builds the optimized production application.
- `npm run start` — Runs the built production server.
- `npm run lint` — Runs ESLint checks across frontend code.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).