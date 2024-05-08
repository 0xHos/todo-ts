import { User } from "../types";

export interface UserDao{
    createUser(user:User):Promise<void>;
    deleteUserById(id:string):Promise<void>;
    updateUserById(id:string):Promise<User | undefined>;
    getUserByIdById(id:string):Promise<User | undefined>;
    getUserByUsername(username:string):Promise<User | undefined>;

}