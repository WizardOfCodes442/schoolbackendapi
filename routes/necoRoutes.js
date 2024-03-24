const express = require('express');
const router = express.Router();
const necoController = require('../controllers/necoController');

// Neco routes
router.post('/:id/biodata/neco', necoController.createNecoByStudentId);
router.get('/:id/biodata/neco', necoController.getNecoByStudentId);
router.put('/:id/biodata/neco', necoController.updateNecoByStudentId);
router.delete('/:id/biodata/neco', necoController.deleteNecoByStudentId);


module.exports = router;
