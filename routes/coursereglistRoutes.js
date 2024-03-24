const express = require('express');
const router = express.Router();
const coursereglistController = require('../controllers/courseregController');

// Coursereglist routes
router.get('/:id/coursereglist', coursereglistController.getCoursereglistById);
router.post('/:id/coursereglist/coursereg', courseregController.createCoursereg);
router.get('/:id/coursereglist/coursereg', coursereglistController.getCoursereglistById);

module.exports = router;
