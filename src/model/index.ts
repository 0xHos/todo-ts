import { TaskDao } from "./dao/taskDao";
import { UserDao } from "./dao/userDao";
import { SqlDataBase } from "./sql";
import mssql from 'mssql';


export interface DataStore extends UserDao , TaskDao{}

export async function initSql(){
    try{
        await mssql.connect(process.env.DB_CONFIG!);
        console.log("done connected to database")
    }catch(err){
        console.log(err);
        process.exit();
    }
}

export const db:DataStore = new SqlDataBase();
