import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const user = import.meta.env.VITE_API_URL

export const signup = createAsyncThunk('SignUp', async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${user}/register`, data, { withCredentials: true });
        return res.data
    } catch (error) {
        console.log(error.response.data.msg)
        return rejectWithValue(error.response.data.msg)
    }
})

export const login = createAsyncThunk('login', async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${user}/login`, data)
        return res.data
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data.msg)
    }
})

export const changePass = createAsyncThunk('changePass', async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${user}/updatepass`, data)
        console.log(res.data)
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data.msg)
    }
})

export const changeDetail = createAsyncThunk('changeDetailed', async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${user}/updatedetail`, data)
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data.msg)
    }
})

export const sendOtp = createAsyncThunk('otpsend', async (id, { rejectWithValue }) => {
    try {

        const res = await axios.post(`${user}/sendotp`, id)
        return res.data

    } catch (error) {
        return rejectWithValue(error.response.data.msg)
    }
})

export const resendOtp = createAsyncThunk('resendOtp', async (id, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${user}/resetsendotp`, id, { withCredentials: true })
        return res.data

    } catch (error) {
        return rejectWithValue(error.response.data.msg)
    }
})

export const verifyOtp = createAsyncThunk('verifyOtp', async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${user}/verifyotp`, data, { withCredentials: true })
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data.msg)
    }
})

export const autoLogin = createAsyncThunk('autologin', async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${user}/login/me`, { withCredentials: true })
        return res.data.user
    } catch (error) {
        return rejectWithValue(error.response.data.msg)
    }
})

export const userLogout = createAsyncThunk('logout', async (_, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${user}/logout`, {}, { withCredentials: true })
        console.log(res)
        return true
    } catch (error) {
        return rejectWithValue(error.response.data.msg)
    }
})