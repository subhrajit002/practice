import express from "express";
import authenticate from "../middleware/authmiddleware.js";
import { addCar, deleteCar, getCarById, getUserCars, updateCar, userProfile, viewAllCar } from "../controller/userController.js";

const router = express.Router();

router.post("/addcar", authenticate, addCar);
router.get("/allcar", viewAllCar);
router.get("/usercar", authenticate, getUserCars);
router.put("/updatecar/:id", authenticate, updateCar);
router.delete("/deletecar/:id", authenticate, deleteCar);
router.get("/profile", authenticate, userProfile);
router.get("/getCar/:id", getCarById);

export default router;