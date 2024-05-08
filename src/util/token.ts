import jwt from 'jsonwebtoken';
export class Token{

    static createToken(payload:object):string{
        return jwt.sign(payload,process.env.JWT_SECRET_KEY! , {expiresIn:'1h'})
    }
    static checkToken(token:string){
        let isverify = jwt.verify(token,process.env.JWT_SECRET_KEY!);
        return isverify;
    }

}