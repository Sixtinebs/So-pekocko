const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const  MaskData = require('maskdata');

const emailMask2Options = {
    maskWith: "X", 
    unmaskedStartCharactersBeforeAt: 3,
    unmaskedEndCharactersAfterAt: 3,
    maskAtTheRate: true
}

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            email2: MaskData.maskEmail2( req.body.email, emailMask2Options),
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({ message: 'Inscription réussite ! ' }))
        .catch(error => res.status(500).json({ error })); 
    })
    .catch(error => res.status(400).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        //if not user existe
        if(!user) {
            return res.status(401).json({ error: "Cette email n'existe pas"});
        }
        //if find user compare password
        bcrypt.compare( req.body.password, user.password)
        .then(valid => {
            if(!valid) {
                return res.status(401).json({ error: "Le mot de passe n'est pas valide"});
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    { userId: user._id },
                    'TOKEN_SECRET',
                    { expiresIn: '24h'}
                )
            })
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(404).json({ error }));
};