import dotenv from "dotenv";
dotenv.config();

interface IConfig {
    NODE_ENV:string,
    PORT:number,
    MONGO_URI:string,
    PRIVATE_KEY:string
}
const config: IConfig = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: Number(process.env.PORT) || 3000,
    MONGO_URI: process.env.MONGO_URI || '',
    PRIVATE_KEY: process.env.PRIVATE_KEY || ''
}

export default config
