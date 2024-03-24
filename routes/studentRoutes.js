const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const profileController = require('../controllers/profileController');
const biodataController = require('../controllers/biodataController');
const waecController = require('../controllers/waecController');
const necoController = require('../controllers/necoController');
const jambController = require('../controllers/jambController');
const courseregController = require('../controllers/courseregController');

// Create Student
router.post('/', studentController.createStudent);

// Get All Students
router.get('/', studentController.getAllStudents);

// Get Student by ID
router.get('/:id', studentController.getStudentById);

// Update Student by ID
router.put('/:id', studentController.updateStudentById);

// Delete Student by ID
router.delete('/:id', studentController.deleteStudentById);


// Profile routes
router.get('/:id/profile', profileController.getProfileById);
router.put('/:id/profile', profileController.updateProfile);

// Biodata routes
router.get('/:id/biodata', biodataController.getBiodataByStudentId);
router.post('/:id/biodata/waec', waecController.createWaecByStudentId);
router.get('/:id/biodata/waec', waecController.getWaecByStudentId);
router.post('/:id/biodata/neco', necoController.createNecoByStudentId);
router.get('/:id/biodata/neco', necoController.getNecoByStudentId);
router.post('/:id/biodata/jamb', jambController.createJambByStudentId);
router.get('/:id/biodata/jamb', jambController.getJambByStudentId);

// Coursereglist routes
router.get('/:id/coursereglist', courseregController.getCourseregList);
router.post('/:id/coursereglist/coursereg', courseregController.createCoursereg);
router.get('/:id/coursereglist/coursereg', courseregController.getCourseregByIndex);

module.exports = router;
