import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({
    path: './.env'
});


const SECRET_KEY = process.env.SECRET_KEY;

const generateToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: "48h" });
    return token;
};


const getUserIdFromToken = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        return decoded.userId;
    } catch (error) {
        throw new Error("Invalid or expired token");
    }
};


export { generateToken, getUserIdFromToken };