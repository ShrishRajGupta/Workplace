import UserDB from "../models/userModel.js";

// @desc : Get dashboard of user
// @route : GET /in/update/:username/:typeId
// @type : post request
const updateInfo = async (req, res) => {
  const { username } = req.params;

  const { name, about } = req.body;
  try {
    const user = await UserDB.findOne({ username: username });
    if (!user) 
      return res.status(404).json({ msg: "User not found" });
    if (name !== undefined && name !== null && name !== "") 
      user.name = name;
    if (about !== undefined && about !== null && about !== "")
      user.about = about;

    await user.save();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error" });
  }

  // console.log(req.body);
  return res.status(200).json({ message: "success",name,about });
};

const addEducation = async (req, res) => {
  const { username } = req.params;
  username.toString();
  console.log(username);
  // console.log(req.body);
  const { collegeName, degree, year } = req.body;
  try {
    const user= await UserDB.findOne({ "username": username});
    if (!user) 
      return res.status(404).json({ msg: "User not found" });
    user.education.push({ collegeName, degree, year });
    await user.save();
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error" });
  }
  return res.status(200).json({ message: "success" });
}

const addWorkEx = async (req,res) =>{
  const { username } = req.params;
  console.log(req.body);
  const { companyName, year } = req.body;
  try {
    const user= await UserDB.findOne({ username: username});
    if (!user) 
      return res.status(404).json({ msg: "User not found" });
    user.workexperience.push({ companyName, year });
    await user.save();
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error" });
  }
  return res.status(200).json({ message: "success" });

}

const addSkills = async (req,res) =>{
  const { username } = req.params;
  console.log(req.body);
  const { description } = req.body;
  try {
    const user= await UserDB.findOne({ username: username});
    if (!user) 
      return res.status(404).json({ msg: "User not found" });
    user.skills.push({ description });
    await user.save();
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error",description });
  }
  return res.status(200).json({ message: "success" });

}

export { updateInfo,
addEducation,
addWorkEx,
addSkills };
