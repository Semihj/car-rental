import Car from "../models/car.model.js"

export const postCar = async (req,res,next) => {
   
    const newCar = new Car(req.body)
    try {
        await newCar.save()
        res.status(200).json(newCar)
    } catch (error) {
        next(error)
    }
}



export const deleteCar = async (req,res,next) => {
   
     
    try {
        await Car.findByIdAndDelete(req.params.id)
        res.status(200).json("Car Deleted succesfully")
    } catch (error) {
        next(error)
    }
}
export const getCar = async (req,res,next) => {
   
     
    try {
       const car =  await Car.findById(req.params.id)
        res.status(200).json(car)
    } catch (error) {
        next(error)
    }
}
export const getCars = async (req,res,next) => {

    
    try {
        const searchTerm = req.query.searchTerm || "";
        const category = req.query.category || "";
        const brand = req.query.brand || "";
        
        const model = req.query.model || "";
        const year = req.query.year || "";
        const desc = req.query.description || "";
        const price = req.query.price || "";
        let queryParams = { title: { $regex: searchTerm, $options: "i" } };

        if (category) queryParams.category = {$regex:category,$options:"i"};
        if (brand) queryParams.brand = {$regex:brand,$options:"i"};
        if (model) queryParams.model = {$regex:model,$options:"i"};
        if (year) queryParams.year = year;
        if (desc) queryParams.description = { $regex: desc, $options: "i" };
        if (price) queryParams.price = {$gte:price};
        
        const cars = await Car.find(queryParams)
        return res.status(200).json(cars)
    } catch (error) {
        next(error)
    }


}