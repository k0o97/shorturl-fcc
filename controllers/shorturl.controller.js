const ShortURL = require('../models/shorturl.model');
const Counter = require('../models/counter.model');
const dns = require('dns');
async function getNextSequence(name) {
    let counter = await Counter.find();

    if (!counter) {
        counter = new Counter({ _id: "shorturlid", seq: 0 });
    }

    var ret = await Counter.findAndModify(
           {
             query: { _id: name },
             update: { $inc: { seq: 1 } },
             new: true
           }
    );
    return ret.seq;
 }

module.exports.postUrl = async function (req, res) {
    let inputURL = req.body.url;

    //check url begin with http:// or https://
    if (!inputURL.match(/^htpp|https?:\/\//gm)) {
        return res.json({ error: "Invalid URL" });
    }
    
    let hostname = inputURL.slice(inputURL.indexOf('//') + 2);
    var shortURL = await ShortURL.findOne({ original_url: inputURL });
    dns.lookup(hostname, (err, address) => {
        if (err) {
            return res.json({ error: "Invalid Hostname"});
        }
        if (!shortURL) {
            let newShortURL = new ShortURL({ original_url: inputURL});
            newShortURL.save();
            res.json(newShortURL);
        }
        //res.json({ original_url: inputURL, short_url: shortURL._id });
    });
};