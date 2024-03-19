//Define Express routes to handle CRUD operations for departments, roles, and employees.

const express = require('express');
const router = express.Router();
const path = require('path');

// Import Sequelize models
const Department = require(path.join(__dirname, '..', 'models', 'Department'));
const Role = require(path.join(__dirname, '..', 'models', 'Role'));
const Employee = require(path.join(__dirname, '..', 'models', 'Employee'));

// Define API routes

// Get all departments
router.get('/models/departments', async (req, res) => {
  try {
    const departments = await Department.findAll();
    res.json(departments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get all roles
router.get('/models/roles', async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get all employees
router.get('/models/employees', async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Add a department
router.post('/models/departments', async (req, res) => {
  const { name } = req.body;
  try {
    const newDepartment = await Department.create({ name });
    res.status(201).json(newDepartment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Add a role
router.post('/models/roles', async (req, res) => {
  const { title, salary, departmentId } = req.body;
  try {
    const newRole = await Role.create({ title, salary, departmentId });
    res.status(201).json(newRole);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Add an employee
router.post('/models/employees', async (req, res) => {
  const { firstName, lastName, roleId, managerId } = req.body;
  try {
    const newEmployee = await Employee.create({ firstName, lastName, roleId, managerId });
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update an employee's role
router.put('/models/employees/:id', async (req, res) => {
  const { id } = req.params;
  const { roleId } = req.body;
  try {
    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    employee.roleId = roleId;
    await employee.save();
    res.json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
