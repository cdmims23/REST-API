const router = require('express').Router();
const User = require('../models').User;
const bcrypt = require('bcryptjs');
const asyncHandler = require('../middleware/asyncHandler');
const authUser = require('../middleware/authUser');

router.get('/', authUser, asyncHandler(async(req, res) => {
    if (req.currentUser) {
        res.json({currentUser: req.currentUser.firstName});
    } else {
        res.json({currentUser: 'No User'});
    }
}));

router.post('/', asyncHandler(async (req, res) => {
    await User.create(req.body);

    res.json({msg: 'User Created!'})
}));







module.exports = router;