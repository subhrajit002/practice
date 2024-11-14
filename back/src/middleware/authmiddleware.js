import { findUserById } from "../services/userService.js"
import { getUserIdFromToken } from "../config/jwt.js"

const authenticate = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];

        try {
            const userId = await getUserIdFromToken(token);
            const user = await findUserById(userId);

            if (!user) {
                return res.status(401).json({ message: "User not found" });
            }

            req.user = user;
            next();
        } catch (error) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }
    } else {
        return res.status(401).json({ message: "Token not provided" });
    }
};


export default authenticate;
