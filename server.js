
// Linking SQL2, Inquirer, and Console Table to script file
const mysql = require('mysql2');
const inquirer = require('inquirer');

require('console.table');
require('dotenv').config();


// Creating MySQL connection object to local host using port and password
// Also evaluating database being used
// Sets up details for connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});



// Connection to menu database with greeting and start of menu
// Creates connection
connection.connect(err => {
  if (err) throw err;
  console.log("Welcome to JS Employee Tracker");
  startMenu();
});

// Start Menu Selection Screen
const startMenu = () => {
  // All possible actions within application
  inquirer.prompt({
    message: 'Please choose one of the following:',
    name: 'menu',
    type: 'list',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update employee info',
      'Delete a department',
      'Delete a role',
      'Delete an employee',
      'Exit',
    ],
  })

    // Response based on action select using if statement that engages corresponding function
  .then(response => {
    if (response.menu === 'View all departments') {
      viewAllDepartments();
    } else if (response.menu === 'View all roles') {
      viewAllRoles();
    } else if (response.menu === 'View all employees') {
      viewAllEmployees();
    } else if (response.menu === 'Add a department') {
      addDepartment();
    } else if (response.menu === 'Add a role') {
      addRole();
    } else if (response.menu === 'Add an employee') {
      addEmployee();
    } else if (response.menu === 'Update employee info') {
      updateEmployeeInfo();
    } else if (response.menu === 'Delete a department') {
      deleteDepartment();
    } else if (response.menu === 'Delete a role') {
      deleteRole();
    } else if (response.menu === 'Delete an employee') {
      deleteEmployee();
    } else {
      connection.end();
    }
  });
};

// Function to show all departments in database
const viewAllDepartments = () => {
  // Use connection,query to engage SQL command that usually is physcially typed out in command line
  connection.query('SELECT * FROM department', function (err, res) {
    if (err) throw err;
    // console.table displays tables based on response from connection.query
    console.table(res);
    startMenu();
  });
};

// Function to view all roles within database
const viewAllRoles = () => {
  // Uses a different syntax than normal for connection.query
  // The single letters represent the first letter of each table within seeds.sql. This is then connected to the corresponding label issued in the schema.sql file to display that selected data.
  // This pulls from the employee table and joins the role table and department table data to it
  connection.query(`SELECT 
    r.id,
    r.title,
    d.name AS department,
    r.salary
    FROM role r
    JOIN department d ON r.department_id = d.id`, 
    (err, res) => {
      if (err) throw err;
      console.table(res);
      startMenu();
    }
  );
};

// Function to show all employees
const viewAllEmployees = () => {
  // Similar to viewAllRoles, this function uses SQL commands to display select data and joins tables together into a cohesive table display
  connection.query(`
  SELECT 
    e.id, 
    e.first_name, 
    e.last_name, 
    r.title, 
    d.name AS department, 
    r.salary, 
    CONCAT(m.first_name, ' ', m.last_name) AS manager
  FROM employee e
  JOIN role r ON e.role_id = r.id
  JOIN department d ON r.department_id = d.id
  LEFT JOIN employee m ON e.manager_id = m.id
`, (err, res) => {
    if (err) throw err;
    console.table(res);
    startMenu();
  });
};

// function to add department
const addDepartment = () => {
  // Simple prompt to input string for department
  inquirer.prompt([
    {
      name: 'department',
      type: 'input',
      message: 'Please enter a department.',

    },
  ])
  // Utilizes a connection.query to insert department into seeds.sql table based on values
  .then(answer => {
    connection.query(
      'INSERT INTO department (name) VALUES (?)',
      [answer.department],
      (err, res) => {
        if (err) throw err;
        console.log('Department successfully added!');
        startMenu();
      }
    );
  });
};

