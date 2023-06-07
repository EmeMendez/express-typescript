import mongoose,{ ConnectOptions } from 'mongoose';
import config from '../config/config';

const mongoConnection = async () :Promise<any> =>{
    const useNewUrlParser:boolean       = true;
    const useUnifiedTopology:boolean    = true;
    try {
        await mongoose.connect( config.MONGO_URI, { useNewUrlParser,useUnifiedTopology } as ConnectOptions);
		console.log('Database online');

    } catch (error) {
        console.error(error);
        throw new Error('Error trying to start database connection');
    }
}

export default mongoConnection;