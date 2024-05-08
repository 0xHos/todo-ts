import { DataStore } from "..";
import { User, Task } from "../types";
import mssql from 'mssql';

export class SqlDataBase implements DataStore{
    async getTasksForUserByUserId(id: string): Promise<Task[] | undefined> {
        let sql = `sp_getTasksForUserByUserId '${id}'`;
        return (await mssql.query(sql)).recordset;
    }
    
    async createUser(user: User): Promise<void> {
        let sql = `exec sp_createUser '${user.user_id}','${user.username}','${user.password}' `;
        await mssql.query(sql);
    }
    async deleteUserById(id: string): Promise<void> {
        let sql = `exec sp_deleteUserById '${id}'`;
        await mssql.query(sql);

    }
    updateUserById(id: string): Promise<User | undefined> {
        throw new Error("Method not implemented.");
    }
    getUserByIdById(id: string): Promise<User | undefined> {
        throw new Error("Method not implemented.");
    }
     async getUserByUsername(username: string):Promise<User | undefined>  {
        let sql = `exec sp_getUserByUsername '${username}'`;
        return (await mssql.query(sql)).recordset[0] as User | undefined;
    }
    async createTask(task:Task): Promise<void> {
        let sql = `exec sp_createTask '${task.task_id}','${task.user_id}','${task.title}','${task.content}' `;
        await mssql.query(sql);
    }
    async deletTaskById(id: string): Promise<void> {
        let sql = `exec sp_deleteTaskById '${id}' `;
        await mssql.query(sql);
    }
   async getTaskById(id: string): Promise<Task> {
        let sql = `exec sp_getTaskById '${id}' `;
        return (await mssql.query(sql)).recordset[0] as Task;
    }

    async updateTaskById(task:Task): Promise<void> {
        let sql = `exec sp_updateTaskById '${task.task_id}','${task.title}','${task.content}' `;
        await mssql.query(sql);
    }
    async getTasksByTitle(title: string): Promise<Task[]> {
        let sql = `exec sp_getTasksByTitle '${title}'`;
        return (await mssql.query(sql)).recordset;
    }
   
}