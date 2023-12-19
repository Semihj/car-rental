import express from "express";
import { postCar } from "../controllers/car.controller.js";

const router = express.Router();

router.post("/listing",postCar);

export default router;