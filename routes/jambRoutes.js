const express = require('express');
const router = express.Router();
const jambController = require('../controllers/jambController');

// Jamb routes
router.post('/:id/biodata/jamb', jambController.createJambByStudentId);
router.get('/:id/biodata/jamb', jambController.getJambByStudentId);
router.put('/:id/biodata/jamb', jambController.updateJambByStudentId);
router.delete('/:id/biodata/jamb', jambController.getJambByStudentId);

module.exports = router;
