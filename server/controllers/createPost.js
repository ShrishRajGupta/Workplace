import BlogDB from '../models/postModel.js';

const newPost = async function(req,res){
    const {jobTitle,companyName,workPlace,jobLocation,jobType,salary} = req.body;
    
    let post = await BlogDB.create({
        jobTitle: jobTitle,
        companyName:companyName,
        workPlace:workPlace,
        jobLocation:jobLocation,
        jobType:jobType,
        salary:salary
    });

    console.log(post);
};

export default newPost;