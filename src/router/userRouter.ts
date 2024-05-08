import express from 'express';
import { UserController } from '../controller/userController';
import { auth } from '../middelware/auth';

export const userRouter = express.Router();

userRouter.post("/register", UserController.signup);
userRouter.post("/", UserController.signin);
userRouter.delete("/", auth,UserController.deleteAccount);

