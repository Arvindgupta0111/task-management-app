const Task = require("../models/Task");

// Create Task
const createTask = async (req, res) => {
  try {
    const { title, description, priority, status, dueDate } = req.body;

    if (!title || !dueDate) {
      return res.status(400).json({
        message: "Title and due date are required",
      });
    }

    const task = await Task.create({
      title,
      description,
      priority,
      status,
      dueDate,
      userId: req.userId,
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get All Tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      userId: req.userId,
    }).sort({ createdAt: -1 });

    res.json({
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get Single Task
const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json({
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Update Task
const updateTask = async (req, res) => {
  try {
    const { title, description, priority, status, dueDate } = req.body;

    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.userId,
      },
      {
        title,
        description,
        priority,
        status,
        dueDate,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
};