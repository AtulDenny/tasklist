import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTasks = createAsyncThunk("tasks/fetch", async () => {
  const res = await axios.get("/api/tasks");
  console.log("📡 API fetched tasks:", res.data); // ✅ Debug log
  return res.data;
});

export const addTask = createAsyncThunk("tasks/add", async (task) => {
  const res = await axios.post("/api/tasks", task);
  console.log("📤 API added task:", res.data); // ✅ Debug log
  return res.data;
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState: [], 
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (_, action) => {
        console.log(" Redux fetchTasks.fulfilled:", action.payload);
        return action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        console.log(" Redux addTask.fulfilled:", action.payload);
        state.push(action.payload);
      });
  },
});

export default tasksSlice.reducer;
