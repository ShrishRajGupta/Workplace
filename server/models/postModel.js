import { Schema, model } from "mongoose";

const postSchema = Schema({
        user_id:{
            type: Schema.Types.ObjectId,
            ref:"User"
        },
        jobTitle:{
            type: String
        },
        companyName:{
            type:String
        },
        workPlace:{
            type:String
        },
        jobLocation:{
            type: String
        },
        jobType:{
            type: String
        },
        salary:{
            type: Number
        }
});
export default model("BlogDB",postSchema);