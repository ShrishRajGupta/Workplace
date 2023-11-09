
// @desc    Get register form
// @route   GET /user/register
// @access Public
const getRegisterForm = (req, res) => {
    res.json({msg:"register form"});
}

// @desc    Register user
// @route  POST /user/register
// @access Public
const registerUser = (req, res) => {
    res.send('register user');
}

export { getRegisterForm, registerUser };
