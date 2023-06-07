import express, { Application } from  'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import configCors from '../config/cors';
import config from '../config/config';
import UserRouter from '../routes/users.routes';
import AuthRouter from '../routes/auth.routes';
import mongoConnection from '../config/database';
import fileUpload from 'express-fileupload';

export default class Server {
    private app:Application;
    private port:number;

    constructor(){
        this.app    = express();
        this.port   = config.PORT;
        this.databaseConnect();
        this.middlewares();
        this.routes();
        this.listen();
    }

    middlewares():void{
        this.app.use(cors(configCors));
        this.app.use(express.json());
        this.app.use('/storage',express.static(path.join(__dirname, '../storage')));        
        this.createStorageLink();
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    listen(): void{
        this.app.listen( this.port, () => {
            console.log( `server started at http://localhost:${ this.port }` );
        } );
    }

    routes():void{
        this.app.use('/api/users', UserRouter);
        this.app.use('/api/auth', AuthRouter);
    }

    async databaseConnect(){
        await mongoConnection();
    }

    createStorageLink(){  
        if(config.NODE_ENV === 'development'){
            // if (!fs.existsSync(path.join(__dirname, "../../storage"))) {
            //     console.log('lo crea');
            //     fs.symlink(path.join(__dirname, "../storage"),
            //     "storage", 'dir', (err) => {
            //     if (err)
            //     console.log(err);
            //     else {
            //     console.log("Symlink is a directory:",fs.statSync("storage").isDirectory());
            //     }
            //     });
            // }
        }      

    }
}