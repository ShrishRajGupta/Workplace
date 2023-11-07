// Desc: connect to mongoDB
import dotenv from "dotenv";
dotenv.config();

import { connect as _connect } from "mongoose";
const connectDB= async ()=>{
    try{
        const connect= await _connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        
        }).then(() => {
            console.log("db connection success: ");                   
        })
    }
    catch(err){
        console.log(err);
    }
};

export default connectDB;
