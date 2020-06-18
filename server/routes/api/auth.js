const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

// @route   GET /api/auth
// @desc    Authenticate a route
// @access  Private
router.get('/', auth, (req, res) => {
  res.json({
    isAuth: true,
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
  });
});

module.exports = router;
