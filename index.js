// const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
// const app = express();

// Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'password',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);

const inquirer = require('inquirer');
function init() {
    inquirer
    .prompt([
        {
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: [
            'view all departments',
            'view all roles',
            'view all employees', 
            'add a department',
            'add a role', 
            'add an employee',
            'update an employee role'
        ]
    
    },
    
    

    
    ])
    .then((answers)=> {
    // db.source(.db/query.sql))
        console.log(answers)

    if(answers.choice === 'view all departments'){
        db.execute('SELECT department_name AS department, id FROM department', (err,rows) => {
          
                if(err) throw err;
                console.log(rows)
            })

    } else if(answers.choice === 'view all roles'){
        db.execute('SELECT R.title, R.id, R.salary, D.department_name FROM roles R LEFT JOIN department D on D.id = R.department_id ORDER BY R.title', (err,rows) => {
          
            if(err) throw err;
            console.log(rows)
        })
    } else if(answers.choice === 'view all employees'){
        db.execute(`SELECT Distinct E.id, E.first_name, E.last_name
, R.title, D.department_name, R.salary
, M.first_name AS "Manager First Name", M.last_name AS "Manager Last Name"
FROM employee E
INNER JOIN roles R on R.id = E.role_id
INNER JOIN department D on D.id = R.department_id
INNER JOIN employee M on M.id = E.manager_id
ORDER BY E.last_name`, (err,rows) => {
          
            if(err) throw err;
            console.log(rows)
        })
    } else if(answers.choice === 'add a department'){
        inquirer.prompt({
            type: 'input',
            name: 'department',
            message: 'Please enter the department name'
        }
        
        ).then((answers)=> {


        db.execute('INSERT INTO department (department_name) VALUES (?)', 
        [answers.department],
        (err,rows) => {
          
            if(err) throw err;
            console.log("added department")
        })
        })

    } else if(answers.choice === 'add a role'){
        inquirer.prompt([
            {type: 'input',
            name: 'title',
            message: 'Please enter the role title'
        },
        {type: 'input',
            name: 'salary',
            message: 'Please enter the role salary'
        },
        {type: 'input',
            name: 'department',
            message: 'Please enter the role department id'
        }
        ]
        
        ).then((answers)=> {


        db.execute('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', 
        [answers.title, answers.salary, answers.department],
        (err,rows) => {
          
            if(err) throw err;
            console.log("added role")
        })
        })
    } else if(answers.choice === 'add an employee'){
        inquirer.prompt([
            {type: 'input',
            name: 'first',
            message: 'Please enter the employee first name'
        },
        {type: 'input',
            name: 'last',
            message: 'Please enter the employee last name'
        },
        {type: 'input',
            name: 'role',
            message: 'Please enter the employee role id'
        },
        {type: 'input',
            name: 'manager',
            message: 'Please enter the employee manager id'
        }
        ]
        
        ).then((answers)=> {


        db.execute('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', 
        [answers.first, answers.last, answers.role, answers.manager],
        (err,rows) => {
          
            if(err) throw err;
            console.log("added employee")
        })
        })

    }
    else if(answers.choice === 'update an employee role'){
        db.execute(`SELECT E.id AS value, E.last_name AS name
FROM employee E`, (err,rows) => {
          
            if(err) throw err;
            // console.log(rows)

        inquirer.prompt([
            {type: 'list',
            name: 'employee',
            message: 'Please select the employee',
            choices: rows


        
        },
        {type: 'input',
        name: 'role',
        message: 'Please enter the role id'
    },]
        ).then((answers)=> {
            db.execute(
            'UPDATE employee SET role_id = ? WHERE id = ?',
            [answers.role, answers.employee],
        (err,rows) => {
          
            if(err) throw err;
            console.log("updated employee")
        })

        })
    })
        // {type: 'input',
        //     name: 'last',
        //     message: 'Please enter the employee last name'
        // },
        // {type: 'input',
        //     name: 'role',
        //     message: 'Please enter the employee role id'
        // },
        // {type: 'input',
        //     name: 'manager',
        //     message: 'Please enter the employee manager id'
        // }
        // ]
        
        // ).then((answers)=> {


        // db.execute('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', 
        // [answers.first, answers.last, answers.role, answers.manager],
        // (err,rows) => {
          
        //     if(err) throw err;
        //     console.log("added employee")
        // })
        // })

    }

    //     fs.writeFile('./utils/README.md', generateMarkdown(answers), (err) =>
    //     err ? console.error(err) : console.log('Commit logged!')
    
})
}

    init();