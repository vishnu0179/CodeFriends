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

app.post('/login', (req, res) => {
    // let user = req.body;

    let data = req.body;
    let sql = "SELECT password from project1 where username = ?";
    // mysqlConnection.query(sql,[user.fullname,user.chef,user.forces,user.username,user.password],(err)=>{
    mysqlConnection.query(sql, [data.username], (err, result) => {
        if (!err) {
            if (result.length > 0) {
                if (data.password === result[0].password) {
                    res.json({
                        status: true,
                        message: "successfully authenticated"

                    });
                }
                else {
                    res.json({
                        status: false,
                        message: "Email and password don't match"
                    });
                }

            }
            else{
                res.json({
                    status: false,
                    message:"Email not found"
                });
            }
        }

        else {
           res.json({
               status:false,
               message: 'authentication failed'
           });
        }
    });


});
