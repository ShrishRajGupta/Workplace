import Router from "express";

const registerRouter = Router();
import { getRegisterForm, registerUser } from '../controllers/registerController.js';

// route begins with '/user'
registerRouter.route('/register').post(registerUser);
registerRouter.get("/profile",async function(req,res){
        
        res.status(200).send("HI");
});

export default registerRouter;
