const express =  require('express');
const router = express.Router();

const sauceController = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/mutler');

console.log('coucou');
router.get('/', sauceController.getAllSauces);
router.post('/', multer, sauceController.createSauce);
router.get('/:id', sauceController.getOneSauce);

module.exports = router;
