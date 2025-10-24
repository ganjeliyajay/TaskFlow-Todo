import { createSlice } from "@reduxjs/toolkit";
import { createTask, deleteTask, getTask } from "../Features/TaskThunk";

const TaskSlice = createSlice({
    name: "Task Slice",
    initialState: {
        tasks: [],
        loading: false,
        process: false,
        error: ''
    },
    reducers: {
        resetProcess: (state) => {
            state.process = false
        }
    },
    extraReducers: (builder) => {
        builder
            //Create Task
            .addCase(createTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(createTask.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(createTask.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            //get task
            .addCase(getTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTask.fulfilled, (state, action) => {
                state.loading = false
                state.tasks = action.payload
            })
            .addCase(getTask.rejected, (state, action) => {
                state.loading = false
                state.error = action.error?.message || 'Something went wrong'
            })

            //delete task 
            .addCase(deleteTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTask.fulfilled, (state) => {
                state.process = true
                state.loading = false
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.loading = false
                state.error = action.error?.message || 'Something went wrong'
            })

    }
})

export default TaskSlice.reducer
export const { resetProcess } = TaskSlice.actions