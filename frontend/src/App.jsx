import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "https://task-management-app-3yz4.onrender.com";

function App() {
  const [isRegister, setIsRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [tasks, setTasks] = useState([]);

  const [showAddTask, setShowAddTask] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  const [editingTaskId, setEditingTaskId] = useState(null);

  // Fetch Tasks
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${API_URL}/api/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(response.data.tasks);
    } catch (error) {
      console.error(error);
      setMessage("Unable to fetch tasks");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchTasks();
    }
  }, [isLoggedIn]);

  // Login / Register
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      if (isRegister) {
        const response = await axios.post(
          `${API_URL}/api/auth/register`,
          {
            name,
            email,
            password,
          }
        );

        setMessage(response.data.message);

        setName("");
        setEmail("");
        setPassword("");
      } else {
        const response = await axios.post(
          `${API_URL}/api/auth/login`,
          {
            email,
            password,
          }
        );

        localStorage.setItem("token", response.data.token);

        setIsLoggedIn(true);
        setMessage("");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  // Add / Update Task
  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      const taskData = {
        title,
        description,
        priority,
        status: editingTaskId
          ? tasks.find((task) => task._id === editingTaskId)?.status ||
            "Pending"
          : "Pending",
        dueDate,
      };

      if (editingTaskId) {
        await axios.put(
          `${API_URL}/api/tasks/${editingTaskId}`,
          taskData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessage("Task updated successfully! ✅");
      } else {
        await axios.post(
          `${API_URL}/api/tasks`,
          taskData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessage("Task created successfully! 🎉");
      }

      clearTaskForm();
      fetchTasks();
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Unable to save task"
      );
    }
  };

  // Delete Task
  const handleDelete = async (taskId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API_URL}/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Task deleted successfully! 🗑️");

      fetchTasks();
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Unable to delete task"
      );
    }
  };

  // Edit Task
  const handleEdit = (task) => {
    setEditingTaskId(task._id);

    setTitle(task.title);
    setDescription(task.description);
    setPriority(task.priority);

    setDueDate(task.dueDate.split("T")[0]);

    setShowAddTask(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Clear Task Form
  const clearTaskForm = () => {
    setTitle("");
    setDescription("");
    setPriority("Medium");
    setDueDate("");

    setEditingTaskId(null);
    setShowAddTask(false);
  };

  // Change Status
  const toggleStatus = async (task) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${API_URL}/api/tasks/${task._id}`,
        {
          title: task.title,
          description: task.description,
          priority: task.priority,
          status:
            task.status === "Completed"
              ? "Pending"
              : "Completed",
          dueDate: task.dueDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks();
    } catch (error) {
      setMessage("Unable to update status");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");

    setIsLoggedIn(false);
    setTasks([]);
  };
 // Login/Register Page
if (!isLoggedIn) {
  return (
    <div className="auth-container">
      <div className="auth-card">

        <h1>Task Management App</h1>

        <h2>{isRegister ? "Create Account" : "Login"}</h2>

        <form onSubmit={handleSubmit} className="auth-form">

          {isRegister && (
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="primary-btn">
            {isRegister ? "Register" : "Login"}
          </button>

        </form>

        <p>{message}</p>

        <button
          className="switch-btn"
          onClick={() => {
            setIsRegister(!isRegister);
            setMessage("");
          }}
        >
          {isRegister
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </button>

      </div>
    </div>
  );
}

  // Dashboard
  return (
    <div className="dashboard">
      <div className="navbar">
  <h1>Task Management Dashboard 📋</h1>

  <button className="logout-btn" onClick={handleLogout}>
    Logout
  </button>
</div>
<div className="dashboard-content">
  <div className="stats">

  <div className="stat-card">
    <h3>Total Tasks</h3>
    <p>{tasks.length}</p>
  </div>

  <div className="stat-card">
    <h3>Pending Tasks</h3>
    <p>
      {tasks.filter((task) => task.status === "Pending").length}
    </p>
  </div>

  <div className="stat-card">
    <h3>Completed Tasks</h3>
    <p>
      {tasks.filter((task) => task.status === "Completed").length}
    </p>
  </div>

</div>
      <button className="add-task-btn"
        onClick={() => {
          clearTaskForm();
          setShowAddTask(!showAddTask);
        }}
      >
        {showAddTask ? "Close Form" : "+ Add Task"}
      </button>

      {/* Add / Edit Form */}
      {showAddTask && (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            marginTop: "20px",
            borderRadius: "8px",
          }}
        >
          <h2>
            {editingTaskId ? "Edit Task" : "Add New Task"}
          </h2>

          <form onSubmit={handleTaskSubmit}>
           <div className="form-group">
  <label>Title</label>
  <input
    type="text"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    required
  />
</div>
            
            <div className="form-group">
  <label>Description</label>
  <textarea
    value={description}
    onChange={(e) => setDescription(e.target.value)}
  />
</div>

            <div className="form-group">
  <label>Priority</label>
  <select
    value={priority}
    onChange={(e) => setPriority(e.target.value)}
  >
    <option value="Low">Low</option>
    <option value="Medium">Medium</option>
    <option value="High">High</option>
  </select>
</div>

            <br />

            <div className="form-group">
  <label>Due Date</label>
  <input
    type="date"
    value={dueDate}
    onChange={(e) => setDueDate(e.target.value)}
    required
  />
</div>

            <br />

            <button type="submit" className="primary-btn">
  {editingTaskId ? "Update Task" : "Create Task"}
</button>

            {editingTaskId && (
              <button
                type="button"
                onClick={clearTaskForm}
                style={{ marginLeft: "10px" }}
              >
                Cancel
              </button>
            )}
          </form>
        </div>
      )}

      <p>{message}</p>

      <hr />

      <h2>Your Tasks ({tasks.length})</h2>

      {tasks.length === 0 ? (
  <div className="empty-state">
    <h3>No tasks yet 📋</h3>
    <p>Create your first task to get started!</p>
  </div>
) : (
        tasks.map((task) => (
          <div
  key={task._id}
  className={`task-card ${
    task.status === "Completed" ? "completed-task" : ""
  }`}
>
            <div className="task-header">
  <div>
    <h3>{task.title}</h3>
    <p className="task-description">
      {task.description}
    </p>
  </div>
</div>

<div className="task-info">
  <span>
    <strong>Priority:</strong> {task.priority}
  </span>

  <span>
    <strong>Status:</strong> {task.status}
  </span>

  <span>
    <strong>Due:</strong>{" "}
    {new Date(task.dueDate).toLocaleDateString()}
  </span>
</div>
<div className="task-actions">
            <button
  className="status-btn"
  onClick={() => toggleStatus(task)}
>
              Mark as{" "}
              {task.status === "Completed"
                ? "Pending"
                : "Completed"}
            </button>

            <button
  className="edit-btn"
  onClick={() => handleEdit(task)}
>
              Edit ✏️
            </button>

            <button
  className="delete-btn"
  onClick={() => handleDelete(task._id)}
>
              Delete 🗑️
            </button>
            </div>
          </div>
        ))
      )}
    </div>
    </div>
  );
}

export default App;
