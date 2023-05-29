const express = require('express');
const app = express();
const usersRoutes = require('./routes/users')
const faqsRoutes = require('./routes/faqs')
const testimonialsRoutes = require('./routes/testimonials')
const tutorialsRoutes = require('./routes/tutorials')
const imagesRoutes = require('./routes/images')
const articlesRoutes = require('./routes/articles')
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
app.use('/users', usersRoutes);
app.use('/faqs', faqsRoutes)
app.use('/testimonials', testimonialsRoutes)
app.use('/tutorials', tutorialsRoutes)
app.use('/images', imagesRoutes)
app.use('/articles', articlesRoutes)
const PORT = process.env.PORT || 4111;
app.listen(PORT, console.log('Server has started at: http://localhost:' + PORT));

