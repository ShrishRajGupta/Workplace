import UserDB from "../models/userModel.js";
import BlogDB from "../models/postModel.js";

const searchApi = async (req, res) => {
  const value = req.params.value.toLowerCase();
  const { jobTitle, companyName, workPlace, jobLocation, jobType } = req.query;
  let qObj = {};
  if (jobTitle) qObj.jobTitle = { $regex: jobTitle, $options: "i" };
  if (companyName) qObj.companyName = { $regex: companyName, $options: "i" };
  if (jobLocation) qObj.jobLocation = { $regex: jobLocation, $options: "i" };
  if (workPlace) qObj.workPlace = workPlace;
  if (jobType) qObj.jobType = jobType;

  try {
    let users = await UserDB.find({
      username: {
        $regex: ".*" + value + ".*",
        $options: "i",
      },
    });
    let result = await BlogDB.find(qObj);
    users = users.concat(result);

    if (users)
      res.status(200).json({
        message: "Found users",
        user: users,
      });
    else {
      res.status(200).json({
        message: "No users found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Search Api Failure",
    });
  }
};

const displayAllPost= async(req,res)=>{
    const posts = await BlogDB.find({});
     console.log(posts);
    try{
        if(posts){
            res.status(200).json({
                message:"posts Retrieved",
                posts:posts
            })
        }else{
            res.status(400).json({
                message:"Unable to retreive posts"
            })
        }
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:"internal Server error"
        })
    }
}

export { searchApi,
    displayAllPost };
