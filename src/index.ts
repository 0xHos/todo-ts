import express, { RequestHandler } from 'express';
import dotenv from "dotenv";
import { initSql } from './model';
import { userRouter } from './router/userRouter';
import { taskRouter } from './router/taskRouter';
import { auth } from './middelware/auth';


dotenv.config();

initSql();

const app = express();

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);


app.listen(process.env.PORT, ()=>{
    console.log("server run")
})