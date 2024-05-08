import bcrypt from 'bcrypt';
export class Password{
    static async hashPassword(password:string):Promise<string>{
        const salt = await bcrypt.genSalt(1);
        return await bcrypt.hash(password,salt);
    }

    static async checkHashPassword(password:string , passwordhash:string):Promise<boolean>{
        return await bcrypt.compare(password,passwordhash);
    }
}