function init() {
    inquirer
    .prompt([
        {
        type: 'input',
        name: 'title',
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
    
        fs.writeFile('./utils/README.md', generateMarkdown(answers), (err) =>
        err ? console.error(err) : console.log('Commit logged!')
      );
    }
    )
    }