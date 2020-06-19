const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// const mongoose = require('mongoose');
// const config = require('./config/config').get(process.env.NODE_ENV);
const connectDB = require('./config/db');

const app = express();

// Connect Database MongoDB Atlas
connectDB();
// Start the community Server
// ./mongod --dbpath ~/mongo-data
// mongo

// const { User } = require('./models/user');
// const { Book } = require('./models/book');
// const { Router } = require('express');

// INIT Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  express.json({
    extended: false,
  })
);

// Routes/ API End-points:

// CRUD for Book Model
app.use('/api/book', require('./routes/api/book'));
app.use('/api/books', require('./routes/api/book'));

// CRUD for User Model
app.use('/api/user', require('./routes/api/user'));
app.use('/api/users', require('./routes/api/user'));

// Authenticating a Route in Front-End/ Private Route
app.use('/api/auth', require('./routes/api/auth'));

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
