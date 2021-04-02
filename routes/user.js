const express = require('express');
const router = express.Router();

const valideSignup = require('../middleware/validateRegistration');

const ctrlUser = require('../controllers/user');

router.post('/signup', ctrlUser.signup);
router.post('/login', ctrlUser.login);

module.exports = router;
