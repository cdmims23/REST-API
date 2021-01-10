const router = require('express').Router();
const Course = require('../models').Course;
const User = require('../models').User;
const asyncHandler = require('../middleware/asyncHandler');
const authUser = require('../middleware/authUser');


router.get('/', authUser, asyncHandler( async (req, res) => {
    const courseList = await Course.findAll();
    res.json(courseList);
}));
    

router.get('/:id', asyncHandler( async (req, res) => {
    const courseList = await Course.findAll({where: [{id: req.params.id}]});
    res.json(courseList)
}));


module.exports = router;