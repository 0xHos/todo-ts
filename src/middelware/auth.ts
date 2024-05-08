import { NextFunction, RequestHandler, Response } from "express";
import { Token } from "../util/token";
import { JwtPayload } from "jsonwebtoken";
import { ERROR } from "../util/error";

export function auth(req:Request,res:Response,next:NextFunction){
   
    try{
        let token = req.headers.auth;
        let user =Token.checkToken(token) as JwtPayload;
        res.locals['user_id'] = user.user_id;
        next();
    }catch(err){
        res.status(400).send({err:`${ERROR.TOKEN}, ${err}`})
    }
    
  
}