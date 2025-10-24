import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { autoLogin, login, sendOtp } from "../../Redux/Features/UserThunk";
import { Bounce, toast } from "react-toastify";
import Loading from '../Loading.jsx'

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users, cookieData, loading } = useSelector((s) => s.user);

  const userId = cookieData?.id;

  const [data, setData] = useState({ email: "", password: "" });

  const inputHandle = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    dispatch(autoLogin()).unwrap()
  }, [dispatch])

  useEffect(() => {
    if (userId) {
      navigate('/dashboard')
    }
  })

  const formHandle = async (e) => {
    e.preventDefault();
    try {
      console.log(userId)
      await dispatch(login(data)).unwrap();

      // await dispatch(sendOtp({ userId }))
      // console.log(userId)
      navigate('/verification')

    } catch (error) {
      toast.error(error || "Login failed", {
        position: "top-right",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4">
      {loading && <Loading />}
      <div className="max-w-md w-full bg-white shadow-2xl rounded-3xl p-10 border border-gray-100">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-2 drop-shadow-md">
            Welcome Back
          </h2>
          <p className="text-gray-500">Login to continue to your dashboard</p>
        </div>

        <form onSubmit={formHandle} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Email Address
            </label>
            <input
              name="email"
              onChange={inputHandle}
              type="email"
              placeholder="you@example.com"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-700 placeholder-gray-400 shadow-sm transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Password
            </label>
            <input
              name="password"
              onChange={inputHandle}
              type="password"
              placeholder="••••••••"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none text-gray-700 placeholder-gray-400 shadow-sm transition"
            />
            <div className="text-right mt-2">
              <Link
                to="/forgot-password"
                className="text-sm text-purple-600 font-semibold hover:text-pink-500 hover:underline transition"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <button
            className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-3 rounded-xl font-bold shadow-lg hover:scale-105 hover:shadow-2xl transition transform"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <Link
            to={"/signup"}
            className="text-purple-600 font-semibold hover:text-pink-500 hover:underline transition"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
