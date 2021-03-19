const express = require('express');
const multer = require('multer');

const MIME_TYPE = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
}

// stock files;
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const extension = MIME_TYPE[file.mimetype];
        //Change name for don't have double
        callback(null, file.fieldname + '_' + Date.now() + '.' + extension)
    }
})

module.exports = multer({ storage: storage }).single('image');