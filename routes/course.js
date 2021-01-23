const router = require('express').Router();
const Course = require('../models').Course;
const asyncHandler = require('../middleware/asyncHandler');
const authUser = require('../middleware/authUser');


// GET: returns a list of courses
router.get('/', asyncHandler( async (req, res) => {
    const courseList = await Course.findAll();
    if (courseList) {
        res.json(courseList);
      } else {
        res
          .status(404)
          .json({ message: "Sorry, no courses found." });
      }
}));
    

// GET: returns the course with the id in the url if the course exists
router.get('/:id', asyncHandler( async (req, res) => {
    const course = await Course.findByPk(req.params.id);
    if (course) {
        res.json(course);
      } else {
        res
          .status(404)
          .json({ message: "Sorry, course not found." });
      }
}));


// POST: Allows an authenticated user to create a course.
router.post('/', authUser, asyncHandler( async (req, res) => {
    const newCourse = {
        title: req.body.title,
        description: req.body.description,
        estimatedTime: req.body.estimatedTime,
        materialsNeeded: req.body.materialsNeeded,
        userId: req.currentUser.id
    };

    try {
        const course = await Course.create(newCourse);
        res
          .status(201)
          .location('/api/v1/courses/' + course.id)
          .end();
      } catch (error) {
        console.log('ERROR: ', error.name);
    
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
          const errors = error.errors.map(err => err.message);
          res
            .status(400)
            .json({ errors });
        } else {
          throw error;
        }
      }
}));

// PUT: Allows an autheticated user to update a course
router.put('/:id', authUser, asyncHandler(async (req, res) => {
    try {
        // The only way to check if the request has any updated info
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
          res
            .status(400)
            .json({ message: "No updated content found." });
        }
    
        const course = await Course.findByPk(req.params.id);
    
        if (course) {
          await course.update({
            title: req.body.title,
            description: req.body.description,
            estimatedTime: req.body.estimatedTime,
            materialsNeeded: req.body.materialsNeeded,
            userId: req.currentUser.id
          });
    
          res
            .status(204)
            .end();
        } else {
          res
            .status(404)
            .json({ message: "Sorry, course not found." });
        }
      } catch (error) {
        console.log('ERROR: ', error.name);
    
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
          const errors = error.errors.map(err => err.message);
          res
            .status(400)
            .json({ errors });
        } else {
          throw error;
        }
      }
}));


// DELETE: Allows an authenticated user to delete a course.
router.delete('/:id', authUser, asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id);
  
    if (course.userId === req.currentUser.id) {
      await course.destroy();
      res
        .status(204)
        .end();
    } else {
      res
        .status(404)
        .json({ message: "Sorry, course not found." });
    }
  }));



module.exports = router;