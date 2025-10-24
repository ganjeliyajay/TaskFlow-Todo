import { createSlice } from "@reduxjs/toolkit";
import { autoLogin, changeDetail, changePass, login, resendOtp, sendOtp, signup, userLogout } from "../Features/UserThunk";
import { updateTask } from "../Features/TaskThunk";

const UserSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        error: '',
        process: false,
        loading: false,
        cookieData: []
    },
    reducers: {
        resetProcess: (state) => {
            state.process = false
        },
        setUser: (state, action) => {
            state.userId = action.payload
        }
    },
    extraReducers: (builder) => {
        builder

            //sign up 
            .addCase(signup.pending, (state, action) => {
                state.loading = true
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            //login 
            .addCase(login.pending, (state, action) => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false
                state.users = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            //change password
            .addCase(changePass.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(changePass.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(changePass.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //update detailed
            .addCase(changeDetail.pending, (state, action) => {
                state.loading = true
            })
            .addCase(changeDetail.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(changeDetail.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            //auto login
            .addCase(autoLogin.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(autoLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.cookieData = action.payload
            })
            .addCase(autoLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })

            //logout 
            .addCase(userLogout.pending, (state) => {
                state.loading = true
            })
            .addCase(userLogout.fulfilled, (state) => {
                state.loading = false
                state.cookieData = null
            })
            .addCase(userLogout.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            //sendOtp 
            .addCase(sendOtp.pending, (state) => {
                state.loading = true
            })
            .addCase(sendOtp.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(sendOtp.rejected, (state) => {
                state.loading = false
            })

            //resend otp 
            .addCase(resendOtp.pending, (state) => {
                state.loading = true
            })
            .addCase(resendOtp.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(resendOtp.rejected, (state) => {
                state.loading = false
            })



    }
})

export default UserSlice.reducer
export const { resetProcess, setUser } = UserSlice.actions