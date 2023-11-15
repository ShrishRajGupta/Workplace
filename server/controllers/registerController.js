const { checkF } = require('../middlewares/generateJWT');
const UserDB = require("../models/userModel");
const bcrypt = require("bcrypt");
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
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) 
        return res.status(400).json({ error: 'Please provide all required fields.' });

        //Checking DB for unique Admin
        // const existingUser = await UserDB.findOne({ email:email });
        // console.log(existingUser);
        // if (existingUser)
        // return res.status(400).json({ error: 'User with this email already exists.' });

        // hashing and salting password
        let salt = bcrypt.genSaltSync(10);
        let hashPasscode = bcrypt.hashSync(password, salt);

        // Storing data of user
        const member = await UserDB.create({
            username, email, password: hashPasscode,
        });

        // Token generation and storage
       
        console.log(checkF(member));
    
        return res.cookie("authorization", checkF(member), {httpOnly: true,
                secure: true,
            }).status(200).json({ message: 'Registration successful!' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({msg:"Server error REGISTER"}) // render 500
    }
}

module.exports= { getRegisterForm, registerUser };
