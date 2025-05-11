import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTasks = createAsyncThunk("tasks/fetch", async () => {
  const res = await axios.get("/api/tasks");
  return res.data;
});

export const addTask = createAsyncThunk("tasks/add", async (task) => {
  const res = await axios.post("/api/tasks", task);
  return res.data;
});

export const deleteTask = createAsyncThunk("tasks/delete", async (id) => {
  await axios.delete(`/api/tasks/${id}`);
  return id;
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (_, action) => action.payload)
      .addCase(addTask.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        return state.filter((task) => task._id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;
