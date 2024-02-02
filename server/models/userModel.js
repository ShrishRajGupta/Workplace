import { Schema, model } from "mongoose";

const userSchema = Schema({
    username:{
        type: String,
        required:[true,"Enter your username"],
        unique:true
    },
    name:{
        type: String,
        default: ''
    },
    email:{
        type: String,
        default: '',
        required:[true,"ENTER YOUR EMAIL"]
    },
    photo:
    {
        type:String,
        default: ''
    },
    password:{
        type:String,
        default: ''
        // required:[true,"Enter your Password"]
    },
    googleId:{
        type:String,
        default: ''
    },
    about:{
        type:String,
        default: ''
    },
    workexperience:{
        type:String,
        default: ''
    },
    skills:{
        type:String,
        default: ''
    },
    friends:[{
        type: Schema.Types.ObjectId,
        default:[],
        ref:"UserDB"
    }]
},{
    timestamps:true
});

export default model("UserDB",userSchema);