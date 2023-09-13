import { configureStore } from "@reduxjs/toolkit";
import taskReducer from './TasksSlice';

const store = configureStore({
    reducer:{
        tasks: taskReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export default store;