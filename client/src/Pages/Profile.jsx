import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  autoLogin,
  changeDetail,
  changePass,
  userLogout,
} from "../Redux/Features/UserThunk";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import Loading from "../Components/Loading.jsx";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, cookieData } = useSelector((s) => s.user);

  // Auto login if cookie not available
  useEffect(() => {
    if (!cookieData?.id) {
      dispatch(autoLogin());
    }
  }, [cookieData, dispatch]);

  const userId = cookieData?.id;


  // Initialize states safely
  const [data, setData] = useState({
    currentPassword: "",
    newPassword: "",
    conPass: "",
  });

  const [detail, setDetail] = useState({
    name: cookieData?.name || "",
    email: cookieData?.email || "",
  });

  // Update form when cookieData updates
  useEffect(() => {
    if (cookieData?.name && cookieData?.email) {
      setDetail({ name: cookieData.name, email: cookieData.email });
    }
  }, [cookieData]);

  const passChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const detailChange = (e) => {
    const { name, value } = e.target;
    setDetail({ ...detail, [name]: value });
  };

  const handleLogout = async () => {
    try {
      await dispatch(userLogout()).unwrap();
      localStorage.clear();
      toast.info("Logged out successfully 👋", {
        position: "top-right",
        transition: Bounce,
      });
      navigate("/");
    } catch {
      toast.error("Logout failed! Try again.", {
        position: "top-right",
        transition: Bounce,
      });
    }
  };

  const passSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validate password match
    if (data.newPassword !== data.conPass) {
      toast.error("Passwords do not match!", {
        position: "top-right",
        transition: Bounce,
      });
      return;
    }

    try {
      await dispatch(changePass({ userId, data })).unwrap();
      toast.success("Password changed successfully!", {
        position: "top-right",
        transition: Bounce,
      });
      setData({ currentPassword: "", newPassword: "", conPass: "" });
    } catch (error) {
      toast.error(error || "Something went wrong", {
        position: "top-right",
        transition: Bounce,
      });
    }
  };

  const formHandle = async (e) => {
    e.preventDefault();
    try {
      await dispatch(changeDetail({ userId, detail })).unwrap();
      toast.success("Profile updated successfully!", {
        position: "top-right",
        transition: Bounce,
      });
    } catch (error) {
      toast.error(error.message || "Something went wrong", {
        position: "top-right",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 p-4 md:p-6 text-[#1e293b]">
      {loading && <Loading />}
      <div className="flex flex-col w-full max-w-5xl gap-6 mx-auto">
        {/* Back Button */}
        <div className="flex justify-start">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform transform"
          >
            <span className="text-lg sm:text-xl">←</span> Back to Dashboard
          </button>
        </div>

        {/* Forms Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl p-6 sm:p-8 border border-[#e2e8f0] hover:shadow-2xl transition-all duration-300">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-3 mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              👤 Personal Information
            </h2>

            <form onSubmit={formHandle} className="space-y-4 sm:space-y-5">
              <input
                name="name"
                onChange={detailChange}
                value={detail.name}
                type="text"
                placeholder="Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition text-[#1e293b] placeholder-gray-400"
              />
              <input
                name="email"
                onChange={detailChange}
                value={detail.email}
                type="email"
                placeholder="Email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition text-[#1e293b] placeholder-gray-400"
              />
              <button
                disabled={loading}
                className={`w-full py-3 rounded-xl font-semibold shadow-lg transition-transform transform ${loading
                    ? "opacity-50 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 hover:shadow-2xl"
                  }`}
              >
                💾 {loading ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>

          {/* Security */}
          <div className="bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl p-6 sm:p-8 border border-[#e2e8f0] hover:shadow-2xl transition-all duration-300">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-3 mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500">
              🛡️ Security
            </h2>

            <form onSubmit={passSubmit} className="space-y-4 sm:space-y-5">
              <input
                name="currentPassword"
                onChange={passChange}
                value={data.currentPassword}
                type="password"
                placeholder="Current Password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition text-[#1e293b] placeholder-gray-400"
              />
              <input
                name="newPassword"
                onChange={passChange}
                value={data.newPassword}
                type="password"
                placeholder="New Password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition text-[#1e293b] placeholder-gray-400"
              />
              <input
                name="conPass"
                onChange={passChange}
                value={data.conPass}
                type="password"
                placeholder="Confirm Password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition text-[#1e293b] placeholder-gray-400"
              />
              <button
                disabled={loading}
                className={`w-full py-3 rounded-xl font-semibold shadow-lg transition-transform transform ${loading
                    ? "opacity-50 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:scale-105 hover:shadow-2xl"
                  }`}
              >
                🛡️ {loading ? "Processing..." : "Change Password"}
              </button>
            </form>

            {/* Divider */}
            <hr className="my-6 border-gray-200" />

            {/* Danger Zone */}
            <div className="text-[#dc2626] font-bold mb-2 flex items-center gap-2">
              ⚠️ Danger Zone
            </div>
            <button
              onClick={handleLogout}
              disabled={loading}
              className="w-full border border-[#dc2626] text-[#dc2626] py-3 rounded-xl font-semibold hover:bg-red-50 hover:scale-105 transition-transform"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
