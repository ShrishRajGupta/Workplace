

// @desc    Get register form
// @route   GET /user/register
// @access Public
const getRegisterForm = (req, res) => {
    res.json({msg:"register form"});
}

// @desc    Register user
// @route  POST /user/register
// @access Public
const registerUser = async (req, res) => {
    res.send("user created");
}

export  { getRegisterForm, registerUser };
