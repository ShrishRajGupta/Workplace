
import checkF from '../middlewares/generateJWT.js';
import  BlogDB from "../models/userModel.js";
import { genSaltSync, hashSync } from "bcrypt";
import UserDB from "../models/userModel.js";
import bcrypt from "bcrypt";
// @desc    Get register form
// @route   GET /user/register
// @access Public
export const getRegisterForm = (req, res) => {
    res.json({msg:"register form"});
}

// @desc    Register user
// @route  POST /user/register
// @access Public
export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) 
        return res.status(400).json({ error: 'Please provide all required fields.' });

        // Checking DB for unique Admin
        const existingUser = await UserDB.findOne({ email:email });
        console.log(existingUser);
        if(existingUser){
            return res.status(400).json({ 
                success: false,
                message:"user already exist"
            });
        }
     
        // hashing and salting password
        let salt = genSaltSync(10);
        let hashPasscode = hashSync(password, salt);

        // Storing data of user
        const member = await UserDB.create({
            username, email, password: hashPasscode,
        });

        // Token generation and storage
       
        console.log(checkF(member));
    
        return res.cookie("authorization", checkF(member), {
                httpOnly: true,
                secure: true,
            }).status(200).json({ 
                success: true,
                message: 'Registration successful!',
                user: member
            });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({msg:"Server error REGISTER"}) // render 500
    }
}




// @desc    Get login form
// @route   GET /user/login
// @access  Public
export const getLoginForm = (req, res) => {
    res.json({msg:"login form"});
};

// @desc    Login user
// @route   POST /user/login
// @access  Public
//@desc = a post request to verify logged in user 
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please provide all required fields"
            })
        }
            


        //Checking DB for unique UserDB and passwd
        const user = await UserDB.findOne({ email: email });
        if (!user)
            return res.status(401).json({
                success: false,
                message:"user is not registered please register first"
            })

        const check = await bcrypt.compare(password, user.password);
        if (!check)
        return res.status(401).json({
            success: false,
            message:"Invalid Password"
        })
        // Generation of JWT
        if (user && check) {
            const token = checkF(user)
            return res
                .cookie("authorization", token, {
                    httpOnly: true,
                    secure: true,
                })
                .status(200).json({
                    success: true,
                    message:"logged in Successfully",
                    user: user
                });
        } else {
            res.status(401).json({
                success: false,
                message: "validation error"
            }); // redirect to register
            throw new Error('Validation Error');
        }
        // token generated
    }
    catch (err) {
        console.log(err); // render to 500
        res.status(500).json({ msg: "Server error" }) // render 500
    }
};

// @desc    Logout user
// @route   GET /user/logout
// @access  Public
export const logoutUser = (req, res) => {
    res.send('logout user');
}


