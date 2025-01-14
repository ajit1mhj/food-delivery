import express from  "express";
import multer from "multer";
import MyResturantController from "../controller/MyResturantController";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage:storage,
    limits:{
        fileSize : 5 *1024 * 1024 ,
    }
})

router.post("/",upload.single("imagefile"),
MyResturantController.createMyResturant);
