import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTask } from "../../Redux/Features/TaskThunk";
import { Bounce, toast } from "react-toastify";
import Loading from '../Loading.jsx'
import { autoLogin } from "../../Redux/Features/UserThunk.jsx";

export default function AddTaskForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cookieData } = useSelector(s => s.user)
  const { error, loading } = useSelector(s => s.task);

  const userId = cookieData?.id
  if (!userId) {
    dispatch(autoLogin()).unwrap()
  }

  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "todo",
    userId: userId,
  });

  const inputHandle = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const formHandle = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createTask(task)).unwrap();
      // console.log(id)
      if (!error) {
        navigate("/dashboard");
        toast.success("One More Task Added 🎉", {
          position: "top-right",
          transition: Bounce,
        });
      }
    } catch (err) {
      toast.error(error || "Something went wrong", {
        position: "top-right",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-sm z-50 bg-gradient-to-r from-purple-50 via-blue-50 to-green-50/70">
      {loading && <Loading />}
      <div className="p-6 w-[450px] rounded-2xl bg-white border border-gray-200 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Add Task
            </h2>
            <p className="text-sm text-gray-500 font-medium">
              Create your task details
            </p>
          </div>
          <button onClick={() => navigate("/dashboard")} className="p-1 transition group relative">
            <IoIosClose className="text-gray-800 text-4xl group-hover:text-red-500 transition cursor-pointer" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={formHandle} className="space-y-5">
          <div>
            <label className="block text-gray-800 font-medium mb-1">Task Title</label>
            <input
              name="title"
              onChange={inputHandle}
              type="text"
              placeholder="Enter task title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-gray-800 font-medium mb-1">Description</label>
            <textarea
              rows="3"
              name="description"
              onChange={inputHandle}
              placeholder="Enter task details"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-800 font-medium mb-1">Status</label>
            <select
              onChange={inputHandle}
              name="status"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
            >
              <option value="todo">📝 Todo</option>
              <option value="processing">⏳ Processing</option>
              <option value="completed">✅ Completed</option>
            </select>
          </div>

          <button
            className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}
