const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// const mongoose = require('mongoose');
// const config = require('./config/config').get(process.env.NODE_ENV);
const connectDB = require('./config/db');

const app = express();

// Connect Database MongoDB Atlas
connectDB();

const { User } = require('./models/user');
const { Book } = require('./models/book');
const { Router } = require('express');

// INIT Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  express.json({
    extended: false,
  })
);

// Routes:
app.use('/api/book', require('./routes/api/book'));

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
