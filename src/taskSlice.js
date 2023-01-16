import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export const addTask = createAsyncThunk("task/addTask", async (data) => {
  try {
    await addDoc(collection(db, "tasks"), {
      ...data,
      completed: false,
      created: Timestamp.now(),
    });
  } catch (err) {
    throw err;
  }
});

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async ({ id, data }) => {
    try {
      const taskDocRef = doc(db, "tasks", id);
      await updateDoc(taskDocRef, data);
    } catch (err) {
      throw err;
    }
  }
);

export const deleteTask = createAsyncThunk("task/deleteTask", async (id) => {
  try {
    const taskDocRef = doc(db, "tasks", id);
    await deleteDoc(taskDocRef);
  } catch (err) {
    throw err;
  }
});

export const taskSlice = createSlice({
  name: "task",
  initialState: [],
  reducers: {
    setTasks: (_, action) => action.payload,
  },
});

// Action creators are generated for each case reducer function
export const { setTasks } = taskSlice.actions;

export default taskSlice.reducer;