// Function to add a role
const addRole = () => {
  // This is a little different from the function above in that it uses inquirer to rpoduce a list prompt so the user can select from the database
  // This called for making a object callled departmentNames so the function can pull the department names from the department table and dsiplay them
  // A problem that occured was the entry of the data; the departments are based on department ids which are integers and the inquirer list inputs string data, so I had to include a function using accumulative and currency to convert department names into their respective department ids upon submission
  connection.query('SELECT id, name FROM department', (err, res) => {
    if (err) throw err;

    const departmentNames = res.reduce((acc, curr) => {
        acc[curr.name] = curr.id;
        return acc;
    }, {});
  
  inquirer.prompt([
  {
    name: 'role',
    type: 'input',
    message: 'Please enter your role in the company.'
  },
  {
    name: 'salary',
    type: 'input',
    message: 'Please enter your salary.'
  },
  {
    name: 'department',
    type: 'list',
    message: 'Please select which department your role is in.',
    // Pulls from object to display department names in seeds.sql table
    choices: Object.keys(departmentNames),
  }
  ]).then(answer => {
  const departmentID = departmentNames[answer.department];
    connection.query(
      'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
      [answer.role, answer.salary, departmentID],
      function (err, res) {
        if (err) throw err;
        console.log('Role added!');
        startMenu();
      });
    })
  });
};

// Function to add employees
// This follows the syntax from the above function expect it utilizes two objects to create inquirer lists
const addEmployee = () => {
  connection.query('SELECT id, title FROM role', (err, res) => {
    if (err) throw err;

    const roleNames = res.reduce((acc, curr) => {
      acc[curr.title] = curr.id;
      return acc;
    }, {});

  connection.query('SELECT id, first_name, last_name, manager_id FROM employee', (err, res) => {
    if (err) throw err;

    const managers = {};

    res.forEach((employee) => {
        const managerName = `${employee.first_name} ${employee.last_name}`;
        managers[managerName] = employee.id;
    });
  
    inquirer.prompt([
      {
        name: 'firstName',
        type: 'input',
        message: "Please enter your first name."
      },
      {
        name: 'lastName',
        type: 'input',
        message: "Please enter your last name."
      },
      {
        name: 'role',
        type: 'list',
        message: 'Please select your corresponding role in the company.',
        choices: Object.keys(roleNames),
      },
      {
        name: 'manager',
        type: 'list',
        message: 'Please select your manager from the team roster',
        choices: Object.keys(managers),
      }
    ]).then(answer => {
      const roleID = roleNames[answer.role];
      const managerID = managers[answer.manager];
      connection.query(
        'INSERT INTO employee SET ?',
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: roleID,
          manager_id: managerID
        },
        function (err, res) {
          if (err) throw err;

          console.log('Employee added!');
          startMenu();
        });
      });
    });
  });
};

// Function to update employee information
const updateEmployeeInfo = () => {
  connection.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee', (err, res) => {
    if (err) throw err;

    const employees = res.reduce((acc, curr) => {
      acc[curr.name] = curr.id;
      return acc;
    }, {});

    inquirer.prompt({
      name: 'employee',
      type: 'list',
      message: 'Select the employee to update:',
      choices: Object.keys(employees),
    }).then(answer => {
      const employeeId = employees[answer.employee];

      inquirer.prompt({
        name: 'updateOption',
        type: 'list',
        message: `Select the information to update for ${answer.employee}:`,
        choices: ['Position', 'Manager'],
      }).then(optionAnswer => {
        switch (optionAnswer.updateOption) {
          case 'Position':
            updateEmployeePosition(employeeId);
            break;
          case 'Manager':
            updateEmployeeManager(employeeId);
            break;
          default:
            console.log('Invalid option.');
            startMenu();
            break;
        }
      });
    });
  });
};









