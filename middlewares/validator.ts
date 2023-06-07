import { validationResult } from 'express-validator';
import { Response, NextFunction } from 'express';
import { IRequest } from '../Interfaces/IRequest';


const validateResults = (req: IRequest, res: Response, next: NextFunction) => { 
    try {
      validationResult(req).throw();//valida
      return next(); // sino existe un error en la validación, continua con el controlador
    } 
    catch (error:any) {
      res.status(400);
      res.send({ errors: error.array() });
    }
}
export default validateResults;