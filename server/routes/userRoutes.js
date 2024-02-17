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


//@desc to get another user profile through userid
userRouter.get("/profile/:userid",async function(req,res){
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

// 
userRouter.get("/profile/:userid/connect",authenticateToken,async function(req,res){
    try {
        const friends_userid = req.params.userid.toString();
        const user_id = req.user.id;
        const existingUser = await UserDB.findOne({"_id": user_id}).populate('friends');
        const friend = await UserDB.findOne({ "_id": friends_userid }).populate('friends');
        // const existingRequest = await User.findOne({
        //     "_id": user_id,
        //     "existingUser.friends._id": friends_userid,
        //   });
      
        //   if (existingRequest) {
        //     return res.json({ success: false, message: 'Connection request already sent.' });
        //   }
        if(user_id === friends_userid){
            return res.json({ success: false, message: 'Same User' })
        }
        existingUser.friends.push(friend);
        friend.friends.push(existingUser);
      
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

userRouter.get("/mail",async function(req,res){
    console.log("mail route");
    res.json({
        message:"mail route"
    })
});


//@desc get all friends
//@route /user/:friendID
userRouter.get("/:friend_id",async function(req,res){
    const friend_id = req.params.friend_id.toString();
    try{
        const friend = await UserDB.findOne({"_id": friend_id});
        res.status(200).json({
            message: "Friends retrieved success",
            user: friend 
        })
    }
    catch(err){
        console.log(err);
    }
})
//@desc to do conversation b/w two connections
//@route /messenger

// testing route
userRouter.get('/testing',authenticateToken,async function(req,res){
    console.log(req.user);
    res.json({
        message: "testing done"
    })
});

export default userRouter;

