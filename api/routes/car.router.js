import express from "express";
import { postCar,deleteCar, getCars, getCar } from "../controllers/car.controller.js";

const router = express.Router();

router.post("/listing",postCar);
router.delete("/delete/:id",deleteCar);
router.get("/get-cars",getCars);
router.get("/get-car/:id",getCar);

export default router;