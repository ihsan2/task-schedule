import firestore from '@react-native-firebase/firestore';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { cancelTriggerNotification, onCreateTriggerNotification } from '../services/notifee';

// add task
export const addTasks = createAsyncThunk('task/add', async data => {
  let id = data?.id;
  await firestore().collection('Tasks').doc(id).set(data);
  onCreateTriggerNotification(data);
  return obj;
});

// fetch task
export const fetchTask = createAsyncThunk('task/fetch', async () => {
  const querySnapshot = await firestore().collection('Tasks').get();
  const tasks = querySnapshot.docs.map(doc => doc.data());
  return tasks;
});

// delete task
export const deleteTask = createAsyncThunk('task/delete', async id => {
  const tasks = await firestore().collection('Tasks').get();
  for (var snap of tasks.docs) {
    if (snap.id === id) {
      await firestore().collection('Tasks').doc(id).delete();
      cancelTriggerNotification(id);
    }
  }
  return id;
});

// update task
export const updateTask = createAsyncThunk('task/update', async task => {
  const tasks = await firestore().collection('Tasks').get();
  for (var snap of tasks.docs) {
    if (snap.id === task.id) {
      await firestore().collection('Tasks').doc(task.id).update(task);
      onCreateTriggerNotification(task);
    }
  }
  return task;
});
