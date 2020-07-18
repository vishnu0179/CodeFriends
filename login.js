const mysql = require('mysql');
const express = require('express');
const jwt = require('jsonwebtoken');
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

    let data = req.body;
    let sql = "SELECT password from project1 where username = ?";
    
    const token = jwt.sign(data, 'secret key');
    mysqlConnection.query(sql, [data.username], (err, result) => {
        if (!err) {
            if (result.length > 0) {
               
                if (data.password === result[0].password) {
                    
                    //TOKEN SAVED IN DATABASE
                    let q1 = "Insert into tokeninfo (username,token) values (?,?)";
                    mysqlConnection.query(q1, [data.username, token], (err) => {
                        if(!err){
                            res.header('auth', token).send(token);
                            console.log("token saved");
                        }
                        else if (err.code === "ER_DUP_ENTRY") {
                            res.json({
                                message: "You are already logged in."
                            });
                        }

                        else if (err.code!=="ER_DUP_ENTRY")
                            console.log("Query could not be completed" + JSON.stringify(err, undefined, 2));
                        
                            
                    });
                }
                else {
                    res.json({
                        status: false,
                        message: "Email and password don't match"
                    });
                }

            }
            else {
                res.json({
                    status: false,
                    message: "Email not found"
                });
            }
        }

        else {


            res.json({
                status: false,
                message: 'authentication failed'
            });
        }
    });


});
