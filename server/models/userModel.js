const mongoose= require("mongoose");

const userSchema = new mongoose.Schema({
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
       
    },
    posts:[{
        type: mongoose.Schema.Types.ObjectId,
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
module.exports = mongoose.model("UserDB",userSchema);