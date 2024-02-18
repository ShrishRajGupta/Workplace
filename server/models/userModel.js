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
    education:[{
        collegeName:{
            type:String,
            default: ''
        },
        degree:{
            type:String,
            default: ''
        },
        year:{
            type:String,
            default: ''
        }
    }],
    workexperience:[{
        companyName:{
            type:String,
            default:''
        },
        year:{
            type:String,
            default:''
        }
    }
    ],
    skills:[{
        description:{
            type:String,
            default:''
        }
    }],
    friends:[{
        type: Schema.Types.ObjectId,
        default:[],
        ref:"UserDB"
    }],
    friendRequests:[{
        from:{
            type: Schema.Types.ObjectId,
            default:[],
            ref:"UserDB"
        },
        to:{
            type: Schema.Types.ObjectId,
            default:[],
            ref:"UserDB"
        },
        status:{
            type:String,
            enum:['pending','accepted','rejected']
        },
        username:{
            type:String,
        }
    }]
},{
    timestamps:true
});

export default model("UserDB",userSchema);