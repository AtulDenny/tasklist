import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/tasksSlice";
import { useNavigate } from "react-router-dom";
import $ from "jquery";

const AddTask = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask(formData))
      .unwrap()
      .then(() => {
        alert(" Task added successfully!");
        navigate("/");
      });
  };
  useEffect(() => {
    $("#taskForm").on("submit", function (e) {
      if ($("#title").val().trim() === "") {
        e.preventDefault();
        alert("⚠️ Task title is required.");
      }
    });
  }, []);

  return (
    <form id="taskForm" onSubmit={handleSubmit}>
      <h3>Add New Task</h3>
      <div className="mb-2">
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          required
          className="form-control"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div className="mb-2">
        <textarea
          name="description"
          placeholder="Description"
          className="form-control"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div className="mb-2">
        <input
          type="date"
          name="dueDate"
          className="form-control"
          value={formData.dueDate}
          onChange={handleChange}
        />
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default AddTask;
