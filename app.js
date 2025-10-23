import express from "express";
import employeesRouter from "./routes/employees.js";

const app = express();
const PORT = process.env.PORT ?? 3000;

// Middleware
app.use(express.json());

// Root route (must match test)
app.get("/", (req, res) => res.send("Welcome to the Fullstack Employees API."));

// Mount employee routes directly (no extra wrapper)
app.use("/employees", employeesRouter);

export default app;
