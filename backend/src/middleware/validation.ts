import { NextFunction,Request,Response } from "express";
import { body, validationResult } from "express-validator";

const handelValidationErrors = async (req:Request,res:Response,next: NextFunction): Promise<any>=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})

    }
    next();
}
export const validateMyUserRequest = [
    body("name").isString().notEmpty().withMessage("Name must be a string"),
    body("addressLine1").isString().notEmpty().withMessage("addressLine1 must be a string"),
    body("city").isString().notEmpty().withMessage("city must be a string"),
    body("country").isString().notEmpty().withMessage("Country must be a string"),
    handelValidationErrors,
]

export const validateMyResturantRequest = [
    body("resturantName").notEmpty().withMessage("Restrant name is required"),
    body("city").notEmpty().withMessage("city name is required"),
    body("country").notEmpty().withMessage("country name is required"),
    body("delivaryPrice").isFloat({min:0}).withMessage("Delivery price must be a positive number"),
    body("estimateDeliveryTime").isFloat({min:0}).withMessage("Estimated delivery time must be a positive integer"),
    body("cusines").isArray().withMessage("Cusines must be an array").not().isEmpty().withMessage("cuisine array must not be empty"),
    body("menuItems").isArray().withMessage("Menu item must be an array"),
    body("menuItems.*.name").notEmpty().withMessage("Menu item name must be an array"),
    body("menuItems.*.price").isFloat({min: 0}).withMessage("Menu item price  is requred and must be positive"),
]