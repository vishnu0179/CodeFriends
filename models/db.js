const mysql = require('mysql')
const dbConfig = require('../config/db.config.js')

const mysqlConnection = mysql.createPool({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    multipleStatements: true
});

// mysqlConnection.connect((err) => {
//     if (!err)
//         console.log('DB connection succesfull');
//     else
//         console.log('DB connection failed\n Error : ' + JSON.stringify(err, undefined, 2));
// });


module.exports = mysqlConnection;