const updateEmployeePosition = (employeeId) => {
  connection.query('SELECT id, title FROM role', (err, roleRes) => {
    if (err) throw err;

    const roles = roleRes.reduce((acc, curr) => {
      acc[curr.title] = curr.id;
      return acc;
    }, {});

    inquirer.prompt([
      {
        name: 'role',
        type: 'list',
        message: 'Select the new role:',
        choices: Object.keys(roles),
      }
    ]).then(answer => {
      const roleId = roles[answer.role];

      // Update role_id in employee table
      connection.query(
        'UPDATE employee SET role_id = ? WHERE id = ?',
        [roleId, employeeId],
        (err, res) => {
          if (err) throw err;
          console.log(`Role updated for employee ID ${employeeId}`);

          // Prompt user to select the new department
          connection.query('SELECT id, name FROM department', (err, deptRes) => {
            if (err) throw err;

            const departments = deptRes.reduce((acc, curr) => {
              acc[curr.name] = curr.id;
              return acc;
            }, {});

            inquirer.prompt([
              {
                name: 'department',
                type: 'list',
                message: 'Select the new department:',
                choices: Object.keys(departments),
              }
            ]).then(answer => {
              const departmentId = departments[answer.department];

              // Update department_id in role table
              connection.query(
                'UPDATE role SET department_id = ? WHERE id = ?',
                [departmentId, roleId],
                (err, res) => {
                  if (err) throw err;
                  console.log(`Department updated for role ID ${roleId}`);
                  startMenu();
                }
              );
            });
          });
        }
      );
    });
  });
};





    
const updateEmployeeManager = (employeeId) => {
  connection.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee', (err, res) => {
    if (err) throw err;

    const employees = res.reduce((acc, curr) => {
      acc[curr.name] = curr.id;
      return acc;
    }, {});

    inquirer.prompt({
      name: 'manager',
      type: 'list',
      message: 'Select the new manager:',
      choices: Object.keys(employees),
    }).then(answer => {
      const managerId = employees[answer.manager];

      connection.query(
        'UPDATE employee SET manager_id = ? WHERE id = ?',
        [managerId, employeeId],
        (err, res) => {
          if (err) throw err;
          console.log(`Manager updated for employee ID ${employeeId}`);
          startMenu();
        }
      );
    });
  });
};

// Extra Credit

// Function to delete a department
// Similar structure and syntax to adding departments/etc. but uses SQL command DELETE
const deleteDepartment = () => {
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    // map() method transforms an array of department objects recieved ina response (res) into a new array of objects
    const departments = res.map((department) => ({
      name: department.name,
      value: department.id,
    }));
    inquirer
      .prompt([
        {
          name: 'departmentID',
          type: 'list',
          message: 'Which department do you want to delete?',
          choices: departments,
        },
        // Confirmation prompt for accessibility
        {
          name: 'confirm',
          type: 'confirm',
          message: 'Are you sure you want to delete this department?',
          default: false,
        },
      ])
      .then((answer) => {
        if (answer.confirm) {
          connection.query(
            'DELETE FROM department WHERE id = ?',
            [answer.departmentID],
            (err, res) => {
              if (err) throw err;
              console.log(`Department was successfully deleted.`);
              startMenu();
            }
          );
        } else {
          console.log('No departments were deleted.');
          startMenu();
        }
      });
  });
};
  
// Function to delete a role
const deleteRole = () => {
  connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    const roles = res.map((role) => ({
      name: role.title,
      value: role.id,
    }));
    inquirer
      .prompt([
        {
          name: 'roleID',
          type: 'list',
          message: 'Which role do you want to delete?',
          choices: roles,
        },
        {
          name: 'confirm',
          type: 'confirm',
          message: 'Are you sure you want to delete this role?',
          default: false,
        },
      ])
      .then((answer) => {
        if (answer.confirm) {
          connection.query(
            'DELETE FROM role WHERE id = ?',
            [answer.roleID],
            (err, res) => {
              if (err) throw err;
              console.log(`Role was successfully deleted.`);
              startMenu();
            }
          );
        } else {
          console.log('No roles were deleted.');
          startMenu();
        }
      });
  });
};

// Function to delete an employee
const deleteEmployee = () => {
  connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    const employeesNames = res.map((employee) => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id,
    }));
    inquirer
      .prompt([
        {
          name: 'employeeID',
          type: 'list',
          message: 'Which employee do you want to delete?',
          choices: employeesNames,
        },
        {
          name: 'confirm',
          type: 'confirm',
          message: 'Are you sure you want to delete this employee?',
          default: false,
        },
      ])
      .then((answer) => {
        if (answer.confirm) {
          connection.query(
            'DELETE FROM employee WHERE id = ?',
            [answer.employeeID],
            (err, res) => {
              if (err) throw err;
              console.log(`Employee was successfully deleted.`);
              startMenu();
            }
          );
        } else {
          console.log('No employees were deleted.');
          startMenu();
        }
      });
  });
};
