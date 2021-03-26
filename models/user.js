const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userShemas = mongoose.Schema({
    //userId: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    email2: { type: String },
    password: { type: String, required: true}

});
userShemas.plugin(uniqueValidator)

module.exports = mongoose.model('User', userShemas);