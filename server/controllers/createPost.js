import BlogDB from '../models/postModel.js';
import UserDB from "../models/userModel.js";

const newPost = async function(req,res){
    const {jobTitle,companyName,workPlace,jobLocation,jobType,salary} = req.body;
    try{
        let currentUser_id = req.user.id;
        const currentUser = await UserDB.findOne({"_id": currentUser_id});
        let post = await BlogDB.create({
            user_id:currentUser_id,
            jobTitle: jobTitle,
            companyName:companyName,
            workPlace:workPlace,
            jobLocation:jobLocation,
            jobType:jobType,
            salary:salary
        });
        await post.save();
        currentUser.posts.push(post);
        await currentUser.save();
        console.log(post);
        return res.status(200).json({
            message:"Post created SuccessFully"
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
};

export default newPost;