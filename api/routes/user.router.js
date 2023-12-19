import express from "express";
import { UpdateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/update/:id",verifyToken,UpdateUser);

export default router;