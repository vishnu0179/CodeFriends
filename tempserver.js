const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());


var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'devuser',
    password: 'devuser',
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


// { fullname: 'Sakshi Dahiya', chef: 'sakshi_dahiyaa', forces: 'sakshidahiya406', username: 'sakshi.dahiya', password: 'root' };

app.post('/project', (req, res) => {
    let data = req.body;
    console.log(data);

    let sql = "Insert into project  set ?";

    let resultObj = {}

    mysqlConnection.query(sql, data, (err, result) => {
        if (!err) {
            console.log('Inserted succesfully');
            resultObj['Staus'] = "Successfull";
        }
        else {
            resultObj['Staus'] = "Failed";
            console.log('Error:' + JSON.stringify(err, undefined, 2));
        }
    });
    
    res.send(resultObj);

})