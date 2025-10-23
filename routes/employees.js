import express from "express";
import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../db/queries/employees.js";

const router = express.Router();

// Helper function to validate ID
const validateId = (idStr) => {
  const id = Number(idStr);
  return Number.isInteger(id) && /^\d+$/.test(idStr); // only check integer, allows 0
};

// GET all employees
router.get("/", async (req, res) => {
  try {
    const employees = await getEmployees();
    res.status(200).json(employees);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// GET employee by ID
router.get("/:id", async (req, res) => {
  try {
    if (!validateId(req.params.id)) return res.status(400).send("Invalid ID");

    const id = Number(req.params.id);
    const employee = await getEmployee(id);
    if (!employee) return res.status(404).send("Employee not found");

    res.status(200).json(employee);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// POST create employee
router.post("/", async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0)
      return res.status(400).send("Request must have a body");

    const { name, birthday, salary } = req.body;
    if (!name || !birthday || !salary)
      return res.status(400).send("Missing required fields");

    const newEmployee = await createEmployee({ name, birthday, salary });
    res.status(201).json(newEmployee);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// PUT update employee
router.put("/:id", async (req, res) => {
  try {
    if (!validateId(req.params.id)) return res.status(400).send("Invalid ID");
    if (!req.body || Object.keys(req.body).length === 0)
      return res.status(400).send("Request must have a body");

    const id = Number(req.params.id);
    const { name, birthday, salary } = req.body;
    if (!name || !birthday || !salary)
      return res.status(400).send("Missing required fields");

    const updated = await updateEmployee({ id, name, birthday, salary });
    if (!updated) return res.status(404).send("Employee not found");

    res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// DELETE employee
router.delete("/:id", async (req, res) => {
  try {
    if (!validateId(req.params.id)) return res.status(400).send("Invalid ID");

    const id = Number(req.params.id);
    const deleted = await deleteEmployee(id);
    if (!deleted) return res.status(404).send("Employee not found");

    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

export default router;
