import Car from "../models/car.model.js"

export const postCar = async (req,res,next) => {
   
    const newCar = new Car(req.body)
    try {
        await newCar.save()
        res.status(200).json("Car created succesfully")
    } catch (error) {
        next(error)
    }
}