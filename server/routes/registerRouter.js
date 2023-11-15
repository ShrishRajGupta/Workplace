const Router = require("express");

const registerRouter = Router();
const { getRegisterForm, registerUser } = require('../controllers/registerController.js');
const authenticateToken = require("../middlewares/validateJWT.js");
const UserDB = require('../models/userModel.js');

// route begins with '/user'
registerRouter.route('/register').post(registerUser);
registerRouter.get("/profile",authenticateToken,async function(req,res){
        
        res.status(200).send("HI");
});

module.exports = registerRouter;
