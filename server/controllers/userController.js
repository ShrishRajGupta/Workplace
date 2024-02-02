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
