import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/tasks/${id}`)
      .then((res) => {
        setTask(res.data);
      })
      .catch((err) => {
        console.error("Error fetching task:", err);
        setError("Could not fetch task details.");
      });
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      axios
        .delete(`/api/tasks/${id}`)
        .then(() => {
          alert("🗑️ Task deleted!");
          navigate("/"); 
        })
        .catch((err) => {
          console.error("Error deleting task:", err);
          alert("Failed to delete the task.");
        });
    }
  };

  if (error) return <p className="text-danger">{error}</p>;

  if (!task) return <p>Loading...</p>;

  return (
    <div>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>Due Date: {new Date(task.dueDate).toLocaleDateString("en-GB")}</p>
      <p>
        Status: <span className="badge bg-secondary">{task.status}</span>
      </p>

      <button className="btn btn-danger mt-3" onClick={handleDelete}>
        Delete Task
      </button>
    </div>
  );
};

export default TaskDetails;
