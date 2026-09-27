import mongoose from "mongoose";
export const db = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DATABASE CONNECTED!");
    }catch(err){
        console.log(err.message);
        process.exit(1);
    }
};