import Car from "../models/car.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

export const UpdateUser = async (req, res, next) => {
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};
export const DeleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("user succesfully deleted");
  } catch (error) {
    next(error);
  }
};
export const getCarListing = async (req, res, next) => {
  try {
    const carListing = await Car.find({ userRef: req.params.id });
    res.status(200).json(carListing);
  } catch (error) {
    next(error);
  }
};
export const getUser = async (req,res,next) => {
  try {
    const user = await User.findById(req.params.id)
    const {password:pass,...rest} = user._doc;
    res.status(200).json(rest)
  } catch (error) {
    next(error)
  }
}

export const verify = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, "Unauthorized"));
    try {
       res.status(200).json(token)  
    } catch (error) {
        next(error)
    }

  
};
