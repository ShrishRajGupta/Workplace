import Router from "express";
import UserDB from "../models/userModel.js";
import BlogDB from "../models/postModel.js";
import { displayAllPost, searchApi } from "../controllers/searchBarApi.js";
const mainRouter = Router();

mainRouter.get("/search/:value",searchApi);


//@desc to get all user posts
//@route /home

mainRouter.get('/home', displayAllPost )


export default mainRouter;