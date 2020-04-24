var mongoose = require('mongoose');

var counterSchema = mongoose.Schema({
    _id : String,
    seq: Number
});
var Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;