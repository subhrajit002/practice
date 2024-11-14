import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    cars: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'car'
        }
    ],
    createAt: { type: Date, default: Date.now() }
})

const User = mongoose.model("user", userSchema)
export default User;