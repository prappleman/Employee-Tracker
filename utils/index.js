//Implement functions to validate user input for adding departments, roles, and employees.

// Import required modules and utility functions
const { promptUser, validateInput, formatTable } = require('./utils');
const { Department, Role, Employee } = require('../models');

// Function to add a new department
async function addDepartment() {
  const name = await promptUser('Enter the name of the department:', [validateInput]);
  try {
    const newDepartment = await Department.create({ name });
    console.log('Department added successfully:');
    console.log(formatTable([newDepartment])); // Display added department in a formatted table
  } catch (error) {
    console.error('Error adding department:', error);
  }
}

// Function to add a new role
async function addRole() {
  // Prompt user for role details
  const title = await promptUser('Enter the title of the role:', [validateInput]);
  const salary = await promptUser('Enter the salary for the role:', [validateInput]);
  const departmentId = await promptUser('Enter the department ID for the role:', [validateInput]);

  try {
    const newRole = await Role.create({ title, salary, departmentId });
    console.log('Role added successfully:');
    console.log(formatTable([newRole])); // Display added role in a formatted table
  } catch (error) {
    console.error('Error adding role:', error);
  }
}

// Function to add a new employee
async function addEmployee() {
  // Prompt user for employee details
  const firstName = await promptUser('Enter the first name of the employee:', [validateInput]);
  const lastName = await promptUser('Enter the last name of the employee:', [validateInput]);
  const roleId = await promptUser('Enter the role ID for the employee:', [validateInput]);
  const managerId = await promptUser('Enter the manager ID for the employee:', [validateInput]);

  try {
    const newEmployee = await Employee.create({ firstName, lastName, roleId, managerId });
    console.log('Employee added successfully:');
    console.log(formatTable([newEmployee])); // Display added employee in a formatted table
  } catch (error) {
    console.error('Error adding employee:', error);
  }
}

// Export functions for use in other modules
module.exports = { addDepartment, addRole, addEmployee };

