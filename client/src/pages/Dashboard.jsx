import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "../redux/tasksSlice";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  console.log("Fetched tasks:", tasks);
  console.log("Type of tasks:", typeof tasks);

  if (!Array.isArray(tasks)) {
    return (
      <div>
        <h3>All Tasks</h3>
        <p> Tasks not an array. Actual value:</p>
        <pre>{JSON.stringify(tasks, null, 2)}</pre>
      </div>
    );
  }

  return (
    <div>
      <h3>All Tasks</h3>
      {tasks.length > 0 ? (
        <div className="list-group">
          {tasks.map((task) => (
            <Link
              key={task._id}
              to={`/task/${task._id}`}
              className="list-group-item list-group-item-action"
            >
              <strong>{task.title}</strong> — {task.status || "pending"}
            </Link>
          ))}
        </div>
      ) : (
        <p>No tasks found.</p>
      )}
    </div>
  );
};

export default Dashboard;
