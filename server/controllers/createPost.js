const postModel = require("../models/postModel");

const createPost = async function(req,res){
    const {jobTitle,companyName,workPlace,jobLocation,jobType,salary} = req.body;
    
    let post = await postModel.create({
        jobTitle: jobTitle,
        companyName:companyName,
        workPlace:workPlace,
        jobLocation:jobLocation,
        jobType:jobType,
        salary:salary
    })

    console.log(post);
};

module.exports = createPost;