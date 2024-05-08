import { Task } from "../types";

export interface TaskDao{
    createTask(task:Task):Promise<void>;
    deletTaskById(id:string): Promise<void>;
    updateTaskById(task:Task):Promise<void>;
    getTaskById(id:string):Promise<Task>;
    getTasksByTitle(title:string):Promise<Task[]|undefined>;

    getTasksForUserByUserId(id:string): Promise<Task[]|undefined>

    
}