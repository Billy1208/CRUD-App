const config = require('./dbinfo');
const express = require('express');
const cookieParser = require('cookie-parser')
const mysql = require('mysql');
var bodyParser = require('body-parser')
const app = express()
const path = require('path');
const router = express.Router();
const port = 8080


app.engine('html', require("ejs").renderFile)
app.use(express.static(__dirname + '/views'));
app.use(express.json())
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));
app.use('/', router);
app.use(cookieParser())
app.use(bodyParser.urlencoded({
    extended: true
}));


var readids = []
var readnames = []
var readphones = []
var readaddress = []

config.connect()

config.query('SELECT * FROM customers', function (error, results, fields) {
    if (error) throw error;
    for (let i = 0; i < results.length; i++) {
        readids.push(results[i]["id"])
        readnames.push(results[i]["name"])
        readphones.push(results[i]["phone"])
        readaddress.push(results[i]["address"])
    }
});
config.end;
router.get('/', function (req, res) {
    res.render("index", { ids: readids, names: readnames, phones: readphones, addresses: readaddress})
});
app.get('/cust', (req, res) => {

})
app.post('/sendCreate', (req, res) => {
    let id = req.body.crId
    let name = req.body.crName
    let phone = req.body.crPhone
    let address = req.body.crAddress
    config.query("INSERT INTO `customers` (`id`, `name`, `phone`, `address`) VALUES (" + id + ", '" + name + "', '" + phone + "', '" + address + "');", function (error, results, fields) {
        if (error){
            res.send(error)
        };
        res.send("POSTED")
    });
})
app.post('/sendUpdate', (req, res) => {
    let id = req.body.upId
    let name = req.body.upName
    let phone = req.body.upPhone
    let address = req.body.upAddress
    config.query("UPDATE `customers` SET `name` = '" + name + "', `phone` = '" + phone + "', `address` = '" + address + "' WHERE `customers`.`id` = " + id + ";", function (error, results, fields) {
        if (error){
            res.send(error)
        };
        res.send("UPDATED")
    });
})
app.post('/sendDelete', (req, res) => {
    let id = req.body.delId
    config.query("DELETE FROM `customers` WHERE `customers`.`id` = " + id + "", function (error, results, fields) {
        if (error){
            res.send(error)
        };
        res.send("DELETED")
    });
})

app.listen(port, () => {
    console.log(`CRUD app listening on port ${port}`)
})
