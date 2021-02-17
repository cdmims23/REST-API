const router = require('express').Router();
const User = require('../models').User;
const bcrypt = require('bcryptjs');
const asyncHandler = require('../middleware/asyncHandler');
const authUser = require('../middleware/authUser');


// GET: Returns a user if a user has been authenticated.
router.get('/', authUser, asyncHandler(async(req, res) => {
    if (req.currentUser) {
        res.json({currentUser: req.currentUser});
    } else {
        res.json({currentUser: 'No User'});
    }
}));


// POST: Allows a new user to be created.
router.post('/', asyncHandler(async (req, res) => {
    try {
        await User.create(req.body);
        res
          .status(201)
          .location('/')
          .end();
      } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
          const errors = error.errors.map(err => err.message);
          res.status(400).json({ errors });
        } else {
          throw error;
        }
      }
}));







module.exports = router;