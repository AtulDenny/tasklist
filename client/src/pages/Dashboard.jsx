import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, deleteTask } from "../redux/tasksSlice";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (!Array.isArray(tasks)) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h3>All Tasks</h3>
      {tasks.length > 0 ? (
        <div className="list-group">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <Link to={`/task/${task._id}`} className="text-decoration-none flex-grow-1">
                <strong>{task.title}</strong> — {task.status || "pending"}
              </Link>
              <button
                className="btn btn-sm btn-danger ms-2"
                onClick={() => dispatch(deleteTask(task._id))}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No tasks found.</p>
      )}
    </div>
  );
};

export default Dashboard;
