import { NextFunction, Response } from "express";
import { IRequest } from "../Interfaces/IRequest";

const validateRole = (...roles:string[]) => {

    return (req:IRequest, res:Response, next:NextFunction) => {
        try {
            if(req.user){
                if(roles.includes(req.user.role)){
                    return next();
                }
            }
            return res.status(403).json({
                msg: 'Usuario no tiene los permisos necesarios'
            });
        } catch (error) {
            return res.status(500).json({
                msg: 'Ocurrió un error interno, por favor contacte con el Administrador'
            });
        }
    }
}
export default validateRole;