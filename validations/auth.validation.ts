import { check } from 'express-validator';
import bcrypt from 'bcryptjs';
import validateResults from '../middlewares/validator';
import User from '../models/user';
import { IRequest } from '../Interfaces/IRequest';
import { NextFunction, Response } from 'express';

export const loginValidation = [
    check('email')
    .notEmpty().withMessage('El correo electrónico es requerido')
    .isEmail().withMessage('El formato de correo electrónico no es válido')
    .custom(async (email, {req}) => {
        const user = await User.findOne({ email : email });
        if (!user) {
            throw new Error('El usuario no es válido');
        }
        if (!user.is_active) {
            throw new Error('El usuario no es válido');
        }
        if(user){
            const password:string       = req.body.password;
            const userPassword:string   = user.password ?? '';
            const isValidPassword       = bcrypt.compareSync(password, userPassword);
            if(!isValidPassword){
                throw new Error('El usuario no es válido');
            }

        }
    }),
    check('password').notEmpty().withMessage('La constraseña es obligatoria'),

    (req:IRequest, res:Response, next:NextFunction) => validateResults(req, res, next)
];

