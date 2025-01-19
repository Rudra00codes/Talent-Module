const express = require('express');
const router = express.Router();
const TalentController = require('../controllers/talentController');
const upload = require('../services/fileUploadService');

router.post('/register', 
  upload.single('profilePhoto'), 
  TalentController.register
);

module.exports = router;