const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
        user_id:{
            type: mongoose.Schema.Types.ObjectId,
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
module.exports = mongoose.model("BlogDB",postSchema);