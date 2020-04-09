// Required connection from connection.js file
const connection = require('./db/connection.js');
// required inquirer from npm package
// dependency from npm
const inquirer = require("inquirer");
// function to start in node
function start() {
    // from required from inquierer package
    inquirer
    // promts the user
    // takes user input
    // type of prompt, in this case a list
    // choices give user multple options
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                name: "userInput",
                choices: [
                    "View Departments",
                    "View Roles",
                    "View Employees",
                    "Add Department",
                    "Add Role",
                    "Add Employee",
                    "Update Employee Role"
                ]
            }
        ])
        // a promise after the prompt
        .then(function ({ userInput }) {
            // switch case method
            // will take in user input depending on the case
            // a call back funtion will fire off when selected case is chosen
            switch (userInput) {
                case "View Departments":
                    getAlldepartments();
                    break;

                case "View Roles":
                    getAllroles();
                    break;

                case "View Employees":
                    getAllemployees();
                    break;

                case "Add Department":
                    addDepartments();
                    break;

                case "Add Role":
                    addRoles();
                    break;

                case "Add Employee":
                    addEmployees();
                    break;

                case "Update Employee Role":
                    updateRole();
                    break;
            }
        })
}


// function to get all departments
function getAlldepartments() {
    // return request and then connection.query is have the ablibly to have a promise.
    return connection.query('SELECT * FROM department')
    // a promise to run after request is fired
    // returns result in a table
        .then(results => {
            console.table(results);
            // a callback function to endProgram
            endProgram();
        })
        // if results are not obtainable, then "catch" the errer/ console.log errer
        .catch(err => console.log(err))
};
// function to get all roles
function getAllroles() {
    // return request and then connection.query is have the ablibly to have a promise.
    return connection.query('SELECT * FROM roles')
        .then(results => {
    // a promise to run after request is fired
    // returns result in a table
            console.table(results)
            // a callback function to endProgram
            endProgram();
        })
        // if results are not obtainable, then "catch" the errer/ console.log errer
        .catch(err => console.log(err))
};
// function to get all employees
function getAllemployees() {
    // return request and then connection.query is have the ablibly to have a promise.
    return connection.query('SELECT * FROM employees')
    // a promise to run after request is fired
    // returns result in a table
        .then(results => {
            console.table(results)
            // a callback function to endProgram
            endProgram();
        })
        // if results are not obtainable, then "catch" the errer/ console.log errer
        .catch(err => console.log(err))
};
// function to add one department
function addDepartments() {
    // Prompt to take user input
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the name of this Department?",
                name: "names"
            }
        ])
        // a promise to run after request is fired
    // returns result in a table
        .then(function ({ names }) {
        // a promise to run after request is fired
    // returns result in a table
            connection.query('INSERT INTO department SET ?', { names: names })
                .then(console.log(names, "Has been added to Department"))
                // to "catch" an error if .then is unsuccesful
                .catch(err => console.log(err))
            // a callback function to endProgram
            endProgram();
        })

};
// function to add role
function addRoles() {
    // Prompt to take user input
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the name of this Role?",
                name: "title"
            }
        ])
        // a promise after prompt
        // a function to insert a new role
        .then(function ({ title }) {
            connection.query('INSERT INTO roles SET ?', { title: title })
                .then(console.log(title, "Has been added to Roles"))
                // if unsuccesful, then console log error
                .catch(err => console.log(err))
            // callback function to endProgram
            endProgram();
        })
};
// a function to add employee
function addEmployees() {
    //prompt to take user input of first name, last name, role Id, manager, and manager Id
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the first name of this employee?",
                name: "first_name"
            },
            {
                type: "input",
                message: "What is the last name of this employee?",
                name: "last_name"
            },
            {
                type: "input",
                message: "What is the role ID of this employee?",
                name: "role_id"
            },
            {
                type: "list",
                message: "Does this employee have a manager?",
                name: "hasManager",
                choices: [
                    "Yes",
                    "No"
                ]
            },
            {
                type: "input",
                message: "What is the ID of this employee's manager?",
                name: "manager_id",
                // when function if user input === yes
                when: function (data) {
                    return data.hasManager === "Yes";
                }
            }
        ])
        // funtion after prompts
        // if yes, then insert into employee table
        .then(function (data) {
            if (data.hasManager === 'Yes') {
                connection.query('INSERT INTO employees SET ?',
                    {
                        // data to insert into employee table
                        first_name: data.first_name,
                        last_name: data.last_name,
                        role_id: data.role_id,
                        manager_id: data.manager_id
                    })
                    // fires off console log after previous function ends
                    .then(console.log(data.first_name, "has been added to Employees!"))
                    // "catch" error
                    .catch(error => console.log(error))
                // callback funtion to endProgram
                endProgram();
            }
            else {
                // else === no enter data without manager
                connection.query('INSERT INTO employees SET ?',
                    {
                        first_name: data.first_name,
                        last_name: data.last_name,
                        role_id: data.role_id,
                    })
                    // fires off console log with string 
                    .then(console.log(data.first_name, "has been added to Employees!"))
                    // "catch" error/console log error
                    .catch(error => console.log(error))
                // callback to endProgram function
                endProgram();
            }
        })
};
// a function to update role
function updateRole() {
    // an empty array to hold all employee names
    let employeeNamesArray = []
    // a request to select all from employee table
    connection.query('SELECT * FROM employees')
        // .then a function iterate the array
        // concatnate first name, space, and last name together.
        // push name into empty employeeNamesArray
        .then(function (results) {

            for (let i = 0; i < results.length; i++) {
                let name = results[i].first_name + ' ' + results[i].last_name;
                employeeNamesArray.push(name);
            }

            // Prompt to take user input
            inquirer
                .prompt([
                    {
                        type: "list",
                        message: "Which employee would you like to update?",
                        name: "employeeName",
                        // show choices of the empty array that is now filled with employee first/last name
                        choices: employeeNamesArray
                    },
                    {
                        type: "input",
                        message: "What is this employee's new Role ID?",
                        name: "newRoleId",
                    }
                ])
                // then fires off function to update employee roleid and uniqueId
                .then(function ({ employeeName, newRoleId }) {
                    let employeeUniqueId = employeeNamesArray.indexOf(employeeName) + 1;

                    connection.query('UPDATE employees SET ? WHERE employees.id = ?', [{ role_id: newRoleId }, employeeUniqueId])
                        .then(console.log(employeeName + " has been update to the Role ID of " + newRoleId))
                        .catch(error => console.log(error))
                    endProgram();

                })
        })
        .catch(error => console.log(error))
};
// a function to end program
// a prompt to take user input
function endProgram() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Do you want to continue?",
                name: "choice",
                choices: [
                    "Yes, back to the start.",
                    "No, done with changes."
                ]
            }
        ])
        // gives user choice to restart from the beginning
        .then(function ({ choice }) {
            if (choice === "Yes, back to the start.") {
                start();
            }
            // else end connection
            else {
                connection.end();
            }
        })
}
// callback function to start
start()
