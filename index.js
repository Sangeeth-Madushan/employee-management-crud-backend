import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import employeeRouter from "./routes/employeeRouter.js";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config(); // Load .env file variables

const app = express(); // (Express is a Framework like complete backend)

// Middle wares
app.use(cors());
app.use(bodyParser.json());

// Database connection
mongoose
  .connect(
    process.env.DB_URL
  )
  .then(() => {
    console.log("Database connected");
  })
  .catch(() => {
    console.log("Database connect failed");
  });

app.use("/api/employees", employeeRouter);

app.listen(5000, () => {
  console.log("App is listen in port 5000");
});
