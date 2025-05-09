const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); 

const Task = require("./models/Task");

const app = express();
app.use(cors());
app.use(express.json());
console.log("MONGO_URI used:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error(" MongoDB connection error:", err));
app.post("/api/tasks", async (req, res) => {
  console.log(" Incoming Task:", req.body);
  const newTask = new Task(req.body);
  const savedTask = await newTask.save();
  console.log(" Task saved to MongoDB:", savedTask);
  res.json(savedTask);
});
app.get("/api/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(5000, () => console.log("Server started on port 5000"));
