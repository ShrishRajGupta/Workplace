import Router from "express";
import {loginUser, logoutUser ,registerUser} from '../controllers/loginControllers.js';
import authenticateToken from "../middlewares/validateJWT.js";
const loginRouter = Router();

// route begins with 'user'
loginRouter.route('/register').post(registerUser);
loginRouter.route('/login').post(loginUser);

loginRouter.route('/logout')
    .get(authenticateToken,logoutUser);


export default loginRouter;

