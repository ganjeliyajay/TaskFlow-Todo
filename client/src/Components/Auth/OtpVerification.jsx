import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resendOtp, sendOtp, verifyOtp } from "../../Redux/Features/UserThunk";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import Loading from "../Loading";

export default function OtpVerification() {

    const { users, loading } = useSelector(s => s.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [data, setData] = useState({
        otp: ''
    })

    const userId = users?.user?.id

    useEffect(() => {
        if (userId) {
            dispatch(sendOtp({ userId }))
        }
    }, [users])

    const inputHandle = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const formHandle = async (e) => {
        e.preventDefault();
        try {
            await dispatch(verifyOtp({ userId, data })).unwrap()
            navigate('/dashboard')

            toast.success("Login Successfully Completed", { position: "top-right", transition: Bounce });

        } catch (error) {
            toast.error(error, { position: "top-right", transition: Bounce });
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4">
            {loading && <Loading />}
            <form
                onSubmit={formHandle}
                className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    OTP Verification
                </h2>
                <p className="text-gray-500 mb-6">
                    Enter the 4-digit code sent to your email / phone
                </p>

                {/* OTP Inputs */}
                <div className="flex justify-center gap-3 mb-6">
                    <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={6}
                        name="otp"
                        value={data.otp}
                        onChange={inputHandle}
                        placeholder="Enter OTP"
                        required
                        className="w-64 px-4 py-3 text-center text-lg tracking-[0.5em] border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 shadow-sm transition-all duration-200"
                    />

                </div>

                <button className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition">
                    Verify OTP
                </button>

                <p className="mt-6 text-sm text-gray-600">
                    Didn’t receive the code?{" "}
                    <button
                        type="button"
                        onClick={() => dispatch(resendOtp({ userId }))}
                        className="text-indigo-600 font-semibold hover:underline focus:outline-none cursor-pointer focus:ring-2 focus:ring-indigo-400 rounded"
                    >
                        Resend OTP
                    </button>
                </p>

            </form>
        </div>
    );
}
