import UserDB from "../models/userModel.js";

// @desc : Get dashboard of user
// @route : GET /in/:username
const getDashboard = async (req, res) => {
    const username=req.params.username.toString();
    let user;
    try {
        user = await UserDB.findOne({username:username});
        if(!user)
            return res.status(404).json({msg:"User not found"});
        
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"Server error"});
    }    
    console.log(user);
    return res.status(200).json(user);
};

// @desc : --------For Testing Only--------
// @route : POST /in/populate
const populateDashboard = async (req, res) => {
    const { username,name, email, password } = req.body;

    const form= await UserDB.create({
        username,name,email,password
    });

    res.status(200).json({ msg: "populateDashboard" });
};

export {
    getDashboard,
    populateDashboard
    
};
// import UserDB from "../models/userModel.js";
import BlogDB from "../models/postModel.js";
// Create profile
const createProfile = async function(req,res){
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
    
};
// Profile page
const Profile = async function(req,res){
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

};

const allposts = async function(req,res){
        
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
};

const connectFriends = async function(req,res){
    try {
        const friends_userid = req.params.userid.toString();
        const user_id = req.user.id.toString();
        const existingUser = await UserDB.findById({"_id": user_id}).populate('friends');
        const friend = await UserDB.findById({ "_id": friends_userid }).populate('friends');
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
        const FriendRequest = {
            from:user_id,
            to:friends_userid,
            status:'pending',
            username: existingUser.username
        }
        friend.friendRequests.push(FriendRequest);
        // Save changes to the database
        await Promise.all([existingUser.save(), friend.save()]);
        res.status(200).json({
          message: "Friends connected",
          user: existingUser
        });
      } catch (err) {
        console.log(err);
      }
        

};

const friends = async function(req,res){
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
};

export {createProfile,Profile,allposts,connectFriends,friends};