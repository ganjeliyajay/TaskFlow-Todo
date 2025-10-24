import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const task = import.meta.env.VITE_TASK_URL

export const createTask = createAsyncThunk('addTask', async (data, { rejectWithValue }) => {

    try {
        const res = await axios.post(`${task}`, data)
        console.log(res)
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data.msg)
    }
})

export const getTask = createAsyncThunk('getTask', async (userId, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${task}/find`, { id: userId })
        console.log(res.data)
        return res.data.tasks
    } catch (error) {
        return rejectWithValue(error.response.data.msg)
    }
})

export const deleteTask = createAsyncThunk('deleteTask', async (id, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${task}/delete`, { id })
        console.log(res.data)
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data.msg)
    }
})

export const updateTask = createAsyncThunk('updateTask', async (id, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${task}/edit`, id)
        return res.data.task
    } catch (error) {
        return rejectWithValue(error.response.data.msg)
    }
})