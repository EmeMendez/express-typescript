import { Response } from 'express';
import generateJWT from '../helpers/generate-jwt';
import User from '../models/user';
import { IRequest } from '../Interfaces/IRequest';

export default class AuthController {

    constructor(){}

    async login ( req:IRequest, res:Response ) :Promise<any> {
        try{
            const email:string  = req.body.email;
            const user          = await User.findOne({ email });
            if(user){
                const token:string = await generateJWT(user.id);
                res.json({ user, token })
            }
        }
        catch(error){
            console.log(error);
            res.status(500).json({
                msg: 'Error interno, por favor comuniquese con el administrador'
            });
        }
        
    };

}


