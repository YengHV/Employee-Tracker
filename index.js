const connection = require('./connection.js');
// const db = require('/db.sql');


function getAlldepartments(){
        return connection.query('SELECT * FROM department')
           .then(results => {
             console.table(results)
          })
          .catch(err => console.log(err))
    };

function getAllroles(){
        return connection.query('SELECT * FROM roles')
           .then(results => {
             console.table(results)
          })
          .catch(err => console.log(err))
    };

function getAllemployee(){
        return connection.query('SELECT * FROM employees')
           .then(results => {
             console.table(results)
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

// getAlldepartments()
// getAllemployee()
// getAllroles()

addDepartments(sales)
