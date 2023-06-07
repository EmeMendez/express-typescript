import jwt from 'jsonwebtoken';
import config from '../config/config';
import { IJwtPayload } from '../Interfaces/IJwtPayload';

const generateJWT = ( uuid:string ) :string => {
    const payload:IJwtPayload = { uuid };
    try {
        const token:string = jwt.sign(payload, config.PRIVATE_KEY, {
            expiresIn: '4h'
        });
        return token;
    } catch (error) {
        console.log(error);
        throw new Error('Error al intentar generar token');
        return '';
    }
}

export default generateJWT