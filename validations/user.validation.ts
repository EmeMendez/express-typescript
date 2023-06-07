import { check  } from 'express-validator';
import { Response, NextFunction } from 'express';
import { IRequest } from '../Interfaces/IRequest';
import { Role } from '../enums/Role';
import validateResults from '../middlewares/validator';
import User from '../models/user';
import validateFiles from '../middlewares/validator-files';

const validUser = async (id:string) => {
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        throw new Error('El id no es válido')
    }
    const existingUser = await User.findOne({ '_id': id }); 
    if(!existingUser){
            throw new Error('El id no es válido')
    }
}

export const getUsersValidation = [
    check('limit')
    .isNumeric().withMessage("El campo limit debe ser un número"),

    check('offset')
    .isNumeric().withMessage("El campo offset debe ser un número"),

    check('is_active')
    .isBoolean().withMessage("El campo is_active debe ser un boleano"),  

    (req:IRequest, res: Response, next:NextFunction) => validateResults(req, res, next)
];

export const createUserValidation = [
    check('name')
    .notEmpty().withMessage("El nombre es requerido"),

    check('lastname')
    .notEmpty().withMessage("El apellido es requerido"),

    check('email')
    .notEmpty().withMessage("El email es requerido")
    .isEmail().withMessage("El correo eletrónico no tiene un formato válido")
    .custom(async (email) => {
        const existingUser = await User.findOne({ email }); 
        if (existingUser) {
            throw new Error('El email ya ha sido registrado');
        }
    }),

    check('password')
    .isLength({ min: 6 }).withMessage("La contrasena no puede ser menor a 6 dígitos"),

    check('role')
    .isIn([Role.ADMIN, Role.USER]).withMessage("El rol no es válido"),

    (req:IRequest, res: Response, next:NextFunction) => validateResults(req, res, next)
];

export const getUserValidation = [
    check('id')
    .custom(validUser),

    (req:IRequest, res: Response, next:NextFunction) => validateResults(req, res, next)
];

export const updateUserValidation = [
    check('name')
    .notEmpty().withMessage("El nombre es requerido"),

    check('lastname')
    .notEmpty().withMessage("El apellido es requerido"),

    check('role')
    .isIn([Role.ADMIN, Role.USER]).withMessage("El rol no es válido"),

    check('id')
    .isMongoId()
    .withMessage("El id no es válido")
    .custom(validUser),
    check('email').notEmpty().isEmail()
    .custom(async (email, {req}) => {
        const id: string = req?.params?.id;
        if(!id.match(/^[0-9a-fA-F]{24}$/)) return
        const existingUser = await User.findOne({ 'email': email }); 
        if(existingUser){
            if (existingUser._id.toString() != id) {
                throw new Error('El correo ya se encuentra registrado')
            }
        }
    }),
    (req:IRequest, res:Response, next:NextFunction) => validateResults(req, res, next)
];

export const deleteUserValidation = [
    check('id')
    .custom(validUser),
    (req:IRequest, res:Response, next:NextFunction) => validateResults(req, res, next)
];

const filedName:string =  'avatar';
const isFieldRequired:boolean = true;
const allowedExtensions:string[] = ['png','jpg','jpeg','gift'];

export const createUserValidationFiles  = validateFiles(filedName,isFieldRequired, allowedExtensions);
