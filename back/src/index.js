import express from "express";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());

// ROUTER
import authrouter from './routes/authRoutes.js';
import addCar from './routes/userRoutes.js';


app.use("/auth", authrouter);
app.use('/api', addCar);


export { app };
