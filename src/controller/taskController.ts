import { Request, Response } from "express";
import { Task } from "../model/types";
import { db } from "../model";
import { Massage } from "../util/msg";
import { ERROR } from "../util/error";
import crypto from 'crypto';


export class TaskController{

    static async addTask(req:Request , res:Response){
        
        let task:Task = req.body;
        task.task_id = crypto.randomUUID();
        task.user_id = res.locals['user_id'];
        try{
            await db.createTask(task);
            res.status(201).send({msg:Massage.CREATE_TASK});

        }catch(err){
            console.error(`[addTask error]=> ${err} `);
            res.status(400).send({err:ERROR.CREATE_TASK})
        }

    }


    static async getTasks(req:Request, res:Response){

        let user_id = res.locals['user_id'];
        try{
            let tasks = await db.getTasksForUserByUserId(user_id);
            res.status(200).send({tasks:tasks});
        }catch(err){
            console.error(`[getTasks]=> ${err} `);
        }
    }

    static async deleteTask(req:Request, res:Response){

        let {task_id} = req.body
        try{
            let tasks = await db.deletTaskById(task_id);
            res.status(200).send({msg:Massage.DELETE_TASK});
        }catch(err){
            console.error(`[deleteTasks]=> ${err} `);
        }
    }
    static async getTask(req:Request, res:Response){

        let id = req.params['id'];
        try{
            let task = await db.getTaskById(id);
            res.status(200).send(task);
        }catch(err){
            console.error(`[getTask]=> ${err} `);
        }
    }


    static async updateTask(req:Request , res:Response){
        
        let task:Task = req.body;
        try{
           let task_r =  await db.updateTaskById(task);
            res.status(200).send({msg:Massage.UPDATE_TASK});

        }catch(err){
            console.error(`[updateTask error]=> ${err} `);
            res.status(400).send({err:ERROR.UPDATE_TASK})
        }

    }

    static async searchBytitle(req:Request, res:Response){

        let title = req.params['title'];
        try{
            let tasks = await db.getTasksByTitle(title);
            res.status(200).send({tasks:tasks});
        }catch(err){
            console.error(`[searchBytitle]=> ${err} `);
        }
    }
}