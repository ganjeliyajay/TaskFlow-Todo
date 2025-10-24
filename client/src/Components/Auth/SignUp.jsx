import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../Redux/Features/UserThunk";
import { Bounce, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Loading from '../Loading.jsx'

export default function SignupPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.user)

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    conpass: "",
  });

  const inputHandle = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const formHandle = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signup(data)).unwrap();
      setTimeout(() => {
        navigate("/");
      }, 1000);
      toast.success("Signup successful!", {
        position: "top-right",
        transition: Bounce,
      });
    } catch (error) {
      console.error(error);
      toast.error(error, {
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
            Create Account
          </h2>
          <p className="text-gray-500">
            Sign up to get started with your vibrant account
          </p>
        </div>

        <form onSubmit={formHandle} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Full Name
            </label>
            <input
              name="name"
              onChange={inputHandle}
              type="text"
              placeholder="Enter your name"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-700 placeholder-gray-400 shadow-sm transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              onChange={inputHandle}
              placeholder="you@example.com"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-700 placeholder-gray-400 shadow-sm transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={inputHandle}
              placeholder="••••••••"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none text-gray-700 placeholder-gray-400 shadow-sm transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="conpass"
              onChange={inputHandle}
              placeholder="••••••••"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none text-gray-700 placeholder-gray-400 shadow-sm transition"
            />
          </div>

          <button
            className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-3 rounded-xl font-bold shadow-lg hover:scale-105 hover:shadow-2xl transition transform"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            to={"/"}
            className="text-purple-600 font-semibold hover:text-pink-500 hover:underline transition"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
