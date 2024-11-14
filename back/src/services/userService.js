import { getUserIdFromToken } from "../config/jwt.js";
import User from "../models/userModels.js";

const getUserProfile = async (token) => {
    try {
        const userId = await getUserIdFromToken(token);
        const user = await User.findById(userId)
            .populate("cars");

        if (!user)
            throw new Error("user is not found with given token")

        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

// using in jwt
const findUserById = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error(`User not found with userID: ${userId}`);
        }
        return user;

    } catch (error) {
        throw new Error(error.message);
    }
}



export { getUserProfile, findUserById }