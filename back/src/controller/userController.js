import Car from "../models/carModels.js";
import User from "../models/userModels.js";
import { getUserProfile } from "../services/userService.js";


const addCar = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const { title, description, carType, company, dealer, images } = req.body;

        if (!title || !description || !carType || !company || !dealer || !images || !images.length) {
            return res.status(404).json({ message: "All fields are required" });
        }

        // Create a new car
        const car = await Car.create({
            title,
            description,
            carType,
            company,
            dealer,
            images,
        });

        user.cars.push(car._id);
        await user.save();

        return res.status(200).json({ message: "Car added successfully", car });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleteCar = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const { id } = req.params;

        const car = await Car.findByIdAndDelete(id);

        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }

        return res.status(200).json({ message: "Car deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateCar = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const { id } = req.params;
        const { title, description, carType, company, dealer } = req.body;

        // Build the updateData object with only the provided fields
        const updateData = {};
        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (carType) updateData.carType = carType;
        if (company) updateData.company = company;
        if (dealer) updateData.dealer = dealer;

        const updatedCar = await Car.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedCar) {
            return res.status(404).json({ message: "Car not found" });
        }

        return res.status(200).json({ message: "Car updated successfully", updatedCar });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


const viewAllCar = async (req, res) => {
    try {
        const cars = await Car.find();
        if (cars.length === 0) {
            return res.status(404).json({ message: "No cars found" });
        }
        return res.status(200).json(cars);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getUserCars = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('cars');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!user.cars || user.cars.length === 0) {
            return res.status(404).json({ message: "No cars found for this user" });
        }

        return res.status(200).json({ cars: user.cars });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const userProfile = async (req, res) => {
    try {
        const jwt = req.headers.authorization?.split(" ")[1];

        if (!jwt) {
            return res.status(404).send({ error: "token not found" })
        }

        const user = await getUserProfile(jwt)

        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}


const getCarById = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await Car.findById(id);

        if (!car)
            return res
                .status(404)
                .json({ message: `No Car found with id ${id} ` });

        return res.status(200).json(car);
    } catch (error) {
        return res.status(500).json({ message: "error in finding destinations" });
    }
};


export { addCar, deleteCar, updateCar, getCarById, viewAllCar, getUserCars, userProfile }