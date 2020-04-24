var mongoose = require('mongoose');


var shortURLSchema = mongoose.Schema({
    original_url: {
        type: String,
        required: true
    },
    _id: Number
});

var ShortURL = mongoose.model('shortURL', shortURLSchema);

module.exports = ShortURL;