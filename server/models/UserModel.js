import { Schema, model } from "mongoose";

const userSchema =  Schema({
    username:{
        type: String,
        required:[true,"Enter your username"],
        unique:true
    },
    name:{
        type: String,
        required:[true,"Enter your name"]
    },
    email:{
        type: String,
        required:[true,"ENTER YOUR EMAIL"]
    },
    backgrndimg:
    {
        data: Buffer,
        contentType: String
    },
    password:{
        type:String,
        required:[true,"Enter your Password"]
    },
    googleId:{
        type:String
    },
    about:{
        type:String
    },
    workexperience:{
        type:String
    },
    skills:{
        type:String
    },
    followers: [{ 
        type: Schema.Types.ObjectId,
         ref: 'UserDB' 
        }],
    following: [{ 
        type: Schema.Types.ObjectId,
        ref: 'UserDB' 
    }]
},{
    timestamps:true
});

export default model("UserDB",userSchema);