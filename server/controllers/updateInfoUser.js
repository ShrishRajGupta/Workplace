import UserDB from "../models/UserModel.js";

// @desc : Get dashboard of user
// @route : GET /in/update/:username/:typeId
// @type : patch request
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
  return res.status(200).json({ message: "success" });
};

export { updateInfo };
