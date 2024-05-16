const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const pageRouter = require('./routes/pageRoutes');
const courseRouter = require('./routes/courseRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//Connect DB
mongoose
  .connect('mongodb://127.0.0.1:27017/smartedu-db')
  .then(() => console.log('DB Connected!'));

//Template Engine
app.set('view engine', 'ejs');

//Global var
global.userIN = null;

//Middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'my_keyboard_dog',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/smartedu-db' })
  })
);

//Routes
app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
});
app.use('/', pageRouter);
app.use('/courses', courseRouter);
app.use('/categories', categoryRouter);
app.use('/users', userRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Port: ${port}`);
});
