INSERT INTO department (department_name)
VALUES ("Human Resources"),
    ("Accounting"),
    ("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES ("Attorney", 100000, 3),
("Accountant", 75000, 2),
("Partner", 300000, 3),
("HR Rep", 90000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tiger", "Bain", 4, 1),
("Claire", "Bain", 2, 1),
("Pepper", "Dog", 3, 1),
("Loic", "Carr", 2, 1);