import {createSlice} from '@reduxjs/toolkit';
import { addTasks, deleteTask, fetchTask, updateTask } from './TasksActions';

const tasksSlice = createSlice({
  name: 'Tasks',
  initialState: {
    booksArray: [],
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTask.fulfilled, (state, action) => {
        state.taskArray = action.payload;
      })
      .addCase(addTasks.fulfilled, (state, action) => {
        state.taskArray.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.taskArray = state.taskArray.filter(
          task => task.id !== action.payload,
        );
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const task = action.payload;
        const taskIndex = state.taskArray.findIndex(t => task.id === t.id);
        if (taskIndex !== -1) {
          state.taskArray[taskIndex] = task;
        }
      });
  },
});

export default tasksSlice.reducer;
