import mongoose from "mongoose"
import { ENV } from "./env.js";

export const connectDB= async()=>{
    try{
        const conn= await mongoose.connect(ENV.MONGO_URI)
        console.log("MONGODB CONNECTED",conn.connection.host);
    }catch(error){
        console.error("Error in connecting to MongoDB",error);
        process.exit(1);
    }
}