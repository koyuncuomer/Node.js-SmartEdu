const express = require('express');
const mongoose = require('mongoose');
const pageRouter = require('./routes/pageRoutes');
const courseRouter = require('./routes/courseRoutes');
const categoryRouter = require('./routes/categoryRoutes');

const app = express();

//Connect DB
mongoose
  .connect('mongodb://127.0.0.1:27017/smartedu-db')
  .then(() => console.log('DB Connected!'));

//Template Engine
app.set('view engine', 'ejs');

//Middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/', pageRouter);
app.use('/courses', courseRouter);
app.use('/categories', categoryRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Port: ${port}`);
});
