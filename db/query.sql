SELECT department_name AS department, id
FROM department
ORDER BY department_name;


SELECT R.title, R.id, R.salary, D.department_name
FROM roles R
LEFT JOIN department D on D.id = R.department_id
ORDER BY R.title
;


SELECT Distinct E.id, E.first_name, E.last_name
, R.title, D.department_name, R.salary
, M.first_name AS "Manager First Name", M.last_name AS "Manager Last Name"
FROM employee E
INNER JOIN roles R on R.id = E.role_id
INNER JOIN department D on D.id = R.department_id
INNER JOIN employee M on M.id = E.manager_id
ORDER BY E.last_name
;