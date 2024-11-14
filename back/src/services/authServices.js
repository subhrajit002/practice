import { getUserIdFromToken } from "../config/jwt.js";
import User from "../models/userModels.js";
import bcrypt from "bcrypt"

const registerUser = async (userData) => {
    try {
        let { firstName, lastName, email, password } = userData;

        if ([firstName, lastName, email, password].some((field) => field?.trim() === "")) {
            throw new Error("All fields are required");
        }

        const existedUser = await User.findOne({ email });
        if (existedUser) {
            throw new Error(`User already exists with the email ${email}`);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });
        return newUser;

    } catch (error) {
        throw new Error(error);
    }
};


const loginUser = async (email) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error(`User not found with email: ${email}`);
        }
        return user;

    } catch (error) {
        throw new Error(error.message);
    }
}



export { registerUser, loginUser }