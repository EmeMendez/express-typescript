import { NextFunction, Response } from "express";
import { IRequest } from "../Interfaces/IRequest";
import { IError } from "../Interfaces/IError";

import { UploadedFile, FileArray } from 'express-fileupload';

const validateFiles = (fieldName:string, isFileRequired:boolean, allowedExtensions:string[]) => {

    return (req:IRequest, res:Response, next:NextFunction) => {
        console.log('entro');
        
        try {
            const errors:IError[] = [];
            if(req.files){
                const files:FileArray = req.files;
                const file =  files[fieldName] as UploadedFile;
                if(!file && isFileRequired){
                    errors.push({
                        type: "field",
                        msg: `El campo ${fieldName} es requerido`,
                        path: fieldName,
                        location: "files"
                    });
                }
                else{
                    const  [ imageExtension ]: string[] = file.name.split('.').slice(-1);                
                    if(!allowedExtensions.includes(imageExtension)){
                        errors.push({
                            type: "field",
                            msg: `La extensión del campo ${fieldName} no es válida, solo se permite ${allowedExtensions}`,
                            path: fieldName,
                            location: "files"
                        });
                    }  
                }
            }
            else{
                errors.push({
                    type: "field",
                    msg: `El campo ${fieldName} es requerido`,
                    path: fieldName,
                    location: "files"
                });
            }
    
            if(errors.length > 0){
                res.status(400).json({errors});
            }
            return next();
           
        } catch (error) {
            return res.status(500).json({
                msg: 'Ocurrió un error interno, por favor contacte con el Administrador'
            });
        }
    }
}
export default validateFiles;