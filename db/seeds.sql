-- Populate the database with initial seed data for testing and development purposes.

-- Insert departments data
INSERT INTO departments (name) VALUES
    ('Sales'),
    ('Finance'),
    ('Human Resources');

-- Insert roles data
INSERT INTO roles (title, salary, department_id) VALUES
    ('Sales Representative', 50000.00, 1),
    ('Financial Analyst', 60000.00, 2),
    ('HR Coordinator', 45000.00, 3);

-- Insert employees data
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
    ('John', 'Doe', 1, NULL),
    ('Jane', 'Smith', 2, 1),
    ('Mike', 'Johnson', 3, 1);
