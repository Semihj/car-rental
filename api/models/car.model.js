import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        
    },
    brand:{
        type:String,
        required:true,
    },
    model:{
        type:String,
        required:true,
    },
    year:{
        type:Number,
        required:true
    },
    images:{
        type:[],
        required:true
    },
    userRef:{
        type:String,
        required:true
    }
    


},{timestamps:true} )

const Car = mongoose.model("Car",CarSchema);

export default Car;