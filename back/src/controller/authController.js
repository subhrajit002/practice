import { loginUser, registerUser } from "../services/authServices.js"
import { generateToken } from "../config/jwt.js";
import bcrypt from "bcrypt"
import User from "../models/userModels.js";

const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password)
            return res.status(404).json({ message: "All fields are required" });

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const jwt = generateToken(newUser._id, newUser.role);

        return res.status(201).send({ jwt, message: 'User registered successfully', role: newUser.role });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(404).json({ message: "All fields are required" })

        const user = await loginUser(email);
        if (!user)
            return res.status(401).send({ message: "User not found" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            return res.status(402).send({ message: "Invalid password" });


        const jwt = generateToken(user._id);

        return res.status(200).send({ jwt, message: "Login success", role: user.role });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

export { login, register };