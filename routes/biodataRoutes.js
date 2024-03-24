const express = require('express');
const router = express.Router();
const biodataController = require('../controllers/biodataController');
const waecController = require('../controllers/waecController');
const necoController = require('../controllers/necoController');
const jambController = require('../controllers/jambController');

// Biodata routes
router.get('/:id/biodata', biodataController.getBiodataByStudentId);
router.post('/:id/biodata/waec', waecController.createWaecByStudentId);
router.put('/:id/biodata/waec', waecController.updateWaecByStudentId);
router.delete('/:id/biodata/waec', waecController.deleteWaecByStudentId);
router.get('/:id/biodata/waec', waecController.getWaecByStudentId);
router.post('/:id/biodata/neco', necoController.createNecoByStudentId);
router.get('/:id/biodata/neco', necoController.getNecoByStudentId);
router.put('/:id/biodata/neco', necoController.updateNecoByStudentId);
router.delete('/:id/biodata/neco', necoController.deleteNecoByStudentId);

router.post('/:id/biodata/jamb', jambController.createJambByStudentId); 
router.get('/:id/biodata/jamb', jambController.getJambByStudentId);
router.put('/:id/biodata/jamb', jambController.updateJambByStudentId);
router.delete('/:id/biodata/jamb', jambController.getJambByStudentId);


module.exports = router;
