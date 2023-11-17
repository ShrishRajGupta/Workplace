import Router from "express";
import createPost from "../controllers/createPost.js";
import UserDB from "../models/userModel.js";
import authenticateToken from "../middlewares/validateJWT.js";
const userRouter = Router();

//route begins with /user

userRouter.post('/createProfile',authenticateToken,async function(req,res){
        const {username,About,Education,workExperience,Skills} = req.body;
        
        try{
            let user_id = req.user.id;
            
        const new_data = {
           "$set": {
            "username": username,
            "About": About,
            "Education": Education,
            "workExperience": workExperience,
            "Skills": Skills
           }
        };
        const updatedUser = await UserDB.findOneAndUpdate({"_id" : user_id},new_data);
        console.log(updatedUser);
        if(updatedUser){
            return res.status(200).json({
                success:true,
                message:"Profile created Successfully",
                user:updatedUser
            })
        }else{
            return console.log("ERROR");
        }
        }
        catch(err){
            console.log(err);
            res.status(400).json({
                success:false,
                message:"error while creating Profile"
            })
        }
        
});
userRouter.get("/profile",authenticateToken,async function(req,res){
        try{
            let user_id = req.user.id;
            let matchedUser = await UserDB.findOne({"_id": user_id});

            if(matchedUser){
                return res.status(200).json({
                    success: true,
                    message:"User Profile",
                    user: matchedUser
                })
            }
        }
        catch(err){
            console.log(err);
        }
    
});
userRouter.route('/jobpostform').post(createPost);

// testing route
userRouter.get('/testing',authenticateToken,async function(req,res){
    console.log(req.user);
    res.json({
        message: "testing done"
    })
});

export default userRouter;

