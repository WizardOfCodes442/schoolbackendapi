// routes/courseregRoutes.js

const express = require('express');
const courseregController = require('../controllers/courseregController');

const router = express.Router();

router.get('/:id/coursereglist', courseregController.getCourseregList);
router.get('/:id/coursereglist/:courseregId', courseregController.getCourseregByIndex);
router.post('/:id/coursereglist', courseregController.createCoursereg);
router.put('/:id/coursereglist/:courseregId', courseregController.updateCourseregByIndex);
router.delete('/:id/coursereglist/:courseregId', courseregController.deleteCourseregByIndex);

module.exports = router;
