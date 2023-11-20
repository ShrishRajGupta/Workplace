import Router from "express";
import createPost from "../controllers/createPost.js";
import UserDB from "../models/userModel.js";
import BlogDB from "../models/postModel.js";
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
userRouter.post('/jobpostform',authenticateToken,createPost);
userRouter.get('/allposts',authenticateToken,async function(req,res){
        
        try{
            let currentUser_id = req.user.id;
            const allPosts = await BlogDB.find({"user_id": currentUser_id});
            if(allPosts){
                return res.status(200).json({
                    message: "All Posts Recovered",
                    allposts: allPosts
                });
            }else{
                return res.status(200).json({
                    message:"User dont have post"
                });
            }
        }
        catch(err){
            console.log(err);
        }
});
userRouter.get("/profile/:username/connect",authenticateToken,async function(req,res){
    try {
        const friends_username = req.params.username.toString();
        const user_id = req.user.id;
        const existingUser = await UserDB.findOne({"_id": user_id});
        const friend = await UserDB.findOne({ "username": friends_username });
      
        existingUser.friends.push(friend._id);
        friend.friends.push(existingUser._id);
      
        // Save changes to the database
        await Promise.all([existingUser.save(), friend.save()]);
      
        console.log(existingUser);
        res.status(200).json({
          message: "Friends connected",
          user: existingUser
        });
      } catch (err) {
        console.log(err);
      }
        
});
// testing route
userRouter.get('/testing',authenticateToken,async function(req,res){
    console.log(req.user);
    res.json({
        message: "testing done"
    })
});

export default userRouter;

