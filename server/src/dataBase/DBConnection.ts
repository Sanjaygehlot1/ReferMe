import mongoose from 'mongoose';
import { app } from '../index.ts';


export const connectDB = async () =>{
    try {
        console.log("Connecting to MongoDB",process.env.MONGO_URI)
        const connection = await mongoose.connect(process.env.MONGO_URI as string)
        if(connection.connections[0]!.readyState === 1){
            console.log("Connected to MongoDB")
            app.listen(process.env.PORT || 8000, ()=>{
                console.log(`Server is running on port ${process.env.PORT}`)
            })
        }
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}