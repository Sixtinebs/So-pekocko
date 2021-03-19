const { ObjectID } = require('bson');
const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    //id: { type: ObjectID, required: true },
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageURL: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, required: false, default: 0 },
    dislikes: { type: Number, required: false, default: 0},
    usersLiked: [{ type: String, required: false, default: []  }],
    usersDisliked: [{ type: String, required: false, default: [] }] 
});

module.exports = mongoose.model('Sauce', sauceSchema);
