import React, { useEffect, useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { getTask, updateTask } from '../../Redux/Features/TaskThunk';
import { useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import Loading from '../Loading';
import { autoLogin } from '../../Redux/Features/UserThunk';

export default function UpdateTask() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tasks, error, loading } = useSelector(s => s.task);
  const { cookieData } = useSelector(s => s.user);
  const taskId = localStorage.getItem('TaskId');
  const userId = cookieData?.id;

  const [data, setData] = useState({
    title: '',
    description: '',
    status: '',
  });

  // Auto login if needed
  useEffect(() => {
    if (!cookieData?.id) {
      dispatch(autoLogin());
    }
  }, [cookieData, dispatch]);

  // Fetch user tasks when logged in
  useEffect(() => {
    if (userId) {
      dispatch(getTask(userId));
    }
  }, [userId, dispatch]);

  // Redirect if no taskId
  useEffect(() => {
    if (!taskId) navigate('/dashboard');
  }, [taskId, navigate]);

  // Prefill form with task data
  useEffect(() => {
    if (taskId && tasks) {
      const task = tasks.find(e => e._id === taskId);
      if (task) {
        setData({
          title: task.title,
          description: task.description,
          status: task.status,
        });
      }
    }
  }, [taskId, tasks]);

  const inputHandle = e => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const formHandle = async e => {
    e.preventDefault();
    try {
      await dispatch(updateTask({ taskId, data })).unwrap();
      localStorage.removeItem('TaskId');
      navigate('/dashboard');
      toast.success('Task updated successfully! 🎉', {
        position: 'top-right',
        transition: Bounce,
      });
    } catch (err) {
      toast.error(error || 'Something went wrong', {
        position: 'top-right',
        transition: Bounce,
      });
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-sm z-50 bg-gradient-to-r from-purple-50 via-blue-50 to-green-50/70 p-4">
      <div className="w-full max-w-lg p-6 md:p-8 rounded-2xl bg-white border border-gray-200 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">

        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Update Task
            </h2>
            <p className="text-gray-500 text-sm md:text-base mt-1">Update your task details</p>
          </div>
          <button
            onClick={() => {
              if (window.confirm("Discard changes?")) {
                localStorage.removeItem('TaskId');
                navigate('/dashboard');
              }
            }}
            className="p-1 rounded-full hover:bg-red-100 transition"
          >
            <IoIosClose className="text-red-500 text-3xl md:text-4xl hover:scale-110 transition cursor-pointer" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={formHandle} className="space-y-5">
          <div>
            <label className="block text-gray-800 font-medium mb-1">Task Title</label>
            <input
              name="title"
              value={data.title}
              onChange={inputHandle}
              type="text"
              placeholder="Enter task title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-gray-800 font-medium mb-1">Description</label>
            <textarea
              rows="4"
              name="description"
              value={data.description}
              onChange={inputHandle}
              placeholder="Enter task details"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-800 font-medium mb-1">Status</label>
            <select
              name="status"
              value={data.status}
              onChange={inputHandle}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
            >
              <option value="todo">📝 Todo</option>
              <option value="processing">⏳ Processing</option>
              <option value="completed">✅ Completed</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300"
          >
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
}
