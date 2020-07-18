const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');

var app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

var mysqlconnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'projectDB',
    multipleStatements: true
});

mysqlconnection.connect((err) => {
    if (!err)
        console.log('DB connection succesfull');
    else
        console.log('DB connection failed\n Error : ' + JSON.stringify(err, undefined, 2));
});

app.listen(3000, () => console.log("server running"));

app.post('/logout', (req, res) => {
    let data = req.body;
    let sql = 'delete from tokeninfo where username= ?';
    mysqlconnection.query(sql, [data.username], (err, result) => {
        if (err)
           console.log("Query could not be completed" + JSON.stringify(err, undefined, 2));
        else
            console.log("logged out!");
    });
});