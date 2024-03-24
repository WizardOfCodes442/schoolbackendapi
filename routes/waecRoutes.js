const express = require('express');
const router = express.Router();
const waecController = require('../controllers/waecController');

// Waec routes
router.post('/:id/biodata/waec', waecController.createWaecByStudentId); 
router.get('/:id/biodata/waec', waecController.getWaecByStudentId);
router.put('/:id/biodata/waec', waecController.updateWaecByStudentId);
router.delete('/:id/biodata/waec', waecController.deleteWaecByStudentId);



module.exports = router;
