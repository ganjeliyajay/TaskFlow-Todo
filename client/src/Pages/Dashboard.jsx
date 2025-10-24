import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, getTask } from "../Redux/Features/TaskThunk";
import { MdDeleteOutline, MdAccountCircle } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { resetProcess } from "../Redux/Slice/TaskSlice";
import { FaSearch } from "react-icons/fa";
import { Bounce, toast } from "react-toastify";
import { autoLogin } from "../Redux/Features/UserThunk";

export default function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, users, cookieData } = useSelector((s) => s.user);
    const { tasks, process } = useSelector((s) => s.task);

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    const userId = cookieData?.id
    if (!userId) {
        dispatch(autoLogin()).unwrap()
    }

    useEffect(() => {
        if (userId) {
            dispatch(getTask(userId));
            dispatch(resetProcess());
        }
    }, [userId, dispatch, process]);

    const filtertask = tasks
        .filter((e) => e.title.toLowerCase().includes(search.toLowerCase()))
        .filter((e) => (filter === "all" ? true : e.status === filter));

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 via-blue-100 to-blue-50 p-6 text-[#1e293b]">
            {/* Navbar */}
            <header className="mb-8 sticky top-0 z-30 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500/80 backdrop-blur-md px-6 py-4 rounded-2xl shadow-2xl flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
                {/* Logo & Title */}
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 w-full md:w-auto">
                    <h1 className="text-2xl font-bold text-white drop-shadow-lg">TaskFlow</h1>
                    <p className="text-sm text-white/80">Delightful task management</p>
                </div>

                {/* Search & Profile */}
                <div className="relative flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
                    <div className="relative w-full md:w-64">
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-full border border-white/40 shadow-sm text-[#1e293b] placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-white transition duration-300"
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6b7280]" />
                    </div>

                    <button
                        onClick={() => navigate("/profile")}
                        className=" cursor-pointer text-4xl text-white hover:text-white/80 transition"
                    >
                        <MdAccountCircle />
                    </button>
                </div>
            </header>

            {/* Dashboard Section */}
            <section className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-[#e2e8f0]">
                {/* Header & Add Task */}
                <div className="flex flex-wrap justify-between items-center mb-6">
                    <div>
                        <h2 className="text-3xl font-bold text-[#1e293b]">Dashboard</h2>
                        <p className="text-[#6b7280]">Your tasks at a glance</p>
                    </div>
                    <button
                        onClick={() => navigate("/addTask")}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-5 py-2 rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300 cursor-pointer"
                    >
                        Add Task
                    </button>
                </div>

                {/* Filters - Sticky */}
                <div className=" sticky top-19 z-20 bg-transparent backdrop-blur-[2px] flex flex-wrap gap-3 mb-8 px-4 py-4 rounded-2xl shadow-md">
                    <button
                        onClick={() => setFilter("all")}
                        className={` cursor-pointer px-6 py-2.5 rounded-full font-medium shadow transition ${filter === "all"
                            ? "bg-gradient-to-r from-[#00bcd4] to-[#3f51b5] text-white"
                            : "bg-white border border-[#00bcd4] text-[#00bcd4]"
                            }`}
                    >
                        📋 All
                    </button>
                    <button
                        onClick={() => setFilter("todo")}
                        className={`cursor-pointer px-6 py-2.5 rounded-full font-medium shadow transition ${filter === "todo"
                            ? "bg-[#0284c7] text-white"
                            : "bg-white border border-[#0284c7] text-[#0284c7]"
                            }`}
                    >
                        📝 Todo
                    </button>
                    <button
                        onClick={() => setFilter("processing")}
                        className={` cursor-pointer px-6 py-2.5 rounded-full font-medium shadow transition ${filter === "processing"
                            ? "bg-[#f59e0b] text-white"
                            : "bg-white border border-[#f59e0b] text-[#f59e0b]"
                            }`}
                    >
                        ⏳ Processing
                    </button>
                    <button
                        onClick={() => setFilter("completed")}
                        className={`cursor-pointer px-6 py-2.5 rounded-full font-medium shadow transition ${filter === "completed"
                            ? "bg-[#16a34a] text-white"
                            : "bg-white border border-[#16a34a] text-[#16a34a]"
                            }`}
                    >
                        ✅ Completed
                    </button>
                </div>

                {/* Task Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtertask && filtertask.length > 0 ? (
                        filtertask.map((e) => (
                            <div
                                key={e._id}
                                className="bg-white rounded-2xl shadow-lg p-6 border border-[#e2e8f0] hover:-translate-y-2 hover:shadow-2xl transition-transform duration-300"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-bold text-lg text-[#1e293b] hover:text-[#00bcd4] transition-colors duration-300">
                                        {e.title}
                                    </h3>
                                    <button
                                        onClick={() => {
                                            dispatch(deleteTask(e._id))
                                            toast.success("One Task Deleted", { position: "top-right", transition: BounceF });
                                        }
                                        }
                                        className=" cursor-pointer text-2xl text-[#dc2626] hover:scale-110 transition-transform duration-300"
                                    >
                                        <MdDeleteOutline />
                                    </button>
                                </div>
                                <p className="text-[#6b7280] mb-5">{e.description}</p>
                                <div className="flex justify-between items-center text-sm flex-wrap gap-2">
                                    <span
                                        className={`px-3 py-1 rounded-full font-medium transition-colors duration-300 ${e.status === "todo"
                                            ? "bg-[#0284c7]/20 text-[#0284c7] hover:bg-[#0284c7]/30"
                                            : e.status === "processing"
                                                ? "bg-[#f59e0b]/20 text-[#f59e0b] hover:bg-[#f59e0b]/30"
                                                : "bg-[#16a34a]/20 text-[#16a34a] hover:bg-[#16a34a]/30"
                                            }`}
                                    >
                                        {e.status === "todo"
                                            ? "📝 Todo"
                                            : e.status === "processing"
                                                ? "⏳ Processing"
                                                : "✅ Completed"}
                                    </span>
                                    <span className="text-[#6b7280]">
                                        • {new Date(e.createdAt).toLocaleString()}
                                    </span>
                                    <button
                                        onClick={() => {
                                            localStorage.setItem("TaskId", e._id);
                                            navigate("/edit");
                                        }}
                                        className=" cursor-pointer text-xl bg-[#00bcd4]/10 text-[#00bcd4] px-3 py-1 rounded-full hover:bg-[#00bcd4]/20 transition-colors duration-300"
                                    >
                                        <FiEdit />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400 col-span-full text-center mt-8 text-lg">
                            🗂️ No tasks found. Click "Add Task" to create one!
                        </p>
                    )}
                </div>
            </section>
        </div>
    );
}
