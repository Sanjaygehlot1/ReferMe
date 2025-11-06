import mongoose from 'mongoose';
import { app } from '../index.ts';
import { envConfig } from '../../config/env.ts';


export const connectDB = async () =>{
    try {
        console.log("Connecting to MongoDB",process.env.MONGO_URI)
        const connection = await mongoose.connect(process.env.MONGO_URI as string)
        if(connection.connections[0]!.readyState === 1){
            console.log("Connected to MongoDB")
            app.listen(envConfig.PORT || 8000, ()=>{
                console.log(`Server is running on port ${envConfig.PORT}`)
            })
        }
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}