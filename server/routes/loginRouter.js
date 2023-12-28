import Router from "express";
import { getLoginForm, loginUser, logoutUser ,registerUser} from '../controllers/loginControllers.js';
const loginRouter = Router();

// route begins with 'user'
loginRouter.route('/register').post(registerUser);
loginRouter.route('/login').post(loginUser);

loginRouter.route('/logout')
    .get(logoutUser);


export default loginRouter;

