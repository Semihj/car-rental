import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from "bcryptjs"

export const UpdateUser = async (req,res,next) => {
  
    try {
        if(req.body.password) {
           req.body.password = bcryptjs.hashSync(req.body.password,10)
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
         {   $set:{
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
            }
        },
        {new:true}
        )
        res.status(200).json(updatedUser)
    } catch (error) {
        next(error)
    }


}