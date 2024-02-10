import dotenv from "dotenv";
dotenv.config();
import UserDB from "../models/userModel.js"

import multer from "multer";
import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUDNAME, 
    api_key: process.env.CLOUDINARY_APIKEY, 
    api_secret: process.env.CLOUDINARY_APISECRET 
  });

const uploadPhoto = async (req,res) =>{
    const id=req.body.user;
  if(req.file===undefined||req.file=== null)
    return res.status(300).json({MSG:"No Upload"});

  const user = await UserDB.findOne({ _id:id });
  if (!user) 
  return res.status(404).json({ msg: "User not found" });
  else{
    const upload= await cloudUp(req.file.path);
    user.photo = upload.secure_url;  
    await user
    .save()
    .then(() => res.json({url:upload.secure_url}))
    .catch((err) => res.status(400).json("Error: " + err));
  }
}


const cloudUp = async(filepath)=>{
    try {
      const result = await cloudinary.uploader.upload(filepath);
      // console.log(result);
      return result;
    } catch (error) {
      console.error(error);
    }
  
  }
export default uploadPhoto;

