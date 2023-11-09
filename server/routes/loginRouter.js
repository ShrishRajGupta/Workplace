import { Router }  from "express";

const loginRouter = Router();
import { getLoginForm, loginUser, logoutUser } from '../controllers/loginControllers.js';

// route begins with 'user'
loginRouter.route('/login')
    .get(getLoginForm)
    .post(loginUser)

loginRouter.route('/logout')
    .get(logoutUser);

export default loginRouter;

