const Sauce = require('../models/sauces');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ message: "La sauce a bien été créée ! :) " }))
        .catch(error => res.status(400).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.satus(404).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
        _id: req.params.id
    })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.satus(404).json({ error }));
};

exports.modifySauce = (req, res, next) => {
    const sauce = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body }
    Sauce.updateOne({ _id: req.params.id }, sauce)
        .then(() => res.status(200).json({ message: 'La sauce à bien été modifiée !' }))
        .catch(error => res.status(400).json({ error }))
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const image = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${image}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'La sauce a été supprimée ! ' }))
                    .catch((error) => res.status(500).json({ error }))
            })
        })
        .catch(error => res.status(404).json({ error }))
};

exports.likeSauce = (req, res, next) => {
    const userId = req.body.userId;
    const like = req.body.like;
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            switch (like) {
                //Si like la sauce
                case 1:
                    // A faire Si l'userID n'ait pas dans le tableau
                    if(!sauce.usersLiked.includes(userId)) {
                        Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: 1 }, $push: { usersLiked: userId } })
                        .then(() => res.status(200).json({ message: 'La sauce a été like !'}))
                        .catch(error => res.status(500).json({ error}))
                    
                    }
                    break;
                // si Dislike la sauce
                case -1:
                    if(!sauce.usersLiked.includes(userId)) { 
                        Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: 1}, $push: { usersDisliked: userId } })
                        .then(() => res.status(200). json({ message: 'La sauce a été dislikes ! '}))
                        .catch (error => res.status(500).json({ error }))
                    }

                    break;
                // Si change d'avis
                case 0:
                    if(sauce.usersLiked.includes(userId)) {
                        Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: -1}, $pull: { usersLiked: userId } })
                        .then(() => res.status(200).json({ message: 'La sauce a été dislikes ! '}))
                        .catch (error => res.status(500).json({ error }))
                    } else if(sauce.usersDisliked.includes(userId)) {
                        Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: -1}, $pull: { usersDisliked: userId } })
                        .then(() => res.status(200).json({ message: 'La sauce a été dislikes ! '}))
                        .catch (error => res.status(500).json({ error }))
                    }
                    break;
                default:
                    throw {error: 'Il y a eu une erreur'}
                break;
            }
        })
        .catch(error => res.status(404).json({ error }))

};