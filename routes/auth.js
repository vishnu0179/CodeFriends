const express = require('express')
const router = express.Router()

const mysqlConnection = require("../models/db.js");

router.post('/login', (req, res) => {
    // let user = req.body;
    let data = req.body;
    let sql = "SELECT password from project where username = ?";
    // mysqlConnection.query(sql,[user.fullname,user.forces,user.username,user.password],(err)=>{
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

router.post('/register', (req, res) => {
    let data = req.body;
    console.log(data);

    let sql = "Insert into project  set ?";


    mysqlConnection.query(sql, data, (err, result) => {
        if (!err) {
            res.json({
                message: "Successfull"
            });
            console.log('Inserted succesfully');
            
        }
        else {
            res.json({
                message: "Not Successfull"
            });
            console.log('Error:' + JSON.stringify(err, undefined, 2));
        }
    });

    //res.end();

})

module.exports = router