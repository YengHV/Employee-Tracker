const connection = require('./connection.js');
const inquirer = require("inquirer");

function start(){

    inquirer
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
                    "Add Employee"
                ]
            }
        ])
        .then(function ({userInput}){
            switch(userInput){
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
            }
        })
}



function getAlldepartments(){
        return connection.query('SELECT * FROM department')
           .then(results => {
             console.table(results);
             endProgram();
          })
          .catch(err => console.log(err))
    };

function getAllroles(){
        return connection.query('SELECT * FROM roles')
           .then(results => {
             console.table(results)
             endProgram();
          })
          .catch(err => console.log(err))
    };

function getAllemployees(){
        return connection.query('SELECT * FROM employees')
           .then(results => {
             console.table(results)
             endProgram();
          })
          .catch(err => console.log(err))
    };

function addDepartments({names}){
        return connection.query('INSERT INTO departments SET ?', 
        {
            names: names
        })
        .then(console.log(names, "Has been added to Departments"))
        .catch(err)
};

function addRoles(){

};

function addEmployees(){

};

function endProgram(){
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
        .then(function ({choice}){
            if(choice === "Yes, back to the start."){
                start();
            }
            else{
                connection.end();
            }
        })
}

// getAlldepartments()
// getAllemployee()
// getAllroles()

start()
