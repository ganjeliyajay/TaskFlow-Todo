import { configureStore } from "@reduxjs/toolkit";
import UserSlice from './Slice/UserSlice';
import TaskSlice from './Slice/TaskSlice';

export const store = configureStore({
    reducer: {
        user: UserSlice,
        task: TaskSlice
    }
});
