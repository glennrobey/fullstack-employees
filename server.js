import express from "express";
import db from "#db/client";
import employeesRouter from "./routes/employees.js";

const app = express();
const PORT = process.env.PORT ?? 3000;

// Middleware
app.use(express.json());

// Root route (match the test exactly)
app.get("/", (req, res) => res.send("Welcome to the Fullstack Employees API."));

// Employee routes (ensure leading slash!)
app.use("/employees", employeesRouter);

// Connect to DB and start server
async function startServer() {
  try {
    await db.connect();
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}...`);
    });
  } catch (err) {
    console.error("Failed to connect to database:", err);
    process.exit(1); // exit if DB connection fails
  }
}

startServer();

export default app;
