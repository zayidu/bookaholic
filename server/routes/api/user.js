const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const bcrypt = require('bcrypt');

// @route   POST /api/user/register
// @desc    Post - Register a new User
// @access  Public/Private
router.post('/register', (req, res) => {
  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) return res.json({ success: false });
    res.status(200).json({
      success: true,
      user: doc,
    });
  });
});

// @route   GET /api/user/login
// @desc    Login a User
// @access  Public/Private
router.get('/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        isAuth: false,
        message: 'Invalid Credentials',
      });
    // Compare
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          isAuth: false,
          message: 'Invalid Credentials',
        });
      // Sign() - Token
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie('auth', user.token).json({
          isAuth: true,
          id: user._id,
          email: user.email,
        });
      });
    });
  });
});

// @route   GET /api/users
// @desc    Get all Users
// @access  Public/Private
router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(users);
  });
});

// @route   GET /api/user/reviewer/:id
// @desc    Get a Reviewer by it's ID
// @access  Public/Private
router.get('/reviewer/:id', (req, res) => {
  let id = req.params.id;

  User.findById(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.json({
      name: doc.name,
      lastname: doc.lastname,
    });
  });
});

module.exports = router;
