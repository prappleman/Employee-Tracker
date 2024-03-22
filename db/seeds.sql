-- Department table and corresponding values for Parks and Recreation
INSERT INTO department (name)
VALUES ("Parks and Recreation"),
        ("City Planning"),
        ("Finance"),
        ("Human Resources"),
        ("Parks Maintenance"),
        ("Public Relations"),
        ("City Management");

-- Role table and corresponding values for Parks and Recreation
INSERT INTO role (title, salary, department_id)
VALUES ("Parks Director", 80000, 1),
        ("Deputy Parks Director", 70000, 1),
        ("City Planner", 60000, 2),
        ("Accountant", 65000, 3),
        ("HR Specialist", 55000, 4),
        ("Parks Maintenance Supervisor", 55000, 5),
        ("Public Relations Manager", 60000, 6),
        ("City Manager", 90000, 7);

-- Employee table and corresponding values for Parks and Recreation
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Leslie", "Knope", 1, NULL),
        ("Ron", "Swanson", 2, NULL),
        ("Tom", "Haverford", 3, 1),
        ("Ann", "Perkins", 4, NULL),
        ("Ben", "Wyatt", 7, 6),
        ("April", "Ludgate", 5, 2),
        ("Andy", "Dwyer", 6, 2),
        ("Donna", "Meagle", 5, NULL),
        ("Jerry", "Gergich", 6, NULL),
        ("Chris", "Traeger", 7, 6),
        ("Craig", "Middlebrooks", 7, 6);

