
import { v4 as uuid } from 'uuid';
import path from 'path';
import { UploadedFile } from 'express-fileupload';
import fs from 'fs';

const saveFile = ( file:UploadedFile, destinyFolder:string = '' ) => {
    const folder = destinyFolder.startsWith('/') 
    ? destinyFolder.replace('/', '') 
    : destinyFolder;

    const [fileExtension]: string[] = file.name.split('.').slice(-1) 
    const fileName:string   = `${uuid()}.${fileExtension}`;
    let uploadPath:string = path.join(__dirname,`../storage/${folder}`,fileName);
    // uploadPath = uploadPath.replace("\\dist", '');
    
    const indexOfUploadPath:number  = uploadPath.indexOf("\\storage");
    const fileDestiny:string          = `${uploadPath.substring(indexOfUploadPath).replaceAll("\\",'/')}`;
    file.mv(uploadPath, function(err:any) {
        if (err){
            console.log(err);
        }
        else{
            console.log('file created');
        }
      });
    return fileDestiny;
}

const deleteFile = (path:string) :boolean => {
    if (fs.existsSync(path)) {
        fs.unlink(path,(err) => {
            if (err) throw err;
            return true;
        });
    }
    return false;
}

export { saveFile,deleteFile };
