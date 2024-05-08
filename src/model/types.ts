export interface User{
    user_id:string;
    username:string;
    password:string;
}

export interface Task{
    task_id:string;
    user_id:string;
    title:string;
    content:string;
    poastedAt:string;
}