import Router from "express";
import UserDB from "../models/userModel.js";
import BlogDB from "../models/postModel.js";
import authenticateToken from "../middlewares/validateJWT.js";
const mainRouter = Router();
//@desc search Bar get request to search user
//@route /search/:username
mainRouter.get("/search/:username",async function(req,res){
        const username = req.params.username.toLowerCase();
        try{
            
               const users = await UserDB.find({"username": {$regex:username,$options:"i"}});
            if(users)
            res.status(200).json({
                message: "Found users",
                user:users
            })
            else{
                res.status(200).json({
                    message:"No users found"
                })
            }
        }
        catch(err){
            console.log(err);
        }
});
import { displayAllPost, searchApi } from "../controllers/searchBarApi.js";
// const mainRouter = Router();

mainRouter.get("/search/:value",searchApi);

//@desc to get another user profile through userid
mainRouter.get("/user/profile/:userid",authenticateToken,async function(req,res){
    const userid = req.params.userid.toString();
        try{
            const user = await UserDB.findOne({"_id":userid});
            console.log(user);
            if(user){
                res.status(200).json({
                    message:"user info retrieved success",
                    user: user
                })
            }
            else{
                res.status(404).json({
                    message: "User not found",
                  });
            }
        }
        catch(err){
            
            res.status(500).json({
                message:"Internal Server error",
            })
        }
})

//@desc to get all user posts
//@route /home

mainRouter.get('/home', displayAllPost )


export default mainRouter;