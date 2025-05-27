import express from "express";
import employees from "#db/employees";

const app = express();
app.get("/", (req, res) => res.send("Hello employees!"));

app.get("/employees", (req, res) => {
  res.json(employees);
});

app.get("/employees/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.json(employees[randomIndex]);
});

app.get("/employees/:id", (req, res, next) => {
  try {
    const employeeId = Number(req.params.id);
    const employee = employees.find((employee) => employee.id === employeeId);
    if (!employee) {
      return res.status(404).send("Employee not found");
    }
    res.send(employee);
  } catch (err) {
    next(err);
  }
});

export default app;
