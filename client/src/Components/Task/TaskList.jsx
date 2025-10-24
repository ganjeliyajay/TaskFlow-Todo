import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTask } from "../../Redux/Features/TaskThunk";
import Loading from "../Loading.jsx";

export default function TaskList() {
  const { users, userId } = useSelector((s) => s.user);   // ✅ login user redux
  const { tasks, loading, error } = useSelector((s) => s.task);

  const dispatch = useDispatch();
  const id = users?.user?._id || users?.user?.id;

  useEffect(() => {
    if (userId) {
      dispatch(getTask(userId));
    }
  }, [userId, dispatch]);

  if (loading) return <p className="text-textPrimary">Loading tasks...</p>;
  if (error) return <p className="text-error">{error}</p>;

  const statusColors = {
    todo: "bg-info/20 text-info",
    processing: "bg-warning/20 text-warning",
    completed: "bg-success/20 text-success",
  };

  return (
    <div>
      {loading && <Loading />}
      {tasks && tasks.length > 0 ? (
        tasks.map((e) => (
          <div
            key={e._id}
            className="bg-surface rounded-2xl shadow-lg p-6 border border-border mb-4 hover:shadow-2xl transition"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-lg text-textPrimary">{e.title}</h3>
              <button className="text-error hover:scale-110 transition">🗑</button>
            </div>
            <p className="text-textMuted mb-5">{e.description}</p>
            <div className="flex justify-between items-center text-sm flex-wrap gap-2">
              <span
                className={`px-3 py-1 rounded-full font-medium ${statusColors[e.status] || "bg-info/20 text-info"}`}
              >
                {e.status === "todo"
                  ? "📝 Todo"
                  : e.status === "processing"
                    ? "⏳ Processing"
                    : "✅ Completed"}
              </span>
              <span className="text-textMuted">
                • {new Date(e.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
        ))
      ) : (
        <p className="text-textMuted">No tasks found for this user.</p>
      )}
    </div>
  );
}
