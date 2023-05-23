const express = require('express');
const app = express();

const dotenv = require('dotenv');
var bodyParser = require('body-parser');

dotenv.config();

// MySQL DB Connection 
// const mysql = require('mysql')
// const connection = mysql.createConnection({
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DB
// })

// connection.connect()

// connection.query('SHOW TABLES', (err, rows, fields) => {
//   if (err) throw err

//   console.log('The solution is: ', rows)
// })

// connection.end()

//BodyParsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
app.use('/', require('./routes/user'));
const PORT = process.env.PORT || 4111;
app.listen(PORT, console.log('Server has started at: http://localhost:' + PORT));

