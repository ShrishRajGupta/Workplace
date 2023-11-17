import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    posts:[{
        type: Schema.Types.ObjectId,
        default:[],
        ref:"Post"
    }],
    workExperience:{
        type: String,
       
    },
    Education:{
        type: String,
    
    },
    Skills:[{
        type: String,
    }],
    About:{
        type: String,
    }

},
    {
        timestamps: true
    }
)
export default model("UserDB",userSchema);