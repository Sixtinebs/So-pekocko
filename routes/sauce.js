const express =  require('express');
const router = express.Router();

const ctrlSauce = require('../controllers/sauce');
//middlewar controle acces with autentificazion
const auth = require('../middleware/auth');
const multer = require('../middleware/mutler');
console.log('coucou');
router.get('/', ctrlSauce.getAllSauces);
router.post('/', auth, multer, ctrlSauce.createSauce);
//router.get('/:id', auth, ctrlSauce.getOneSauce);

module.exports = router;
