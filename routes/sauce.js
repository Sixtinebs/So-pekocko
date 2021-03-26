const express =  require('express');
const router = express.Router();

const sauceController = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/mutler');


router.get('/', auth, sauceController.getAllSauces);
router.post('/', auth, multer, sauceController.createSauce);
router.post('/:id/like', auth, sauceController.likeSauce);
router.get('/:id', auth, sauceController.getOneSauce);
router.put('/:id', auth, multer, sauceController.modifySauce);
router.delete('/:id', auth, sauceController.deleteSauce);

module.exports = router;
