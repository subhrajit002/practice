import mongoose from "mongoose";



const carSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    carType: { type: String, required: true },
    company: { type: String, required: true },
    dealer: { type: String, required: true },
    images: [{ type: String, required: true }],
    createdAt: { type: Date, default: Date.now },
});

const Car = mongoose.model('car', carSchema);
export default Car;
