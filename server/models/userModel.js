import { Schema, model } from "mongoose";

const userSchema = new Schema({
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
        required:[true,"ENTER YOUR EMAIL"],
        unique:true,
        lowercase:true,
        trim:true
    },
    photo:
    {
        type:String,
        default: ''
    },
    password:{
        type:String,
        default: '',
        select: false // never loaded unless explicitly asked for with .select('+password')
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
        ref:"UserDB"
    }],
    friendRequests:[{
        from:{
            type: Schema.Types.ObjectId,
            ref:"UserDB",
            required:true
        },
        to:{
            type: Schema.Types.ObjectId,
            ref:"UserDB",
            required:true
        },
        status:{
            type:String,
            enum:['pending','accepted','rejected'],
            default:'pending'
        },
        username:{
            type:String,
        }
    }],
    posts:[{
        type: Schema.Types.ObjectId,
        ref:"JobPost"
    }],
    // Resume builder state: { information, color, updatedAt }; shape owned by the client.
    resume:{
        type: Schema.Types.Mixed,
        default: null
    },
},{
    timestamps:true,
    toJSON: {
        transform(doc, ret) {
            delete ret.password; // belt-and-braces for documents loaded with +password
            return ret;
        }
    }
});

export default model("UserDB",userSchema);