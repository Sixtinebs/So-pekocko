const Sauce = require('../models/sauces');
const multer = require('../middleware/mutler');

exports.createSauce = (req, res, next) => {
    console.log(req.body);
    const sauceObject = JSON.parse(JSON.stringify(req.body.sauce));
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageURL: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    
    sauce.save()
        .then(() => res.status(201).json({ message: "La sauce a bien été créée ! :) " }))
        .catch(error => res.status(400).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json([ sauces ]))
        .catch(error => res.satus(404).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
        _id: req.params.id
    })
        .then(sauce => res.status(200).json({ sauce: sauce._id }))
        .catch(error => res.satus(404).json({ error }));
};