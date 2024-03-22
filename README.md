# Employee Tracker

## Overview
This Employee Tracker Application is a command-line tool built with Node.js, MySQL, and Inquirer. It allows you to manage departments, roles, and employees within your organization.

## Table of Contents
- [Overview](#overview)
- [Getting Started](#getting-started)
- [Features](#features)
- [Contributing](#contributing)
- [Tests](#tests)
- [License](#license)
- [Questions](#questions)

## Getting Started
Watch a video demonstration of the project [here](https://youtu.be/8VO373lwoyM).

1. **Install Dependencies:**

    Make sure you have Node.js installed. Then, in your project directory, run the following command to install the required dependencies:
    ```
    npm install
    ```
2. **Create .env File:**

    Create a file named .env in your project's root directory. Add the following database configuration variables to it:
    ``` 
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=password
    DB_NAME=database
    DB_PORT=port_number
    ```
3. **Access MySQL Command Line:**

    Open your terminal or command prompt and enter the following command to access the MySQL command line using your root user:
    ```
    mysql -u root -p
    ```    
    You'll be prompted to enter your MySQL root password.
4. **Create and Use Database:**

    Once you're in the MySQL command line, you can create and use your database using the following commands:
    ```
    CREATE DATABASE IF NOT EXISTS database_name;
    USE database_name;
    ```
    Replace database_name with the name you specified in the .env file.
5. **Setup Schema and Seeds:**

    In your project's db folder, you should have separate SQL files for schema and seeds (schema.sql and seeds.sql).
    Run the following commands in the MySQL command line to set up your database schema and seed data:
    ```
    source db/schema.sql;
    source db/seeds.sql;
    ```
6. **Run Your Application:**

    After setting up the database and seed data, you can run your Node.js application to start using it:
    ```
    npm start
    ```
    By following these steps, users can easily set up and start using your app with the required database configuration and initial data. Adjust the file paths and commands as per your project's structure.

<img src="assets\employee-table.png" title="Employee Table">

## Features
* View all departments, roles, and employees
* Add new departments, roles, and employees
* Update employee information such as role and manager
* Delete departments, roles, and employees


## Contributing
Thank you for considering contributing to our project! Follow these steps:

* Fork the repository and clone it to your local machine.
* Create a branch, make your changes, and commit them with a clear message.
* Push your changes to your forked repository.
* Open a pull request on the original repository.

Guidelines
* Follow existing code style and conventions.
* Ensure your code is well-documented.

Pull Requests
* Keep them focused and provide a clear description.
* Reference relevant issues if applicable.

## Tests
To test the functionality of this application, follow these steps:

* Run the application using ```npm start```.
* Use the provided menu options to perform various actions such as viewing, adding, updating, or deleting data.
* Verify that the database is updated correctly based on your actions in the application.

## License
![None License](https://img.shields.io/badge/License-None-brightgreen)
This project is not licensed and is provided as-is without any warranty. You are free to use, modify, and distribute the code as you see fit. However, we do not provide any legal protection or support for this project.


## Questions
For questions about this project, contact [Parker Rappleye](https://github.com/prappleman) via email at parker.rappleye1@gmail.com.
