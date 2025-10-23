import express from "express";
import employeesRouter from "../routes/employees.js";

const router = express.Router();

router.use("/", employeesRouter);

export default router;
