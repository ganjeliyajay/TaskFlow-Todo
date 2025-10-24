import { Router } from "express";
import { addTask, getTask, taskDelete, taskUpdate } from "../controllers/TaskController.js";

export const TaskRoute = Router()
TaskRoute.route('/').post(addTask)
TaskRoute.route('/find').post(getTask)
TaskRoute.route('/delete').post(taskDelete)
TaskRoute.route('/edit').post(taskUpdate)