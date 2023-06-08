const express = require('express');
const app = express();

const usersRoutes = require('./routes/users')
const faqsRoutes = require('./routes/faqs')
const testimonialsRoutes = require('./routes/testimonials')
const tutorialsRoutes = require('./routes/tutorials')
const imagesRoutes = require('./routes/images')
const articlesRoutes = require('./routes/articles')
const quizzesRoutes = require('./routes/quizzes')
const productsRoutes = require('./routes/products')
const healthCheckRoutes = require('./routes/healthChecks')

const dotenv = require('dotenv');
var bodyParser = require('body-parser');

dotenv.config();


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
app.use('/quizzes', quizzesRoutes)
app.use('/products', productsRoutes)
app.use('/health-check', healthCheckRoutes)

const URL = process.env.URL;
const PORT = process.env.PORT;
app.listen(PORT, console.log('Server has started at: ' + URL));

