const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  database: "attendance",
  user: "root",
  password: "",
});

module.exports = conn;
