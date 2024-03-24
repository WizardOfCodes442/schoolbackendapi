const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// Profile routes
router.get('/:id/profile', profileController.getProfileById);
router.post('/:id/profile', profileController.createProfile);
router.put('/:id/profile', profileController.updateProfile);
router.delete('/:id/profile', profileController.deleteProfile);

module.exports = router;
