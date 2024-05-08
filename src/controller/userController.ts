import { NextFunction, Request, Response } from "express";
import { db } from "../model";
import { User } from "../model/types";
import { ERROR } from "../util/error";
import { Massage } from "../util/msg";
import crypto from 'crypto';
import { Password } from "../util/password";
import { Token } from "../util/token";


export class UserController{
    static async signup(req:Request,res:Response){
        
        try{
            let user = req.body as User;
            user.user_id = crypto.randomUUID();
            user.password = await Password.hashPassword(user.password);
            await db.createUser(user);
            res.status(201).send({msg:Massage.CREATE_USER});
        }catch(err){
            console.error(`[sigup error]=> ${err} `);
            res.status(400).send({err:ERROR.CREATE_USER})
        }
    }


    static async deleteAccount(req:Request,res:Response){
        
        try{
            await db.deleteUserById(res.locals['user_id']);
            res.status(200).send({msg:Massage.DELETE_USER});
        }catch(err){
            console.error(`[deleteAccount error]=> ${err} `);
            res.status(400).send({err:ERROR.DELETE_USER})
        }
    }

    static async signin(req:Request,res:Response){
            
        try{
            let {username , password} = req.body ;
            let user = await db.getUserByUsername(username);
            let isExist:boolean = await Password.checkHashPassword(password,user?.password as string); 
            console.log(isExist);
            if(isExist){
                res.status(200).send({token:Token.createToken({user_id:user?.user_id,username:user?.username})});
            }else{
                res.status(400).send({err:ERROR.SINGIN})

            }
        }catch(err){
            console.error(`[signin error]=> ${err} `);
            res.status(400).send({err:ERROR.SINGIN})
        }
        
    }
}