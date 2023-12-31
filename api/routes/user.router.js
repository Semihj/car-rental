import express from "express";
import { DeleteUser, UpdateUser, getCarListing, getUser, verify } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/update/:id",verifyToken,UpdateUser);
router.delete("/delete/:id",verifyToken,DeleteUser);
router.get("/verify",verify);
router.get("/get-listings/:id",verifyToken,getCarListing);
router.get("/get-user/:id",getUser);

export default router;