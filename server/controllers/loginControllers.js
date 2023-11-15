

// @desc    Get login form
// @route   GET /user/login
// @access  Public
const getLoginForm = (req, res) => {
    res.json({msg:"login form"});
};

// @desc    Login user
// @route   POST /user/login
// @access  Public
const loginUser = (req, res) => {
    res.send('login user');
}

// @desc    Logout user
// @route   GET /user/logout
// @access  Public
const logoutUser = (req, res) => {
    res.send('logout user');
}

module.exports= { getLoginForm, loginUser, logoutUser };
