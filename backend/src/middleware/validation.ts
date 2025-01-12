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