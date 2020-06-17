const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const config = require('./config/config').get(process.env.NODE_ENV);
// const connectDB = require('../config/db');
const app = express();

mongoose.Promise = global.Promise;

// Mongo Community Server
mongoose.connect(config.DATABASE);
// Connect Database MongoDB Atlas
// connectDB();

const { User } = require('./models/user');
const { Book } = require('./models/book');

// INIT Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  express.json({
    extended: false,
  })
);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
