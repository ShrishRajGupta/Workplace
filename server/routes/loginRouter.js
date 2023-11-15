const Router = require("express");
const { getLoginForm, loginUser, logoutUser } = require('../controllers/loginControllers.js');
const createPost = require("../controllers/createPost.js");
const UserDB = require("../models/userModel.js");
const loginRouter = Router();

// route begins with 'user'
loginRouter.route('/login')
    .get(getLoginForm)
    .post(loginUser)

loginRouter.route('/logout')
    .get(logoutUser);

loginRouter.route('/jobpostform').post(createPost);
loginRouter.route('/createProfile').post(async function(req,res){
        const {firstName,lastName,About,Education,workExperience,Skills} = req.body;
        let user = await UserDB.create({
            username:{
                firstName:firstName,
                lastName: lastName
            },
            About:About,
            Education:Education,
            workExperience:workExperience,
            Skills:Skills
        });
        console.log(user);
        // res.send(user);
});
module.exports = loginRouter;

