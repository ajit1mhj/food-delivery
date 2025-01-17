import { create } from "domain";
import { Request,Response } from "express";
import User from "../models/user";

const createCurrentUser = async (req:Request,res:Response): Promise<any>=>{

    //check if user exist 
    //create the user if it doesnt exist 
    //return the user object to the calling client
    try{
        const {auth0Id} = req.body;
        const existingUser = await User.findOne({auth0Id});

    if(existingUser){
            return res.status(200).send();
        }
          
       
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser.toObject());
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Error creating user"})
    }
};
const updateCurrentUser = async (req:Request,res:Response):Promise<any>=>{
    try{
        const {name,addressLine1,country , city}=req.body;
        const user = await User.findById(req.userId);

        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        user.name= name;
        user.addressLine1= addressLine1;
        user.city= city;
        user.Country=country;
        await user.save();
        res.send(user);
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Error updating user"})
    }
}
export default {
    createCurrentUser,
    updateCurrentUser
};