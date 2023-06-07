import { Response } from "express";
import bcrypt from 'bcryptjs';
import User from '../models/user';
import { IUser } from "../Interfaces/IUser";
import { IRequest } from "../Interfaces/IRequest";
import { saveFile } from '../helpers/handler-files';
import { UploadedFile } from "express-fileupload";

export default class UserController {

    constructor(){}

    async getUsers(req:IRequest, res:Response): Promise<any> {        
        const limit:number          = Number(req.query.limit);
        const offset:number         = Number(req.query.offset);
        const isActiveQuery:string  = String(req.query.is_active);
        const is_active:boolean     = (isActiveQuery.toLowerCase() == 'true') ? true : false;

        const total:number          = await User.count({is_active});
        const users:Array<IUser>    = await User.find({is_active})
        .skip(offset)
        .limit(limit);

        res.json({
            'user': req.user,
            total,
            users
        });
    }

    async getUser(req:IRequest, res:Response): Promise<any> {
        const id:string = req.params.id;
        const user: IUser|null = await User.findOne({ '_id': id });
        res.json(user);
    }
    
    async createUser(req: IRequest, res:Response){
        const salt = bcrypt.genSaltSync();
        const newUser:IUser = {
            name:               req.body.name,
            lastname:           req.body.lastname,
            email:              req.body.email,
            password:           bcrypt.hashSync( req.body.password, salt),
            role:               req.body.role,
            is_active:          true,
            avatar:             saveFile(req.files?.avatar as UploadedFile,'/users/avatars'),
            created_in_google:  false
        };

        const user = new User(newUser);
        await user.save();
        res.status(201).json(user);
    } 

    async updateUser(req: IRequest, res:Response) : Promise<any>{
        const id:string = req.params.id;
        const data = {
            name:               req.body.name,
            lastname:           req.body.lastname,
            email:              req.body.email,
            role:               req.body.role,
        }        
        await User.findByIdAndUpdate(id, data);
        const user:IUser|null= await User.findOne({ '_id': id });
        res.status(200).json(user);
    } 

    async deleteUser(req: IRequest, res:Response) : Promise<any>{
        const id:string         = req.params.id;
        const isActive:boolean  = false;
        await User.findByIdAndUpdate(id, { is_active: isActive });
        res.status(204).json();
    } 

    validateAvatar(req: IRequest, res:Response){
        // const errors = [];
        // if(!req.files){
        //     errors.push({
        //         type: "field",
        //         msg: 'El avatar es requerido',
        //         path: "avatar",
        //         location: "files"
        //     });
        //     res.status(400).json(errors);
        // }
        // res.status(200).json();
    }

}