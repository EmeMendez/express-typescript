import { NextFunction, Response } from 'express';
import jwt from'jsonwebtoken';
import config from '../config/config';
import { IJwtPayload } from '../Interfaces/IJwtPayload';
import { IRequest } from '../Interfaces/IRequest';
import User from '../models/user';

const validatorJWT =  async ( req:IRequest, res:Response, next:NextFunction) : Promise<any>=> {
    const token:string = req.header('x-token') ?? '';

    if(!token){
        return res.status(401).json({ msg: 'Unauthorized'});
    }
    try {
        const { uuid }  = jwt.verify(token, config.PRIVATE_KEY) as IJwtPayload;
        const user      = await User.findById(uuid);
        if(!user){
            return res.status(401).json({ msg: 'Unathorized'});
        }
        if(!user.is_active){
            return res.status(401).json({msg: 'Unauthorized'});
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ msg: 'Unauthorized'});
    }
};

export default validatorJWT;