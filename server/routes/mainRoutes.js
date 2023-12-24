import Router from "express";
import UserDB from "../models/userModel.js";
import BlogDB from "../models/postModel.js";
import { displayAllPost, searchApi } from "../controllers/searchBarApi.js";
const mainRouter = Router();

mainRouter.get("/search/:value",searchApi);

//@desc to get another user profile through userid
mainRouter.get("/user/profile/:userid",async function(req,res){
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