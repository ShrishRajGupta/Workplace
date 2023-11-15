import Router from "express";
const loginRouter = Router();

import { getLoginForm, loginUser, logoutUser } from '../controllers/loginControllers.js';
import createPost from "../controllers/createPost.js";


// route begins with 'user'
loginRouter.route('/login')
    .get(getLoginForm)
    .post(loginUser)

loginRouter.route('/logout')
    .get(logoutUser);

loginRouter.route('/jobpostform').post(createPost);
loginRouter.route('/createProfile').post(async function(req,res){
        
        res.send("user created");
});
export default loginRouter;

