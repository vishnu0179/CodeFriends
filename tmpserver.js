const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'projectDB',
    multipleStatements: true

});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succesfull');
    else
        console.log('DB connection failed\n Error : ' + JSON.stringify(err, undefined, 2));
});

app.listen(3000, () => console.log('Server up and running at port 3000'));

app.post('/register', (req, res) => {
    // let user = req.body;
    
    let data = req.body;
    let sql = "Insert into project1  set ?";
    // mysqlConnection.query(sql,[user.fullname,user.chef,user.forces,user.username,user.password],(err)=>{
    mysqlConnection.query(sql, data, (err, result) => {
        if (!err)
            console.log('Inserted succesfully');
        else {
            console.log('Error:' + JSON.stringify(err, undefined, 2));
        }
    });


});
