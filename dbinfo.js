var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "sql700.main-hosting.eu",
    user: "u873543044_vigor",
    password: "#Asd9317852",
    database: "u873543044_vigor"
});

module.exports = connection;