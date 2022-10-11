import express from 'express';

import { router as pageRoute } from './routes/pageRoute.js';
import { router as courseRoute } from './routes/courseRoute.js';
import { router as categoryRoute } from './routes/categoryRoute.js';
import { router as userRoute } from './routes/userRoute.js';

import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import flash from 'connect-flash';
import methodOverride from 'method-override';

const app = express();

//Connect DB
mongoose.connect('mongodb+srv://dbUser:eDeSaqhRjBIq4iHt@cluster0.entthlr.mongodb.net/?retryWrites=true&w=majority');

// Template Engine
app.set('view engine', 'ejs');

// Global variable
global.userIN = null;

//Middlewares
app.use(express.static('public'));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/smartedu-db' }),
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

// Routes
app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
});
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
