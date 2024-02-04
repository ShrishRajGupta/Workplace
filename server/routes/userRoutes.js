import Router from "express";
import createPost from "../controllers/createPost.js";
import UserDB from "../models/userModel.js";
import BlogDB from "../models/postModel.js";
import authenticateToken from "../middlewares/validateJWT.js";
import { createProfile,Profile,allposts,connectFriends,friends } from "../controllers/userController.js";
const userRouter = Router();

//route begins with /user

//@desc post request to create Profile
//@route /user/createProfile
userRouter.post('/createProfile',authenticateToken,createProfile);
//@desc get req to get user Profile
//@route /user/profile
userRouter.get("/profile",authenticateToken,Profile);
//@desc post req to createPost
//@route /user/jobpostform
userRouter.post('/jobpostform',authenticateToken,createPost);
//@desc get req to get allposts of a user
//@route /user/allposts
userRouter.get('/allposts',authenticateToken,allposts);
//@desc get req to send request
//@route /user/profile/:userid/connect
userRouter.get("/profile/:userid/connect",authenticateToken,connectFriends);
//@desc get req to connect with friends
userRouter.put("/connect/:userId/:friendsId/:status/:id", authenticateToken,async function(req,res){
    const userId = req.params.userId.toString();
    const friendsId = req.params.friendsId.toString();
    const status = req.params.status;
    const friendRequestsId = req.params.id.toString();
    console.log(userId,friendsId,status,friendRequestsId);
    try{
        const User = await UserDB.findById({"_id":userId}).populate()
        const Friend = await UserDB.findById({"_id":friendsId}).populate()
        console.log(Friend);
        if(status === "Accept"){
            // if(!Friend.friends.includes(userId)){
                await User.updateOne({
                    $push:{
                        friends: friendsId
                    }
                })
                await Friend.updateOne({
                    $push:{
                        friends: userId
                    }
                })
                const FriendRequest = {
                    // "_id":friendRequestsId,
                    from: userId,
                    to: friendsId,
                    status:'pending',
                    username: User.username
                }
                await Friend.updateOne({
                    $pull:{
                        friendRequests: FriendRequest
                    }
                },
                {
                    "new":true
                }
                )
                res.status(200).json({
                    message: "Request Accepted",
                    user: User
                })
            // }else{
            //     res.status(100).json({
            //         message: "Already Friend"
            //     })
            // }
        }
        else{   
            // Save changes to the database
            const FriendRequest = {
                // "_id":friendRequestsId,
                from: userId,
                to: friendsId,
                status:'pending',
                username: User.username
            }
            await Friend.updateOne({
                $pull:{
                    friendRequests: FriendRequest
                }
            },
            {
                "new":true
            }
            )
            await Friend.updateOne({
                $pull:{
                    friendRequests: friendRequestsId
                }
            })
            res.status(200).json({
                message:"Request Rejected",
                user: User
            })
        }
    }
    catch(err){
        console.log(err);
    }
})

//@desc get req all friends
//@route /user/:friendID
userRouter.get("/:friend_id",friends);

export default userRouter;

