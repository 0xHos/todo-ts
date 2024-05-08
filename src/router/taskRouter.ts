import express from 'express';
import { TaskController } from '../controller/taskController';
import { auth } from '../middelware/auth';

export const taskRouter = express.Router();

taskRouter.use(auth);
taskRouter.get("/", TaskController.getTasks);
taskRouter.get("/:id", TaskController.getTask);
taskRouter.get("/search/:title", TaskController.searchBytitle);
taskRouter.post("/", TaskController.addTask);
taskRouter.delete("/", TaskController.deleteTask);
taskRouter.put("/" , TaskController.updateTask)



