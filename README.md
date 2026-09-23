# Task Management Application

A full-stack Task Management Application built using React, Node.js, Express.js, and MongoDB.

The application allows users to register, log in securely, and manage their tasks with complete CRUD functionality.

---

## 🚀 Features

- User Registration
- User Login
- JWT Authentication
- Secure Password Hashing
- Create Tasks
- View Tasks
- Update Tasks
- Delete Tasks
- Mark Tasks as Completed/Pending
- Task Priority Management
- Task Due Dates
- Dashboard Statistics
- Responsive Design
- Professional User Interface
- MongoDB Database Integration

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- Axios
- CSS

### Backend

- Node.js
- Express.js
- JWT
- bcryptjs
- CORS
- dotenv

### Database

- MongoDB
- Mongoose

### Development Tools

- VS Code
- Thunder Client
- MongoDB Compass
- Git & GitHub

---

## 📁 Project Structure

```text
task-management-app/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── assets/
│   ├── index.html
│   └── package.json
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
---

## 🔐 Authentication

This application uses JWT (JSON Web Token) based authentication.

### 1. User Registration

New users can create an account using their name, email, and password.

**API Endpoint:**

```text
POST /api/auth/register
{
  "name": "Arvind",
  "email": "arvind@example.com",
  "password": "123456"
}
POST /api/auth/login
{
  "email": "arvind@example.com",
  "password": "123456"
}
Authorization: Bearer <JWT_TOKEN>
POST /api/tasks
GET /api/tasks
GET /api/tasks/:id
PUT /api/tasks/:id
DELETE /api/tasks/:id
---

## 🗄️ Database

The application uses MongoDB with Mongoose.

### Database

```text
MongoDB
mongodb://127.0.0.1:27017/taskmanagement
---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Arvindgupta0111/task-management-app.git
cd task-management-app
cd backend
npm install
Create a `.env` file inside the `backend` folder:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/taskmanagement
JWT_SECRET=your_secret_key
node server.js
http://localhost:5000
cd frontend
npm install
npm run dev
http://localhost:5173
---

## 🧪 Testing

The backend APIs were tested using Thunder Client.

### Authentication Testing

- User Registration
- User Login
- JWT Token Generation

### Task API Testing

- Create Task
- Get All Tasks
- Get Single Task
- Update Task
- Delete Task
- Update Task Status

### Frontend Testing

The following features were tested:

- User Registration
- User Login
- Logout
- Create Task
- Edit Task
- Delete Task
- Complete/Pending Status
- Task Statistics
- Responsive Mobile Design
---

## 📸 Screenshots

### 🔐 Login / Registration
User can register and login securely using JWT authentication.

### 📊 Dashboard
The dashboard displays task statistics and all user tasks.

### ➕ Create Task
Users can create tasks with title, description, priority and due date.

### ✏️ Update Task
Users can edit existing tasks and update their status.

### 📱 Responsive Design
The application is responsive and works on desktop and mobile devices.
---

## 🔮 Future Improvements

The application can be further improved by adding:

- Real-time task updates using WebSockets
- Task search and filtering
- Task sorting by priority and due date
- Email notifications for upcoming deadlines
- Dark mode
- User profile management
- Task categories and labels
- Cloud deployment