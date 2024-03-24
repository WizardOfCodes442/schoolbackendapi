// routes/courseregRoutes.js

const express = require('express');
const courseregController = require('../controllers/courseregController');

const router = express.Router();

router.get('/students/:id/coursereglist', courseregController.getCourseregList);
router.get('/students/:id/coursereglist/:courseregId', courseregController.getCourseregByIndex);
router.post('/students/:id/coursereglist', courseregController.createCoursereg);
router.put('/students/:id/coursereglist/:courseregId', courseregController.updateCourseregByIndex);
router.delete('/students/:id/coursereglist/:courseregId', courseregController.deleteCourseregByIndex); //

module.exports = router;
