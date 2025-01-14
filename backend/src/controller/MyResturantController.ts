import  {Request ,Response } from "express"
import Resturant from "../middleware/resturant";
import cloudinary from "cloudinary"

const createMyResturant = async(req:Request,res:Response) : Promise<any>=>{
 try{
    const existingResturant = await Resturant.find({user:req.userId})
    if(existingResturant){
        return res 
        .status(409)
        .json({message:"User resturant already exists"})

    }

    const image = req.file as Express.Multer.File;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64Image,${base64Image}`;

    const updateRespnase = await cloudinary.v2.uploader.upload(dataURI);

    const resturant = new Resturant(req.body);
    

 }catch(error){
    console.log(error);
    res.status(500).json({message:"Something went wrong"});

 }


}

export default {
    createMyResturant,
}