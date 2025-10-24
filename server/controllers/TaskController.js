import { $task } from "../model/Task.js";

//  Add Task
export const addTask = async (req, res) => {
    try {
        const { title, description, userId, status } = req.body;

        if (!title || !description || !status || !userId) {
            return res.status(400).json({ success: false, msg: "All fields are required" });
        }

        const task = await $task.create({ title, description, status, userId });

        return res.status(201).json({
            success: true,
            msg: "Task added successfully!",
            task,
        });

    } catch (error) {
        return res.status(500).json({ success: false, msg: "Server Error", error: error.message });
    }
};

// Get All Tasks for User
export const getTask = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, msg: "User ID required" });
        }

        const tasks = await $task.find({ userId: id }).sort({ createdAt: -1 });

        if (!tasks.length) {
            return res.status(404).json({ success: false, msg: "No tasks found" });
        }

        res.status(200).json({
            success: true,
            count: tasks.length,
            tasks,
        });

    } catch (error) {
        return res.status(500).json({ success: false, msg: "Server Error", error: error.message });
    }
};


// Delete Task
export const taskDelete = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, msg: "Task ID required" });
        }

        const deletedTask = await $task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ success: false, msg: "Task not found" });
        }

        res.status(200).json({
            success: true,
            msg: "Task deleted successfully",
        });

    } catch (error) {
        return res.status(500).json({ success: false, msg: "Server Error", error: error.message });
    }
};



// Update Task

export const taskUpdate = async (req, res) => {
    try {
        const { taskId, data: { title, description, status } } = req.body;

        if (!taskId) {
            return res.status(400).json({ success: false, msg: "Task ID required" });
        }

        const updatedTask = await $task.findByIdAndUpdate(
            taskId,
            { title, description, status },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ success: false, msg: "Task not found" });
        }

        res.status(200).json({
            success: true,
            msg: "Task updated successfully",
            task: updatedTask,
        });

    } catch (error) {
        return res.status(500).json({ success: false, msg: "Server Error", error: error.message });
    }
};
