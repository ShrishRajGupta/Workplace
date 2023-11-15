import BlogDB from "../models/postModel.js";

const createPost = async function(req,res){
    const {jobTitle,companyName,workPlace,jobLocation,jobType,salary} = req.body;
    
    // let post = await create({
    //     jobTitle: jobTitle,
    //     companyName:companyName,
    //     workPlace:workPlace,
    //     jobLocation:jobLocation,
    //     jobType:jobType,
    //     salary:salary
    // })

    // console.log(post);
    res.send("post created");
};

export default createPost;