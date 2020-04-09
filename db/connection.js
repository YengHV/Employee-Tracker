// reqired mysql package
// require util that will give us the ablility to promisify
const mysql = require("mysql");
const util = require('util');
// create a connection to mysql
var connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "Someone123!",
  database: "employee_db"
});
// to take in an error if connection is unsuccessful
connection.connect(function(err) {
  if (err) throw err;
});
// adding promisfy into connction.query
connection.query = util.promisify(connection.query);
// export file name connection
module.exports = connection;