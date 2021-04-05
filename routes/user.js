const express = require('express');
const router = express.Router();

const limiter = require('../middleware/rateLimit');
const ctrlUser = require('../controllers/user');

router.post('/signup',limiter, ctrlUser.signup);
router.post('/login', ctrlUser.login);

module.exports = router;
