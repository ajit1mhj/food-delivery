import { Request, Response } from "express";
import Restaurant from "../middleware/restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

const getMyRestaurant  = async (req: Request, res: Response): Promise<any> => {
    try{
        const restaurant = await Restaurant.findOne({user:req.userId});
        if (!restaurant){
            return res.status(404).json({message:"restaurant not found"})
        }
        res.json(restaurant);
    }catch(error){
        console.log("error",error);
        res.status(500).json({message:"Error fetching restaurant"})
    }
}
const createMyRestaurant = async (req: Request, res: Response): Promise<any> => {
  try {
    // Check if a restaurant already exists for the user
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });
    if (existingRestaurant) {
      return res
        .status(409)
        .json({ message: "User restaurant already exists" });
    }

    // Check if an image file is provided
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    // Convert image to Data URI
    const image = req.file as Express.Multer.File;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;

    // Upload image to Cloudinary
    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

    // Create new restaurant
    const restaurant = new Restaurant({
      ...req.body,
      user: new mongoose.Types.ObjectId(req.userId),
      imageUrl: uploadResponse.url,
      lastUpdate: new Date(),
    });

    // Save restaurant to the database
    await restaurant.save();

    // Respond with the created restaurant
    res.status(201).send(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default {getMyRestaurant,
  createMyRestaurant,
};
