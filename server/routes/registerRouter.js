import { Router } from "express";

const registerRouter = Router();
import { getRegisterForm, registerUser } from '../controllers/registerController.js';

// route begins with '/user'
registerRouter.route('/register')
    .get(getRegisterForm)
    .post(registerUser)

export default registerRouter;
